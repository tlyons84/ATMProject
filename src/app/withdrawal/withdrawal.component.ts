import {Component,  EventEmitter,  HostListener,  Input,  OnChanges,  OnDestroy,  OnInit, Output, SimpleChange, SimpleChanges, ViewChild} from "@angular/core";
import {ATMInventory, Funds, insufficiant, TransAction, WithDrawal} from "../models/ATMInventory";
import {ATMTrackingService} from "../services/ATM-Tracking.service";
import {FormBuilderService} from "../services/Form-Builder.service";
import {FormGroup, FormControl} from "@angular/forms";
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import {Button} from "primeng/button";
import { ATMHistory } from "../services/ATM-History.service";
import { SubjectService } from "../services/subject.service";
import { Subject } from "rxjs";

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss']
})

export class WithdrawalComponent implements OnInit, OnDestroy{
  protected insuffFund:boolean = false;
  protected insuffInventory:boolean = false;
  
  protected controlNames:string[] = ["amount"];
  protected withdrawalForm:FormGroup;
  protected insuficiantInven:Funds[] = [];
  @Input()
  submit:boolean = false;

  @Output()
  protected disabledEvent:EventEmitter<boolean> =  new EventEmitter<boolean>;
  @Output()
  pageObjEmitter:EventEmitter<object> = new EventEmitter<object>; 
  
  @ViewChild("withdraw", {static:false})
  protected withdraw: Button = new Button;

 
  constructor(private atmTracker:ATMTrackingService, private fbService:FormBuilderService, private atmHistory:ATMHistory){
    this.withdrawalForm = fbService.buildNewForm(this.controlNames);
   
  }

  ngOnInit():void {

  }
  @HostListener('unloaded')
  ngOnDestroy(): void {
  
  }
  onSubmit(){
    
  const requestMoney =Number(this.withdrawalForm.controls['amount'].value);
  const currentATMInven:ATMInventory = this.atmTracker.getCurrentInv();

    let  withdrawn: WithDrawal = {
      AmountToWithdraw:requestMoney,
      DenomTrack: currentATMInven.inventory
    }
    this.checkToSeeIfCanWithDraw(withdrawn);
  }
  checkToSeeIfCanWithDraw(withDrawal:WithDrawal) {
    const enoughCash:boolean = this.atmTracker.checkIfCanWithdraw(withDrawal)
    let currentFunds:insufficiant;
    if(enoughCash){
     currentFunds = this.atmTracker.checkIfEnoughInventory(withDrawal);
     if(currentFunds.inssuficiant == true){
      this.populateInsuficiantFunds(currentFunds.funds);
      this.sendAlertToUser();
     }else {
        const amount: number =  withDrawal.AmountToWithdraw
         this.atmTracker.updateAtmInventory("withDrawal",amount, withDrawal);
         let newHistory:TransAction =   this.atmHistory.buildHistory(amount,"withdrawal", true,"");
         this.atmHistory.putHistory(newHistory)
         alert("We have successfully dispensed Your money in the amount of: " + amount)
      }
    }else {
      this.insuffFund = true
      this.sendAlertToUser()
    }
    this.submit = false

  }

  populateInsuficiantFunds(currentFunds:Funds[]){
    if(this.insuficiantInven.length >0){
      this.insuficiantInven = [];
    }
    currentFunds.forEach(fund =>{
      if(fund.sufficient ==false){
        this.insuficiantInven.push(fund)
      }
    })
  }
  sendAlertToUser():void {
    const currentInv:ATMInventory = this.atmTracker.getCurrentInv();
    const amount = Number(this.withdrawalForm.controls['amount'].value);
    let errorStr:string ='';
    if (this.insuffFund) {
      errorStr ="There is insufficiant funds please try anything less then or equal to " +  currentInv.totalValue
      alert(errorStr)
    
    }else if(this.insuficiantInven.length >0){
     
      this.insuficiantInven.forEach(fund =>{
        errorStr =  fund.denomination.toString() + "'s"  + "," + errorStr;
        
      });
      errorStr = "Too Few of the following: " + errorStr;
      alert(errorStr)
    }
    let newHistory:TransAction =   this.atmHistory.buildHistory(amount,"withdrawal", false, errorStr);
    this.atmHistory.putHistory(newHistory)
  }
  enableWithdraw(){
    console.log("test")
    if(Number(this.withdrawalForm.controls["amount"].value) > 0){
      this.disabledEvent.emit(false);
    }else{
      this.disabledEvent.emit(true)
    }
  }
  mainMenu(){
    const pageObj ={
      page:"withdrawal",
      show:false
    }
  
     this.pageObjEmitter.emit(pageObj);
   
  }
  
}

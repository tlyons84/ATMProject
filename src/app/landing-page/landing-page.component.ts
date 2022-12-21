import { Component, OnInit, ViewChild } from '@angular/core';
import { ATMInventory, Currency, WithDrawal } from '../models/ATMInventory';
import { RestockComponent } from '../restock/restock.component';
import { ATMTrackingService } from '../services/ATM-Tracking.service';
import { SubjectService } from '../services/subject.service';
import { WithdrawalComponent } from '../withdrawal/withdrawal.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  withdrawalBool:boolean= false;
  deposite:boolean = false;
  profile:boolean = false;
  history:boolean = false;
  restockBool:boolean = false;
  submit:boolean = false
  show:boolean = true
  enable:boolean = true;
  btnSubTitle:string ="";
  protected inventory:Currency[] =[];
  protected totalValue:number =0;
  protected cols:object[] =[];
  protected headerText:string = "Welcome User Please Select Your Option:"
  constructor(private subjTest:SubjectService, private atmTrack:ATMTrackingService){}
  
  @ViewChild("withdrawal", { static: false })
  private withDrawalComp!: WithdrawalComponent;
  @ViewChild("restock", { static: false })
  private restockComp!: RestockComponent;

  ngOnInit():void{
    this.populateCols();
    this.populateInventory()
  }
  onSubmit(){
    this.subjTest.subjectGenerator().next(true)
    if(this.withdrawalBool==true){
      this.withDrawalComp.onSubmit();
    }else if(this.restockBool == true){
      this.restockComp.onRestock();
    }
    this.populateInventory()
  }
  onMainMenu(){
    this.subjTest.subjectGenerator().next(true)
    if(this.withdrawalBool==true){
      this.withDrawalComp.mainMenu();
    }else if(this.restockBool == true){
      this.restockComp.mainMenu();
    }
    this.populateInventory();
  }
  selectPage(event:any){
   switch(event.page){
    case 'withdrawal':{
      this.withdrawalBool =  event.show;
      this.headerText =  "Please Enter the amount you wish to withDraw:"
      this.btnSubTitle ="WithDraw"
      this.submit = true
      break;
    }
    case 'desposite':{
      this.deposite = event.show;
      this.headerText =  "Please Enter the amount you wish to Deposite:"
      this.btnSubTitle ="Deposite"
      this.submit = true
      break;
    }
    case 'profile':{
      this.profile =  event.show;
      this.headerText =  "Please create your profile:"
      this.btnSubTitle ="create Profile"
      this.submit = true
      break;
    }
    case 'history':{
      this.history = event.show;
      this.headerText =  "Below is the History wish to withDraw:"
      this.submit = false;
      break;
    }
    case 'restock':{
      this.restockBool = event.show;
      this.headerText =  "Please Enter the amount you wish to Restock:"
      this.btnSubTitle ="Restock"
      this.submit = true
      break;
    }
    default:{
    console.log("failed");
    break;
    }
   }
   if(this.show==true){
   this.show = false;
   }else{
    this.show = true
    this.subjTest.subjectGenerator();
   }
  }
  
  enableOrDisableSubmit(event:any){
    console.log(event)
    this.enable = event
  }
  populateInventory(){
   const invent:ATMInventory = this.atmTrack.getCurrentInv();
   this.inventory = invent.inventory;
   this.totalValue = invent.totalValue
  }
  populateCols(){
   
      this.cols =[{
        field:"denomination",
        header: "Denomination"
      },
      {field:"amount", header:"Amount"}]
   
    }
  

}

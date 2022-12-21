import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ATMInventory, Currency, restockSelection } from '../models/ATMInventory';
import { ATMTrackingService } from '../services/ATM-Tracking.service';
import { FormBuilderService } from '../services/Form-Builder.service';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.scss']
})
export class RestockComponent implements OnInit, OnDestroy {
  protected controlNames:string[] =  ["DenomintationSelection", "amountPerDenomination"]
  selectedDenomValues: number[] = [];
  protected disabled:boolean = true;
  protected disableInput:boolean = true;
  protected options:restockSelection[] =[]
  protected restockFormGroup:FormGroup;

  @Output()
  pageObjEmitter:EventEmitter<object> = new EventEmitter<object>; 
  @Output()
  protected disabledEvent:EventEmitter<boolean> =  new EventEmitter<boolean>;

  constructor(private fb:FormBuilderService, private atmService: ATMTrackingService) { 
    this.restockFormGroup = fb.buildNewForm(this.controlNames);
      }

  ngOnInit(): void {
    this.populateRestockSelection();
   
  }
  ngOnDestroy(): void {
  
  }
  private populateRestockSelection():void{
    this.options = [{
      Denom:100,
      value:100
    },
    {
      Denom:50,
      value:50
    },
    {
      Denom:20,
      value:20
    },
    {
      Denom:10,
      value:10
    },
    {
      Denom:5,
      value:5,
    },
    {
      Denom:1,
      value:1
    }
  ]
  }
  onRestock(){
    console.log("I am here")
   let currInvent:ATMInventory = this.atmService.getCurrentInv()
   const increaseBaseBy = Number(this.restockFormGroup.controls["amountPerDenomination"].value);
    this.selectedDenomValues.forEach(value =>{
      for(let inventory of currInvent.inventory){
          if(value == inventory.denomination){
            inventory.amount = inventory.amount + increaseBaseBy;
             const addToTotal:number= value * increaseBaseBy;
            currInvent.totalValue = currInvent.totalValue +addToTotal;
            break;
          }

      }
      
    })
    this.atmService.putAdjInventoryInMem(currInvent);
    alert("Your ATM is now Restocked:" + currInvent.totalValue)
    console.log("fired")
  }
  enableRestock(){
   
    if(this.selectedDenomValues.length > 0 && Number( this.restockFormGroup.controls['amountPerDenomination'].value) > 0){
      this.disabledEvent.emit(false);
    }else{
      this.disabledEvent.emit(true)
    }
  
  }
  mainMenu(){
    const pageObj ={
      page:"restock",
      show:false
    }
     this.pageObjEmitter.emit(pageObj);
     this.ngOnDestroy();
  }

}

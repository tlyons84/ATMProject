import {Injectable} from "@angular/core";
import {ATMInventory, Currency, Funds, insufficiant, WithDrawal} from "../models/ATMInventory";
import { ATMHistory } from "./ATM-History.service";
import {DataStoreService} from "./data-store.service";

@Injectable()
export class ATMTrackingService{
  
  constructor(private storage:DataStoreService, private atmHistory:ATMHistory){}
  updateAtmInventory(typeOfTrans:string, amount:number, withDrawal?:WithDrawal): ATMInventory {
   let currentAtmFunds = this.getCurrentInv();
    if(typeOfTrans ==="withDrawal" && withDrawal){
      currentAtmFunds  =  this.removeInventory(currentAtmFunds, withDrawal);
      
    }else {
      currentAtmFunds = this.addInventory(currentAtmFunds, amount);
    }
    
    return currentAtmFunds
  }
  getCurrentInv(){
   return this.storage.getItemFromStorage("atmInventory")
  }
  private addInventory(invent:ATMInventory, amount:number):ATMInventory{
    let adjustInventory: ATMInventory;
    invent.totalValue = invent.totalValue + amount;
    adjustInventory = invent;
    this.putAdjInventoryInMem(adjustInventory);
    return adjustInventory
    // we need to update total value break it down evenly by each denomination and the  return the adjusted inventory
  }

  private removeInventory(invent:ATMInventory, withDrawal:WithDrawal):ATMInventory{
    const amount:number = withDrawal.AmountToWithdraw
    const currentInvArry:Currency[] = invent.inventory;
    const currencyToWithdraw: Currency[] = withDrawal.DenomTrack;
    let adjustedInventory:ATMInventory;
    invent.totalValue = invent.totalValue - amount;
    adjustedInventory =  invent
    this.adjustInventoryCurrency(amount,adjustedInventory)
    this.putAdjInventoryInMem(adjustedInventory)
    return adjustedInventory;
  }

  private adjustInventoryCurrency(amoToWith:number, currentInventor:ATMInventory):void{
     const denomInventory: Currency[] =  currentInventor.inventory 
     let newAmount:number = 0
    for( let denomination of denomInventory ) {
      if(amoToWith%denomination.denomination >=0){
          let count = Math.floor(amoToWith/denomination.denomination)
          if(count> denomination.amount){
            count = denomination.amount
          }
          const amountToSubtract:number = count * denomination.denomination 
          denomination.amount = denomination.amount - count;
          amoToWith = amoToWith - amountToSubtract    
      }
      if(amoToWith == 0){
        break;
      }
     }
     console.log("Current Inventory", currentInventor);
  }

 
   putAdjInventoryInMem(adjustedInventory:ATMInventory):void{
    const key:string = "atmInventory"
    this.storage.addToStorage(key,adjustedInventory);
  }

  checkIfCanWithdraw(withDrawl:WithDrawal):boolean {
    const currentInven:ATMInventory = this.storage.getItemFromStorage("atmInventory");
    const leftOverMoney = currentInven.totalValue  - withDrawl.AmountToWithdraw;
    if(Math.sign(leftOverMoney) == -1){
      return false;
    }else {
      return true;
    }

  }

  checkIfEnoughInventory(denominationToWithDraw:WithDrawal):insufficiant{
    const currentInven:ATMInventory = this.storage.getItemFromStorage("atmInventory");
    const currentDenomInvent:Currency[] = currentInven.inventory;
    let amountToBeWithdrawn:number = denominationToWithDraw.AmountToWithdraw;
    let insufficiantInventory:boolean;
    let funds: Funds[] =[];
    
    
    
    currentDenomInvent.forEach( denom =>{
      const amountInStock:number = denom.amount
      const denomination: number = denom.denomination
      
      let count: number = Math.floor(amountToBeWithdrawn/denom.denomination)
      if(amountInStock!= 0 && count > amountInStock){
        count = amountInStock
        let sub:number = count * denomination
        amountToBeWithdrawn = amountToBeWithdrawn - sub
        const fund:Funds ={
          sufficient: false,
          denomination: denom.denomination,
                   
        }
        funds.push(fund)
       
      }else if(count > amountInStock && count !=0){
       
        const fund:Funds ={
          sufficient: false,
          denomination: denom.denomination,
                   
        }
        funds.push(fund)
      }else if(count !=0){
        let sub:number = count * denomination
        amountToBeWithdrawn = amountToBeWithdrawn - sub
        const fund:Funds ={
          sufficient: true,
          denomination: denom.denomination
        }
        funds.push(fund)
      }
    })
    if(amountToBeWithdrawn >0){
      insufficiantInventory= true
    }else {
      insufficiantInventory = false
    }
    let finalInventory: insufficiant ={
      funds:funds,
      inssuficiant:insufficiantInventory
    }
    return finalInventory;
  }

  buildATMInv():void {

    if (!this.storage.getItemFromStorage("atmInventory")) {
      const newATMInv: ATMInventory = {
        inventory: [
          {
            denomination: 100,
            amount: 10
          },
          {
            denomination: 50,
            amount: 10
          },
          {
            denomination: 20,
            amount: 10
          },
          {
            denomination: 10,
            amount: 10
          },
          {
            denomination: 5,
            amount: 10
          },
          {
            denomination: 1,
            amount: 10
          }
        ],
        totalValue: 1860
      }
      this.putAdjInventoryInMem(newATMInv);
    }
  }
}

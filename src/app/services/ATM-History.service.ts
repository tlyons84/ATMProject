import { Injectable } from "@angular/core";
import * as moment from "moment";
import { TransAction, WithDrawal } from "../models/ATMInventory";
import { DataStoreService } from "./data-store.service";

@Injectable()
export class ATMHistory {

    constructor(private dataStore: DataStoreService){ }
    buildHistory(amount:number, transactionType:string, completed:boolean, errorStr:string):TransAction{
        const currentTime = moment().format();
    const newTransaction:TransAction ={
        completed:completed,
        amount: amount,
        TransactionType:transactionType,
        dateTime:currentTime,
        MSG:errorStr
    }
    return newTransaction
    }
    putHistory(transactionHistory:TransAction, key?:string):void{
       
       
        if(!key){
            key = "history"
        }
        let historyFromStorage: TransAction[] =this.getHistory(key);
        if(historyFromStorage){
            historyFromStorage.push(transactionHistory);
            this.dataStore.addToStorage(key, historyFromStorage);
        }else{
            let currentHistory:TransAction[] =[]
            currentHistory.push(transactionHistory);
            this.dataStore.addToStorage(key,currentHistory)
        }

       
    }
    getHistory(key:string):TransAction[]{
        const currentHistory:TransAction[] = this.dataStore.getItemFromStorage(key);
        return currentHistory;
    }
    
    deleteHistory(key:string):void{
        this.dataStore.deleteItemFromStorage(key);
    }

}
import { Component, OnInit } from '@angular/core';
import { TransAction } from '../models/ATMInventory';
import { ATMHistory } from '../services/ATM-History.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  protected transactionHistory:TransAction[] = []
  protected cols:object[] = []
  constructor(private atmHistory:ATMHistory) { }

//export interface TransAction {
  //completed:boolean
 // amount:number
 // TransactionType:string
 // dateTime:string
//}

  ngOnInit(): void {
    this.buildCols();
    this.getTransActionHistory();
    
  }
  buildCols():void{
    this.cols =[{
      field:"completed",
      header: "Completed"
    },
    {field:"amount", header:"Amount"},
    {field:"TransactionType", header:"Transaction Type"},
    {field:"dateTime", header:"Date and Time"},
    {field:"MSG", header:"Error Message"}
  ];
  }
  getTransActionHistory():TransAction[]{
    const transActionHistory:TransAction[] = this.atmHistory.getHistory("history");
    if(transActionHistory){
      this.transactionHistory = transActionHistory;
    }
    return transActionHistory;
  }

}

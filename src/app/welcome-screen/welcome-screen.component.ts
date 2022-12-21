import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {ButtonModule} from 'primeng/button'
@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit {
  insuffInventory:boolean = false
  ngOnInit():void {

  }
  @Output()
  pageObjEmitter:EventEmitter<object> = new EventEmitter<object>; 

  displayPage(page:any):void{
   
    const pageObj ={
      page:page,
      show:true
    }
     this.pageObjEmitter.emit(pageObj)
  }

}

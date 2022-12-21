import {Injectable, NgModule} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Injectable()
export class FormBuilderService {

constructor(private fb:FormBuilder){}

buildNewForm(fcNames:string[]):FormGroup{

 const newFormGroup:FormGroup = this.fb.group({});
  fcNames.forEach(name => {
    newFormGroup.addControl(name, this.fb.control(''))
  })
  return newFormGroup;

}
addControl(){}
removeControl(){}

}

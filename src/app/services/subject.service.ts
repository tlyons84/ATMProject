import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class SubjectService {
    subject: Subject<Object> = new Subject<Object>();
    constructor(){}
    subjectGenerator(){
       return this.subject
    }
   
}
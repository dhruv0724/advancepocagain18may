import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'app-helpdesk',
  templateUrl: './helpdesk.component.html',
  styleUrls: ['./helpdesk.component.css']
})
export class HelpdeskComponent implements OnInit {
@Input()myinput:string;
@Output()myoutput:EventEmitter<string>=new EventEmitter();
show = false;
  constructor() { }

  ngOnInit(){
  }
  messagedata(){
    this.show = !this.show;
    this.myoutput.emit("I/O works!!");
  }
}

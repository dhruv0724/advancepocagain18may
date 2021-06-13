import { Component, ComponentFactoryResolver, OnInit, ViewContainerRef } from '@angular/core';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Employee } from 'src/app/models/Employee';
import { EmpserviceService } from 'src/app/services/empservice.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
inputvariable="Help Desk no. 9680808055";
  employee : Employee;

  constructor(private app : AppComponent,
    private empservice : EmpserviceService,
    private router:Router,


    private viewContainerRef:ViewContainerRef,
    private cfr:ComponentFactoryResolver) { }

  ngOnInit(): void {
    let empId = localStorage.getItem('emp');
    this.empservice.getOne(empId).then((value)=>{
      if(value.success){
        this.employee = value.data;
      }
    });
  }
  updateimage(){
    
  }
  checkout(){
    this.router.navigateByUrl('/checkout');
  }

  messagedata(value:any){
    console.log(value);

  }
async load(){
  this.viewContainerRef.clear();
  const {LazycompComponent}= await import('src/app/emphome/lazycomp/lazycomp.component');
  this.viewContainerRef.createComponent(this.cfr.resolveComponentFactory(LazycompComponent))
}
}

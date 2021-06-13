import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/Employee';
import { EmpserviceService } from '../services/empservice.service';



@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
  employees : Employee[] = [];
  empid : string;
  empname : string;
  empdept:string;
  email:string;
  address:string;
  phone:string;
  emppass:string;
  isUpdate:boolean;

  constructor(
    private empservice:EmpserviceService,
    private router:Router) {

    }

  ngOnInit(): void {
    this.refresh();
    this.reset();
  }
  refresh(){
    this.empservice.getList().then((value)=>{
      if(value.success){
        this.employees = value.data;
      }
    });
  }
  save(){
    let employee={
      id :this.empid,
      employee_name :this.empname,
      email :this.email,
      emp_address :this.address,
      emp_phone :this.phone,
      password :this.emppass,
      isBlocked:false
    }as Employee;
    this.empservice.save(employee).then((value)=>{
      if(value.success){
        alert("Saved");
        this.refresh();
        this.reset();
      }else{
        alert(value.message);
      }
    })
  }

  catgpageredirect(){
    this.router.navigateByUrl('/addproducts');
  }

  reset(){
    this.isUpdate=false;
    this.empid=null;
    this.empname=null;
    this.empdept=null;
    this.address=null;
    this.phone=null;
    this.email=null;
    this.emppass=null;
  }
  fillAs(employee:Employee){
this.isUpdate=true
this.empid=employee.id;
this.empname=employee.employee_name;
this.email=employee.email;
this.address=employee.emp_address;
this.phone=employee.emp_phone;
this.emppass=employee.password;
  }
  delete(employee : Employee){
    this.empservice.delete(employee.id).then((value)=>{
      if(value.success){
        alert("Deleted");
        this.refresh();
      }else{
        alert(value.message);
      }
    })
  }
  view(employee : Employee){
    localStorage.setItem('emp',employee.id);
    this.router.navigateByUrl('/account');
  }
  blockunblock(employee : Employee){
    this.empservice.block(employee.id).then((value)=>{
      alert(value.message);
    })
  }

}




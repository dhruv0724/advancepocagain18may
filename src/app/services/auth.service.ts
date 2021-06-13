import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/Employee';
import { Response } from '../models/Response';
import { EmpserviceService } from './empservice.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  admins :any = {
    "dhruv":"dhruv123",
  };

  constructor(
    private router:Router,
    private empservice:EmpserviceService,
  ) { }
  login(email:string,password:string){
    if(email && password && this.admins[email]==password){
      localStorage.setItem('currentUser','admin');
      return true
    }
    this.router.navigateByUrl('/login')
    return false
  }


  loginEmp(empId:string,empEmail:string,empPass:string) : Promise<Response>{
    return new Promise((res,rej)=>{
      this.empservice.getOne(empId).then((value)=>{
        let message = value.message;
        if(value.success && value.data){
          let employee : Employee = value.data;
          if(employee.email == empEmail){
            if(employee.password == empPass){
              if(employee.isBlocked){
                message = "User is Blocked";
              }else{
                // this.app.employee=employee;
                res({success:true,data:employee,message:"Login Success"} as Response);
              }
            }else{
              message="Password Invalid";
            }
          }else{
            message = "Email Invalid";
          }
        }else{
          message = value.message;
        }
        res({success:false,data:null,message:message} as Response);
      });
    });
  }

  loginEmpFinal(employee:Employee){
    localStorage.setItem('currentUser','emp');
    localStorage.setItem('emp',employee.id);
  }

}

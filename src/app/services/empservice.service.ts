import { Injectable } from '@angular/core';
import{Employee} from '../models/Employee';
import{Response} from '../models/Response';



@Injectable({
  providedIn: 'root'
})
export class EmpserviceService {
  loading =true;
  employees:Employee[]=[];
  maxid:number=0;

  constructor(){ 
    this.employees = JSON.parse(localStorage.getItem('employees')?localStorage.getItem('employees'):'[]');
    this.sort();
  }

  sort(){
    this.employees.sort((a,b)=>{
      return a.id>b.id?1:-1;
    });
  }

  save(employee: Employee): Promise<Response> {
    return new Promise((res,rej)=>{
        this.delete(employee.id);
        this.employees.push(employee);
      
      localStorage.setItem('employees',JSON.stringify(this.employees));
      let respose = {success:true,message:"Saved",data:employee} as Response;
      res(respose);
    });
  }
  delete(id: string): Promise<Response> {
    return new Promise((res,rej)=>{
      let deleteCLientIndex = this.employees.findIndex(employee=>{
        return employee.id == id;
      });
      if (deleteCLientIndex !== -1) {
        this.employees.splice(deleteCLientIndex, 1);
      }
      localStorage.setItem('employees',JSON.stringify(this.employees));
      let respose = {success:true,message:"Deleted",data:deleteCLientIndex} as Response;
      res(respose);
    });
  }
  getList(): Promise<Response> {
    return new Promise((res,rej)=>{
      this.sort();
      let respose = {success:true,message:"Success",data:this.employees} as Response;
      res(respose);
    })
  }

  getOne(id: string): Promise<Response> {
    return new Promise((res,rej)=>{
      let employee = this.employees.find(employee=>{
        return employee.id == id;
      });
      console.log('Check Employee',this.employees,id)
      let respose:Response;
      if(employee){
        respose = {success:true,message:"Found One!!",data:employee} as Response;
      }else{
        respose = {success:false,message:"Not Found",data:employee} as Response;
      }
      res(respose);
    });
  }
  block(id: string): Promise<Response> {
    return new Promise((res,rej)=>{
      let employee = this.employees.find(employee=>{
        return employee.id == id;
      });
      let respose;
      if(!employee){
        respose = {success:false,message:"No User!!",data:employee} as Response;
      }else{
        employee.isBlocked = !employee.isBlocked;
        this.save(employee);
        respose = {success:true,message:"Block Toggled!!",data:employee} as Response;
      }
      res(respose);
    });
  }
}


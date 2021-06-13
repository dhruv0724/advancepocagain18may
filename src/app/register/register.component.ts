import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpserviceService } from '../services/empservice.service';
import { Employee } from '../models/Employee';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  employees: Employee[] = [];
  empid : string;
  empname: string;
  email: string;
  address: string;
  phone: string;
  emppass: string;
  empcpass: string;
  imageb64:string;
  isUpdate: boolean;
 
  constructor(
    private empservice: EmpserviceService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit():void{
    this.onFileChange();
  }

  backtologin() {
    this.router.navigateByUrl('/emphome');
  }
  signup() {
    if((!this.empid)||(!this.empname)||(!this.email)||(!this.emppass)||(!this.imageb64)){
      alert("Enter user details");
    return ;
    }
  if((this.emppass==this.empcpass)){
    let employee = {
      id:this.empid,
      employee_name: this.empname,
      email: this.email,
      emp_address: this.address,
      emp_phone: this.phone,
      password: this.emppass,
      isBlocked:false,
      image64 : this.imageb64
    } as Employee;
    this.empservice.save(employee).then((value) => {
      if (value.success) {
        alert("Saved");
        

      } else {
        alert(value.message);
      }
    })
  }
    else{
      alert("password did't match");
      
    }
  }

  onFileChange(){
    let input :any = document.getElementById('image');
    input.onchange = () => {
      var file = input.files[0],
        reader = new FileReader();
    
      reader.onloadend = () => {        
        this.imageb64 = reader.result.toString();
      };
    
      reader.readAsDataURL(file);
    };
  }

}



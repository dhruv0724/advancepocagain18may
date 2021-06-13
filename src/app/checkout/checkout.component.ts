import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Employee } from '../models/Employee';
import { Product } from '../models/Products';
import { EmailService } from '../services/email.service';
import { EmpserviceService } from '../services/empservice.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products: {product:Product,quantity:number}[] = [];
  selectoption: string;
  productid: string;
  productname: string;
  productprice: string;
  productdesc: string;
  imageb64: string;
  isUpdate: boolean;
  data :any;
  employee:Employee;

  public employeeId: any
  constructor(private router:Router,
    private emailService: EmailService,
    private empservice: EmpserviceService) { }

  ngOnInit(): void {
    let empId = localStorage.getItem('emp');
    this.empservice.getOne(empId).then((value)=>{
      if(value.success){
        this.employee = value.data;
        this.products = this.employee.cart;
      }
    });
  }

  

  get total() {
    let tot = 0;
    this.employee.cart.forEach(e=>{tot+=parseInt(e.product.product_price)*e.quantity});
    return tot;
  }
  join(arr:any[],key:string){
   return arr.map(function(elem){
      return elem[key];
  }).join(",");
  }
  checkout(){
    let procuctid = localStorage.getItem('prod');
    let pname = this.join(this.products,'product_name');
    let prcs = this.join(this.products,'product_price');
    this.emailService.checkoutEmail({  name:this.employee.employee_name,pname:pname,prcs:prcs,total:this.total}).then((response) => {
    }, (error) => {
      alert(error);
    });
    this.employee.cart = [];
    this.empservice.save(this.employee);
    this.router.navigateByUrl('')

    
  }
 refresh(){
  this.router.navigateByUrl('')
 }


  remove(productIndex:number){
    this.employee.cart.splice(productIndex,1);
    this.empservice.save(this.employee);
  }

  updateCart(){
    this.empservice.save(this.employee);
  }
  
}

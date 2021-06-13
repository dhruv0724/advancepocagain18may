import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AppComponent } from '../app.component';
import { Employee } from '../models/Employee';
import { Product } from '../models/Products';
import { EmpserviceService } from '../services/empservice.service';
import { ProductService } from '../services/product.service';
import{FilterPipe } from '../Pipes/filter.pipe'
import{SortPipe } from '../Pipes/sort.pipe'

@Component({
  selector: 'app-emphome',
  templateUrl: './emphome.component.html',
  styleUrls: ['./emphome.component.css']
})
export class EmphomeComponent implements OnInit {
  products : Product[] = [];
  selectoption:string;
  productid : string;
  productname : string;
  productprice:string;
  productdesc:string;
  imageb64:string;
  showBtn = 0;

  Search ='';
  sort ='product_price,desc';
 
  isUpdate:boolean;

  employee : Employee;

  get totalItems(){
    let total = 0;
    this.employee.cart.forEach(e=>{
      total+=e.quantity;
    })
    return total;
  }

  constructor(public app : AppComponent,
    private empservice : EmpserviceService,
    private router:Router,
    private productservice:ProductService,
    
    ) { }

  ngOnInit(): void {
    this.animate();
    let empId = localStorage.getItem('emp');
    this.empservice.getOne(empId).then((value)=>{
      if(value.success){
        this.employee = value.data;
      }
    });
    this.filter();
  }

  filter(filterOn?:string){
    
    this.productservice.getList().subscribe((value)=>{
      
      if(value.success){
        this.products = value.data;
        this.products = this.products.filter(e=>{
          return !filterOn || e.select_option.search(filterOn) !== -1;
        })
      }else{
        alert(value.message);
      }
    });
  }

  view(product : Product){
    localStorage.setItem('prod',product.id+"");
    this.router.navigateByUrl('/viewproduct');
  }
  gotoaccount(){
    this.router.navigateByUrl('/account');
  }
  checkout(){
    this.router.navigateByUrl('/checkout');
  }
  addtocart(product : Product){
    if(!this.employee.cart){
      this.employee.cart = [];
    }
    let exists = false;
    this.employee.cart.map(e=>{
      if(e.product.id==product.id){
        e.quantity=e.quantity+1;
        exists = true;
      }
      return e;
    })
    if(!exists)
      this.employee.cart.push({product:product,quantity:1});
    this.empservice.save(this.employee);
    // this.router.navigateByUrl('/checkout');
  }
  sortup(){

  }
  sortdown(){

  }
  animate(){
    var slide = document.getElementById("slider");
    var btn1 = document.getElementById('btn1');
    var btn2 = document.getElementById('btn2');
    var btn3 = document.getElementById('btn3');

    setInterval(()=>{
      this.showBtn++;
      document.getElementById('btn'+(this.showBtn%3+1)).click();
    },2000);
    btn1.onclick = function() {
        slide.style.transform = "translateX(0px)";
        btn1.classList.add('active');
        btn2.classList.remove('active');
        btn3.classList.remove('active');
    };
    btn2.onclick = function() {
        slide.style.transform = "translateX(-100%)";
        btn1.classList.remove('active');
        btn2.classList.add('active');
        btn3.classList.remove('active');
    };
    btn3.onclick = function() {
        slide.style.transform = "translateX(-200%)";
        btn1.classList.remove('active');
        btn2.classList.remove('active');
        btn3.classList.add('active');
    };
  
  }
}

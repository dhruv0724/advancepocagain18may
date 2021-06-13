import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { Product } from 'src/app/models/Products';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  products : Product[] = [];
  selectoption:string;
  productid : string;
  productname : string;
  productprice:string;
  productdesc:string;
  imageb64:string;
  isUpdate:boolean;

  employee : Employee; 

  constructor( private router:Router) { }

  ngOnInit(): void {
  }


  checkout(){
    this.router.navigateByUrl('/checkout');
  }
}

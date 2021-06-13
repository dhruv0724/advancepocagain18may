import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Product } from 'src/app/models/Products';
import { EmpserviceService } from 'src/app/services/empservice.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  products: Product[] = [];
  selectoption: string;
  productid: string;
  productname: string;
  productprice: string;
  productdesc: string;
  imageb64: string;
  isUpdate: boolean;

  product: Product;
  constructor(private app: AppComponent,
    private ProductService: ProductService,

  ) {

    let procuctid = localStorage.getItem('prod');
    this.ProductService.getOne(procuctid).subscribe((value) => {
      if (value.success) {
        console.log(value);
        this.product = value.data;
      }
    });

  }

  ngOnInit() :void{

  }
  updateimage() {

  }

}
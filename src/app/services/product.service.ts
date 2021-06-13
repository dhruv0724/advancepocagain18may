import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/Products';
import{Response} from '../models/Response';
import { ApicallService } from './apicall.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products:Product[]=[];
  loading =true;
  maxid:number=0;

  constructor(private apicall:ApicallService){     
    apicall.get<Product[]>("Products").subscribe((value)=>{      
      this.products = value;
      this.sort();
    })
  }
  sort(){
    this.products.sort((a,b)=>{
      return a.id>b.id?1:-1;
    });
  }
  save(product: Product): Observable<Response> {
    return new Observable<Response>((obs)=>{
      if(!product.id){
        this.apicall.post<any,Product>("Products",product).subscribe((value)=>{
          let respose = {success:true,message:"Saved",data:product} as Response;
          obs.next(respose);
        });
      }else{
        this.apicall.put<any,Product>("Products/"+product.id,product).subscribe((value)=>{
          let respose = {success:true,message:"Saved",data:product} as Response;
          obs.next(respose);
        });
      }
    });
  }


  delete(id: number): Observable<Response> {
    return new Observable((obs)=>{
      this.apicall.delete<any>("Products/"+id).subscribe((value)=>{
        let respose = {success:true,message:"Deleted",data:id} as Response;
        obs.next(respose);
      })
    });
  }
  getList(): Observable<Response> {
    return new Observable((obs)=>{
      this.apicall.get<Product[]>("Products").subscribe((value)=>{      
        this.products = value;
        this.sort();
        let respose = {success:true,message:"Success",data:this.products} as Response;
        obs.next(respose);
      })
    })
  }


  getOne(id: string): Observable<Response> {
    return new Observable((obs)=>{
      this.apicall.get<Product[]>("Products/"+id).subscribe((product)=>{      
        let respose:Response;
        if(product){
          respose = {success:true,message:"Found One!!",data:product} as Response;
        }else{
          respose = {success:false,message:"Not Found",data:product} as Response;
        }
        obs.next(respose);
      });
    });
  }
  block(id: number): Observable<Response> {
    return new Observable((obs)=>{
      let product = this.products.find(product=>{
        return product.id == id;
      }); 
      let respose;
      if(!product){
        respose = {success:false,message:"No Employee!!",data:product} as Response;
      }else{
        product.isBlocked = !product.isBlocked;
        this.save(product);
        respose = {success:true,message:"Block Toggled!!",data:product} as Response;
      }
      obs.next(respose);
    });
  }


}

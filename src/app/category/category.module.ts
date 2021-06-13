import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileComponent } from './mobile/mobile.component';
import { ShoesComponent } from './shoes/shoes.component';
import { ClothesComponent } from './clothes/clothes.component';



@NgModule({
  declarations: [
    MobileComponent,
    ShoesComponent,
    ClothesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CategoryModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { EmphomeComponent } from './emphome/emphome.component';
import { LoginComponent } from './login/login.component';
import{FormsModule} from '@angular/forms'
import { from } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AddproductsComponent } from './adminhome/addproducts/addproducts.component';
import{ReactiveFormsModule} from '@angular/forms';
import { ViewproductComponent } from './adminhome/viewproduct/viewproduct.component';
import { IndexComponent } from './adminhome/index/index.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AccountComponent } from './emphome/account/account.component';
import { HelpdeskComponent } from './emphome/helpdesk/helpdesk.component';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';


@NgModule({
  declarations: [
    AppComponent,
    AdminhomeComponent,
    EmphomeComponent,
    LoginComponent,
    RegisterComponent,
    AddproductsComponent,
    IndexComponent,
    CheckoutComponent,
    AccountComponent,
    ViewproductComponent,
    HelpdeskComponent,
    FilterPipe,
    SortPipe,
    
    
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule
  
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

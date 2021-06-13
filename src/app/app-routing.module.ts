import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductsComponent } from './adminhome/addproducts/addproducts.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { IndexComponent } from './adminhome/index/index.component';
import { ViewproductComponent } from './adminhome/viewproduct/viewproduct.component';
import { ClothesComponent } from './category/clothes/clothes.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AccountComponent } from './emphome/account/account.component';
import { EmphomeComponent } from './emphome/emphome.component';
import { HelpdeskComponent } from './emphome/helpdesk/helpdesk.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:'login',component:LoginComponent
  },
  {
    path: '',redirectTo:'/login',pathMatch:"full"},
  {
    path: 'adminhome',component:AdminhomeComponent,canActivate:[AuthGuard]
  },{
    path: 'emphome',component:EmphomeComponent,canActivate:[AuthGuard]
  },{
    path:'register',component:RegisterComponent,canActivate:[AuthGuard]
  },
  {path:'cloths',component:ClothesComponent,canActivate:[AuthGuard]
  },
  {path:'addproducts',component:AddproductsComponent,canActivate:[AuthGuard]
  },
  {path:'viewproduct', component:ViewproductComponent,canActivate:[AuthGuard]
  },
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthGuard]
},{path:'index',component:IndexComponent,canActivate:[AuthGuard]
},
{path:'account',component:AccountComponent,canActivate:[AuthGuard]
},
{path:'helpdesk',component:HelpdeskComponent,canActivate:[AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

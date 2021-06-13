import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AdminhomeComponent } from '../adminhome/adminhome.component';
import { RegisterComponent } from '../register/register.component';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
  constructor(private router:Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let user = localStorage.getItem('currentUser');
if(user)
{
  if(user !== 'admin'){
    if(route.component == AdminhomeComponent){
      this.router.navigateByUrl('/emphome');
      return false;
    }
  }
  return true;
}
else{
  if(route.component == RegisterComponent){
    return true;
  }else
    this.router.navigateByUrl('')
  return false;
}
  }
  
}
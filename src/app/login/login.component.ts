import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { from } from 'rxjs';
import { AppComponent } from '../app.component';
import { AuthService } from '../services/auth.service';
import { EmailService } from '../services/email.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: any
  public password: any

  public employeeId: any
  public empemailId: any
  public emppass: any

  isDisplay = true;
  otp: string;
  otpEntered: string;
  data :any;

  toggledisplay() {
    this.isDisplay = !this.isDisplay;
  }

  constructor(
    private authservice: AuthService,
    private router: Router,
    private app: AppComponent,
    private emailService: EmailService
  ) {
    if (localStorage.getItem('currentUser')) {
      this.router.navigateByUrl('/adminhome')
    }
  }


  
  ngOnInit(): void {
  }




  generateOtp() {
    this.authservice.loginEmp(this.employeeId, this.empemailId, this.emppass).then((value) => {
      if (value.success) {

        // Declare a digits variable 
        // which stores all digits
        var digits = '0123456789thequickbrownfoxjumpsonthelazydog';
        let OTP = '';
        for (let i = 0; i < 4; i++) {
          OTP += digits[Math.floor(Math.random() * 43)];
        }
        this.otp = OTP;
        this.data = value.data;
        this.emailService.sendOTPEmail({ otp: this.otp, subject: "login otp", name: this.employeeId }).then((response) => {
        }, (error) => {
          alert(error);
        });
      } else {
        this.otp = null;
        this.data = null;
        alert(value.message);
        this.router.navigateByUrl('')
      }
    });
  }




  login() {
    if (this.isDisplay) {
      if (this.authservice.login(this.email, this.password)) {
        this.router.navigateByUrl('/adminhome')
        this.app.isLogin = true;
        this.app.isAdmin = true;
      } else {
        alert("Login Failed");
        this.router.navigateByUrl('')
      }
    } else {        
        if (this.otp && this.otp !== this.otpEntered) {
          alert("Wrong otp!!!");
        }else{
          this.authservice.loginEmpFinal(this.data);
          this.router.navigateByUrl('/emphome')
          this.app.isLogin = true;
          this.app.isAdmin = false;
          this.app.employee = this.data;
        }
    }
  }



  newregister() {
    this.router.navigateByUrl('/register');
  }
}

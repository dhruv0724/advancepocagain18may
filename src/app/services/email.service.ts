import { Injectable } from '@angular/core';

import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})

export class EmailService {

  constructor() { }

  public sendOTPEmail(template:object) {
    return emailjs.send('service_it9f875', 'template_qipn99k',template,'user_lo1Oyt2l1KJ55KjOO8DTI');
    
  }

  public checkoutEmail(template:object){
    return emailjs.send('service_it9f875', 'template_s2ym6bq',template,'user_lo1Oyt2l1KJ55KjOO8DTI');
  }
}
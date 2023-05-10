import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  resId: number = -1;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private notifService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const resId:number = params.get('resid')?parseInt(params.get('resid')!):-1;
      this.resId = resId;
      if(resId==-1){
        this.notifService.showNotification("Error", "User doesnt exist");
        return;
      }
      const username:string|null = params.get('username');
      if(!username){
        this.notifService.showNotification("Error", "User doesnt exist");
        return;
      }
      this.loginForm.setValue({'username':username, 'password':''});
    });
  }

  onSubmit(): void {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    this.authService.login(username, password, this.resId).subscribe({
      next: (response: any) => {
        if (response.title && response.body) {
          this.notifService.showNotification(response.title, response.body)
        } else if (response.token) {
          this.authService.setToken(response.token)
        }
      },
      error: (error: any) => {
        console.log(error)
      }
    });
  }
}

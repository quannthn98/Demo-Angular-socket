import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
  });
  username: string;
  password: string;
  returnUrl: string;

  constructor(private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    console.log(this.returnUrl);
  }

  login() {
    this.authService.logout();
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe( (user) => {
      this.router.navigateByUrl(this.returnUrl);
      console.log(user);
    });
  }
}

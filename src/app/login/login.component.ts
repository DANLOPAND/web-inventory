import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public registrationForm: FormGroup;
  public loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _appService: AppService,
    private _router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      cc: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this._appService.loadNavbar = false;
  }

  login() {
    if (this.loading) return;

    if (this.registrationForm.valid) {
      this.loading = true;
      this._appService
        .login(this.registrationForm.value)
        .subscribe((response) => {
          localStorage.setItem('token', response.token);
          this._appService.token = response.token;
          this.loading = false;
          this._appService.loadNavbar = true;
          this._router.navigate(['/management']);
        });
    }
  }
}

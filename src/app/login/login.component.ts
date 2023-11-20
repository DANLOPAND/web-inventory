import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { configPopup } from '../components/pop-ups/pop-ups.model';
import { PopupService } from '../components/pop-ups/pop-ups.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public registrationForm: FormGroup;
  public loading: boolean = false;
  public configPopup = configPopup;

  constructor(
    private formBuilder: FormBuilder,
    private _appService: AppService,
    private _router: Router,
    private _popupService: PopupService
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
          const token = response.token;
          if (token !== null && token?.length > 0) {
            localStorage.setItem('token', response.token);
            this._appService.token = response.token;
            this._router.navigate(['/management']);
          }
          this.loading = false;
          this._popupService.addPopup({
            content: response.message,
            seconds: 5,
            autoClose: true,
            type: this.configPopup.ERROR,
          });
        });
    }
  }
}

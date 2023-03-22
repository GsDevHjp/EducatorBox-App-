import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManageService } from 'src/app/manage.service';
import { StdRegComponent } from '../std-reg/std-reg.component';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  hide = true
  stdloginform !: FormGroup
  constructor(
    private popup: NgToastService,
    private dailog: MatDialog,
    private FromBuilder: FormBuilder,
    private service: ManageService,
    private Router: Router
  ) {
    localStorage.removeItem
    localStorage.clear()
  }

  ngOnInit(): void {
    this.stdloginform = this.FromBuilder.group({
      username: ['', Validators.required],
      std_password: ['', Validators.required],
    })
  }

  new_account(): any {
    this.dailog.open(StdRegComponent, {
      disableClose: true
    })
    localStorage.removeItem
    localStorage.clear()
  }

  Std_login() {
    console.log(this.stdloginform)
    if (this.stdloginform.valid) {
      this.service.std_login(this.stdloginform.value).subscribe(
        (res: any) => {
          console.log(res.uid[0].status)

          if (res.success) {
            if (res.uid[0].status != 0) {
              localStorage.setItem('Token', JSON.stringify(res.uid[0]));
              this.Router.navigate(['/studenthome']);
              this.popup.success({ detail: 'Success', summary: 'Login Successfull...', })
            }
            else{
              this.popup.error({ detail: 'Account is disabled', summary: 'please contact your Institute' })
            }

          }
          else {
            this.popup.error({ detail: 'Failed', summary: 'Username and Password Not Match...' })
          }
        },
        (error: any) => {
          console.log(error)
          this.popup.error({ detail: 'Failed', summary: 'Username and Password Not Match...' })
        }
      )
    }
    else {
      this.popup.error({ detail: 'Failed', summary: 'Fill Compulsory Field...', })
    }

  }

}
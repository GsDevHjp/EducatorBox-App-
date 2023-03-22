import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { InstituteUpdateProfileComponent } from '../institute-update-profile/institute-update-profile.component';
import { InstChangePasswordComponent } from '../inst-change-password/inst-change-password.component';
import { ManageService } from 'src/app/manage.service';
@Component({
  selector: 'app-institute-home',
  templateUrl: './institute-home.component.html',
  styleUrls: ['./institute-home.component.css']
})
export class InstituteHomeComponent implements OnInit {
  name: any;
  opened: boolean = true
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  url: string = 'assets/';
  img_url: string = '';
  login_deatils: any
  login: any
  action_menu: boolean = true

  constructor(
    private observe: BreakpointObserver,
    private dailog: MatDialog,
    private servies:ManageService
  ) {
    if (window.innerWidth > 720) {
      this.action_menu = true
    }
    else {
      this.action_menu = false
    }
  }

  ngOnInit(): void {
    this.login_deatils = localStorage.getItem('Token')
    this.login = JSON.parse(this.login_deatils)
    this.name = this.login.inst_name
    if (!this.login.inst_logo) {
      this.img_url = "user.png"
    }
    else {
      this.img_url = this.login.inst_logo
    }
    this.get_inst_data(this.login.inst_id)
  }
  get_inst_data(inst: any) {
    const fromdata = new FormData()
    fromdata.append('inst_id', inst)
    this.servies.get_inst_by_inst_id(fromdata).subscribe(
      (res: any) => {
        console.log(res.data)
        this.name = res.data.inst_name
        this.img_url = res.data.inst_logo
      }
    )
  }


  profile_update() {
    this.dailog.open(InstituteUpdateProfileComponent, {
      disableClose: true
    });
  }
  inst_change_pwd() {
    this.dailog.open(InstChangePasswordComponent, {
      disableClose: true
    });
  }
}
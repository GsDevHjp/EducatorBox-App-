import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ManageService } from 'src/app/manage.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-std-reg',
  templateUrl: './std-reg.component.html',
  styleUrls: ['./std-reg.component.css']
})
export class StdRegComponent implements OnInit {
  hide = true;
  std_regist_from !: FormGroup
  admin = 1;
  inst_data: any
  inst_id: any
  inst_name: any
  std_id: any
  std_regist_no: any
  current_date: any;
  letter: any
  std: number = 1
  std_data: any
  otp_hidden_area:boolean = true
  valid_otp:boolean = true
  send_otp:any
  disable_box :boolean  = false
  constructor(
    private popup: NgToastService,
    private FormBuilder: FormBuilder,
    private manageservice: ManageService,
    private matref: MatDialogRef<StdRegComponent>,
  ) { }

  ngOnInit(): void {

    this.manageservice.institute_view().subscribe(
      (res: any) => {

        this.inst_data = res.data
        
      }
    )


    this.std_regist_from = this.FormBuilder.group({
      institute_id_fk: ['', Validators.required],
      std_name: ['', Validators.required],
      std_whatsapp_no: ['', Validators.required],
      std_email: ['', Validators.required],
      std_address: ['', Validators.required],
      std_password: ['', Validators.required],
      std_regist_no: ['',Validators.required],
      std_regist_date: [new Date().toISOString().slice(0, 10)],
      admin_id_fk: ['', Validators.required],
      otp_recive: [''],
    })
  }



  regist_no_generate(event: any) {
    this.inst_id = event
    this.std_regist_from.controls['std_regist_no'].reset()
    const stdfromdata = new FormData()
    stdfromdata.append("inst_id", event)
    this.manageservice.get_inst_by_inst_id(stdfromdata).subscribe(
      (result:any)=> {
          console.log(result.data.inst_name)
          this.inst_name  = result.data.inst_name
          this.get_reg( this.std)
      } 
    )

    this.manageservice.get_student_by_inst_id(stdfromdata).subscribe(
      (res: any) => {
        this.inst_name = res.data[0].inst_name
        this.std_data = res.data
        if (res.success == 1) {
          this.std = res.data.length + 1
          this.get_reg(this.std)

        }
        else{
          this.std = 1
          this.get_reg(this.std)
        }
      },
      (error:any)=>{
        this.std = 1
        this.get_reg( this.std)
      }

    )
    this.std = 1
    this.get_reg(this.std)


  }

  get_reg(std_no:any){
 
    this.std_regist_from.controls['std_regist_no'].setValue(this.inst_id + formatDate(new Date(), 'yyyyMMdd', 'en') + std_no);
   
  }

  reset() {
    this.std_regist_from.reset()
  }


 
 
  std_regist() {
    this.send_otp =  Math.floor(100000 + Math.random() * 900000);
    const formdata = new FormData()
    formdata.append("send_otp", this.send_otp) ;
    formdata.append("tomail",this.std_regist_from.get('std_email')?.value)
    this.manageservice.inst_reg_otp(formdata).subscribe(
      (res:any)=>{
        console.log(res.success)
        if(res.success){
        this.popup.success({ detail: 'Success', summary:'OTP Send Sucessfully...',})
          this.otp_hidden_area = false
          this.disable_box = true
        }
        else{
        this.popup.error({ detail: 'Fail', summary:'OTP Send Fail...',})
        }
      }
    )
  }

  match_otp(){
    console.log(this.std_regist_from.get('otp_recive')?.value)
    if(this.send_otp == this.std_regist_from.get('otp_recive')?.value){
      this.valid_otp = false
    }else{
      this.valid_otp = true
    }
  }

    form_reset() {
      this.std_regist_from.reset()
    }


    final_submit() {
    const fromdata = new FormData()
    fromdata.append('inst_id', this.inst_id)
    fromdata.append('std_email', this.std_regist_from.get('std_email')?.value)
    this.manageservice.std_email_verfiy(fromdata).subscribe(
      (res: any) => {
        console.log(res)
        if (res.success) {
          this.popup.warning({ detail: 'Warning', summary: 'this email already exists ' + res.data[0].std_name, })
    }
        else{

            this.submit_function()
        }
      },
      (error: any) => {

      }
    )

  }

  submit_function() {
    this.manageservice.std_self_reg(this.std_regist_from.value).subscribe(
      (result: any) => {
        console.log(result)
        this.matref.close()
        this.popup.success({ detail: 'Success', summary: 'Registraion Successfully..' })
      },
      (error: any) => {
        console.log(error)
        this.popup.error({ detail: 'Unsuccess', summary: 'Registration Unsuccessfull..' })
      }
    )
  }

  senduserpassword(){
    const senduser = new FormData()
    senduser.append("tomail",this.std_regist_from.get('std_email')?.value)
    senduser.append("name",this.std_regist_from.get('std_name')?.value)
    senduser.append("password",this.std_regist_from.get('std_password')?.value)
    this.manageservice.regsucessfully(senduser).subscribe(
      
    )}
}

import { ServiceService } from './../service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Data } from './nav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loginForm!: FormGroup;
  tabledata: any;
  employeeData: Data = new Data();
showAdd:boolean;
showUpdate:boolean;

  constructor(private httpss: ServiceService, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      firstname: [' '],
      lastname: [' '],
      mobile: ['+91'],
      salary: [' '],
    });
    this.getAllDetails();
  }

  // post employee data
  postEmployeeData() {
    this.employeeData.firstname = this.loginForm.value.firstname;
    this.employeeData.lastname = this.loginForm.value.lastname;
    this.employeeData.email = this.loginForm.value.email;
    this.employeeData.mobile = this.loginForm.value.mobile;
    this.employeeData.salary = this.loginForm.value.salary;

    this.httpss.postData(this.employeeData).subscribe(
      (res) => {
        let ref = document.getElementById('cancel');
        ref?.click();
        this.loginForm.reset();
        this.getAllDetails();
      },
      (_error) => {
        alert('something wrong');
      }
    );
  }

//add employee method
  clickAddEmployee(){
    this.loginForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  // get all employee details
  getAllDetails() {
    this.httpss.getData().subscribe((res) => {
      this.tabledata = res;
    });
  }

  //delete employee data
  deleteUser(data: any) {
    this.httpss.deleteData(data.id).subscribe((res) => {
      this.getAllDetails();
    });
  }

  //edit employee data
  onEdit(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeData.id = data.id;
    this.loginForm.controls['firstname'].setValue(data.firstname);
    this.loginForm.controls['lastname'].setValue(data.lastname);
    this.loginForm.controls['mobile'].setValue(data.mobile);
    this.loginForm.controls['salary'].setValue(data.salary);
  }

  //update employee data

  updateEmployeeData(){
    this.employeeData.firstname = this.loginForm.value.firstname;
    this.employeeData.lastname = this.loginForm.value.lastname;
    this.employeeData.email = this.loginForm.value.email;
    this.employeeData.mobile = this.loginForm.value.mobile;
    this.employeeData.salary = this.loginForm.value.salary;


    this.httpss.updateData(this.employeeData,this.employeeData.id).subscribe( res => {
             let ref = document.getElementById('cancel');
             ref?.click();
             this.loginForm.reset();
             this.getAllDetails();


    })
  }
}

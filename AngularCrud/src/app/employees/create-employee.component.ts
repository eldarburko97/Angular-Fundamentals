import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm; // employeeForm selector is template reference variable of form
  previewPhoto: boolean = false;
  datePickerConfig: Partial<BsDatepickerConfig>;
  employee: Employee;
  cardTitle: string;

  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' },
    { id: 5, name: 'Admin' }
  ];
  constructor(private _employeeService: EmployeeService, private _router: Router, private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        /*minDate: new Date(2018, 0, 1),
        maxDate: new Date(2018, 11, 31),*/
        dateInputFormat: 'DD/MM/YYYY'
      });
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    })
  }


  getEmployee(id: number) {
    if (id == 0) {
      this.employee = {
        id: 0,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: null,
        dateOfBirth: null,
        departmentId: 0,
        isActive: null,
        photoPath: null
      };
      this.createEmployeeForm.reset();
      this.cardTitle = 'Create employee';
    } else {
      // this.employee = Object.assign({}, this._employeeService.getEmployee(id));
      this._employeeService.getEmployee(id).subscribe((emp) => {
        this.employee = emp;
      })
      this.cardTitle = 'Edit employee';
    }
  }

  /*
  saveEmployee(): void {
    const newEmployee: Employee = Object.assign({}, this.employee);
    this._employeeService.save(newEmployee);
    this._router.navigate(['list']);
  }*/

  saveEmployee(): void {
    const newEmployee: Employee = Object.assign({}, this.employee);
    console.log(newEmployee);
    this._employeeService.save(newEmployee).subscribe(
      (data: Employee) => {
        console.log(data);
        this.createEmployeeForm.reset();
        this._router.navigate(['list']);
      },
      (error: any) => { console.log(error); }
    )
  }
}

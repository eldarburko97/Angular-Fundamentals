import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee;
  private _id: number;
  constructor(private _route: ActivatedRoute, private _employeeService: EmployeeService, private _router: Router) { }

  ngOnInit() {
    // const id = +this._route.snapshot.paramMap.get('id');          //Snapshot approach
    // this.employee = this._employeeService.getEmployee(id);


    this._route.paramMap.subscribe(params => {          //Observable approach
      this._id = +params.get('id');
      //this.employee = this._employeeService.getEmployee(this._id);
      this._employeeService.getEmployee(this._id).subscribe(
        (empData: Employee) => {
          this.employee = empData;
        },
        (err: any) => { console.log(err); }
      );
    });
  }
}

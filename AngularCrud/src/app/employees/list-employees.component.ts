import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];
  // employeeToDisplay: Employee;
  // private arrayIndex = 1;
  dataFromChild: Employee;
  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }
  constructor(private _employeeService: EmployeeService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    //this.employees = this._employeeService.getEmployees();      //This works for static data
    this._employeeService.getEmployees().subscribe((empList) => {
      this.employees = empList;
      this._route.queryParamMap.subscribe(params => {
        if (params.has('searchTerm')) {
          this.searchTerm = params.get('searchTerm');
        } else {
          this.filteredEmployees = this.employees;
          // console.log(this.employees.length);
          for (let i = 0; i < this.filteredEmployees.length; i++) {
            console.log(this.filteredEmployees[i].departmentId);
          }
        }
      });
    });
    console.log("sadads");
    // this.employeeToDisplay = this.employees[0];
    /*
    if (this._route.snapshot.queryParamMap.has('searchTerm')) {
      this.searchTerm = this._route.snapshot.queryParamMap.get('searchTerm');
    } else {
      this.filteredEmployees = this.employees;
    }*/
  }

  filterEmployees(searchString: string) {
    return this.employees.filter(employee => employee.name.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1);
  }
  // nextEmployee(): void{
  //   if(this.employeeToDisplay.id <=2){
  //     this.employeeToDisplay = this.employees[this.arrayIndex];
  //     this.arrayIndex++;
  //   }else{
  //     this.employeeToDisplay = this.employees[0];
  //     this.arrayIndex = 1;
  //   }
  // }

  handleNotify(eventData: Employee) {
    this.dataFromChild = eventData;
  }

  onDeleteNotification(id: number) {
    const i = this.filteredEmployees.findIndex(e => e.id === id);
    if (i !== -1) {
      this.filteredEmployees.splice(i, 1);
    }
  }

  update(): void {
    this._employeeService.getEmployees().subscribe(
      (employees: Employee[]) => { this.filteredEmployees = employees; },
      (err: any) => console.log(err)
    );
  }
}

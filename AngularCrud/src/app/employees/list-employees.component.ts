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
    console.log("Get search term: " + this._searchTerm);
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
    console.log("Set search term: " + this._searchTerm);
  }
  constructor(private _employeeService: EmployeeService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    // this.employeeToDisplay = this.employees[0];
    this.filteredEmployees = this.employees;
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

  onClick(employeeId: number) {
    this._router.navigate(['/employees', employeeId]);
  }

}

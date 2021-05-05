import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit, OnChanges {
  @Input() employee: Employee;
  @Input() searchTerm: string;
  @Output() notify: EventEmitter<Employee> = new EventEmitter<Employee>();
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  selectedEmployeeId: number;
  confirmDelete = false;
  constructor(private _route: ActivatedRoute, private _router: Router, private _employeeService: EmployeeService) { }

  ngOnInit() {
    this.selectedEmployeeId = +this._route.snapshot.paramMap.get('id');
  }

  ngOnChanges(changes: SimpleChanges): void {
    let previousEmployee = <Employee>changes.employee.previousValue;
    let currentEmployee = <Employee>changes.employee.currentValue;

    // console.log('Previous:' + (previousEmployee ? previousEmployee.name : 'NULL'));
    // console.log('Current:' + currentEmployee.name);
  }

  handleClick() {
    this.notify.emit(this.employee);
  }

  viewEmployee() {
    this._router.navigate(['/employees', this.employee.id], { queryParams: { 'searchTerm': this.searchTerm } });
  }

  editEmployee() {
    this._router.navigate(['/edit', this.employee.id]);
  }

  deleteEmployee() {
    this._employeeService.deleteEmployee(this.employee.id);
    this.notifyDelete.emit(this.employee.id);
  }
}

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit, OnChanges {
  @Input() employee: Employee;
  constructor() { }
  
  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    let previousEmployee = <Employee>changes.employee.previousValue;
    let currentEmployee = <Employee>changes.employee.currentValue;

    console.log('Previous:' + (previousEmployee ? previousEmployee.name : 'NULL'));
    console.log('Current:' + currentEmployee.name);
  }

}

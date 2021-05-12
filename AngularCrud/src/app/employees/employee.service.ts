import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";


@Injectable()
export class EmployeeService {
    constructor(private httpClient: HttpClient) {

    }

    // private listEmployees: Employee[] = [
    //     {
    //         id: 1,
    //         name: 'Mark',
    //         gender: 'Male',
    //         contactPreference: 'Email',
    //         email: 'mark@pragimtech.com',
    //         dateOfBirth: new Date('10/25/1988'),
    //         department: '3',
    //         isActive: true,
    //         photoPath: 'assets/images/mark.png'
    //     },
    //     {
    //         id: 2,
    //         name: 'Mary',
    //         gender: 'Female',
    //         contactPreference: 'Phone',
    //         phoneNumber: 2345978640,
    //         dateOfBirth: new Date('11/20/1979'),
    //         department: '2',
    //         isActive: true,
    //         photoPath: 'assets/images/mary.png'
    //     },
    //     {
    //         id: 3,
    //         name: 'John',
    //         gender: 'Male',
    //         contactPreference: 'Phone',
    //         phoneNumber: 5432978640,
    //         dateOfBirth: new Date('3/25/1976'),
    //         department: '3',
    //         isActive: false,
    //         photoPath: 'assets/images/john.png'
    //     }
    // ]

    // getEmployees(): Employee[] {
    //     return this.listEmployees;
    // }

    // getEmployees(): Observable<Employee[]> {
    //     return of(this.listEmployees).pipe(delay(2000));  // Delay operator
    // }

    baseUrl = 'https://localhost:44307/api/Employees';

    getEmployees(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>('https://localhost:44307/api/Employees');
    }

    getEmployee(id: number): Observable<Employee> {
        return this.httpClient.get<Employee>('https://localhost:44307/api/Employees/' + id).pipe(catchError(this.handleError));
    }

    save(employee: Employee): Observable<Employee> {
        if (employee.id === 0) {
            return this.httpClient.post<Employee>('https://localhost:44307/api/Employees', employee)
                .pipe(catchError(this.handleError));
        }
    }

    addEmployee(employee: Employee): Observable<Employee> {
        if (employee.id === 0) {
            return this.httpClient.post<Employee>('https://localhost:44307/api/Employees', employee)
                .pipe(catchError(this.handleError));
        }
    }
    

    updateEmployee(employee: Employee): Observable<void> {
        return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }).pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client side error:', errorResponse.error.message);
        } else {
            console.error('Server side error:', errorResponse);
        }
        return throwError('There is a problem with the service. We are notified & working on it. Please try again');
    }

    /*
    save(employee: Employee) {
        if (employee.id === null) {
            const maxid = this.listEmployees.reduce(function (e1, e2) {
                return (e1.id > e2.id) ? e1 : e2;
            }).id;
            employee.id = maxid + 1;
            this.listEmployees.push(employee);
        } else {
            const foundIndex = this.listEmployees.findIndex(e => e.id === employee.id);
            this.listEmployees[foundIndex] = employee;
        }
    }*/

    /*
    getEmployee(id: number): Employee {
        return this.listEmployees.find(e => e.id === id);
    }*/



}
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/internal/operators";
import { Employee } from "../models/employee.model";
import { EmployeeService } from "./employee.service";

@Injectable()
export class EmployeeDetailsGuardService implements CanActivate {
    constructor(private _employeeService: EmployeeService, private _router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        /*
        const employeeExist = !!this._employeeService.getEmployee(+route.paramMap.get('id'));
        if (employeeExist) {
            return true;
        } else {
            this._router.navigate(['notfound']);
            return false;
        }*/

        return this._employeeService.getEmployee(+route.paramMap.get('id')).pipe(
            map(employee => {
                const employeeExist = !!employee;

                if (employeeExist) {
                    return true;
                } else {
                    this._router.navigate(['notfound']);
                    return false;
                }
            }),
            catchError((err) => {
                console.log(err);
                return of(false);
            })
        );
    }


}
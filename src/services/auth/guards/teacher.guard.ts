
import { User, UserService } from '../../user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChildFn, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

Injectable({
    providedIn: 'root'
})
export function TeacherGuard(userService: UserService, router: Router): CanActivateFn {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
        const allowedRoles = ['teacher'];

        return userService.user$.pipe(
            map((user) => {
                if (user && user.role === 'teacher') {

                    return true;
                } else {
                    router.navigate(['/unauthorized']);
                    return false;
                }
            })
        );
    };
}



import { User, UserService } from '../../user/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChildFn, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

Injectable({
    providedIn: 'root'
})
export function RoleGuard(userService: UserService, router: Router): CanActivateFn {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
        const allowedRoles = route.data.role;
        let isAdmin = false;
        let isTeacher = false;
        let isStudent = false;
        return userService.user$.pipe(
            map((user) => {
                if (user && allowedRoles.includes(user.role)) {
                    if (user.role === 'admin') {
                        isAdmin = true;
                        isTeacher = false;
                        isStudent = false;
                        console.log('admin is=>', isAdmin);
                    } else if (user.role === 'teacher') {
                        isAdmin = false;
                        isTeacher = true;
                        isStudent = false;
                        console.log('teacher is=>', isTeacher);
                    } else if (user.role === 'student') {
                        isAdmin = false;
                        isTeacher = false;
                        isStudent = true;
                        console.log('student is=>', isStudent);
                    }
                    return true;
                } else {
                    router.navigate(['/unauthorized']);
                    isAdmin = false;
                    isTeacher = false;
                    isStudent = false;
                    return false;
                }
            })
        );
    };
}


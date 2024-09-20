import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthUtils } from './auth.utils';
import { UserService } from '../user/user.service';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { Buffer } from 'buffer';
import { environment } from '../../../environments/environment';

import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

    private _authenticated: boolean = false;
    private _httpClient = inject(HttpClient);
    private _userService = inject(UserService);
    private _baseUrl = environment.baseUrl;
    private _apiKey = environment.apiKey;

    constructor(

    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }


    set userData(data: string) {
      localStorage.setItem('user', data);
  }

  get userData(): string {
      return localStorage.getItem('user') ?? '';
  }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------



    /**
     * Forgot password
     *
     * @param username
     */
    forgotPassword(email: string): Observable<any> {


        const httpOptions = {
            headers: new HttpHeaders({
                //"Content-Type": "application/json",
                "X-Api-Key": this._apiKey,
                "X-Token": 'token'

            })
        };
        const credentials = new FormData();
        credentials.append('email', email);



        return this._httpClient.post(this._baseUrl + '/user/remind_password', credentials, httpOptions).pipe(
            switchMap((response: any) => {

                //console.log(response);

                // Return a new observable with the response
                return of(response);
            }),
        );


    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(reset_token: string, password: string, password_confirmation: string): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                //"Content-Type": "application/json",
                "X-Api-Key": this._apiKey,

            })
        };
        const credentials = new FormData();
        credentials.append('Reset_token', reset_token);
        credentials.append('password', password);
        credentials.append('password_confirmation', password_confirmation);

        return this._httpClient.post(this._baseUrl + '/user/reset_password', credentials, httpOptions).pipe(
            switchMap((response: any) => {

                console.log(response);

                // Return a new observable with the response
                return of(response);
            }),
        );;
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(email: string, password: string): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                //"Content-Type": "application/json",
                "X-Api-Key": this._apiKey
            })
        };
        const credentials = new FormData();
        credentials.append('email', email);
        credentials.append('password', password);
        credentials.append('user_type', 'customer');



        return this._httpClient.post(this._baseUrl + '/api/v2/auth/login', credentials).pipe(
            switchMap((response: any) => {
                // Store the access token in the local storage
                this.accessToken = response.access_token;
                this.userData = JSON.stringify(response.user);
                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return a new observable with the response
                return of(response);
            }),
        );
    }


    signInUsingToken(): Observable<any> {



        const httpOptions = {
          headers: new HttpHeaders({
            //"Content-Type": "application/json",
            "Authorization": `Bearer ${this.accessToken}`,
          })
        };




        // Sign in using the token
        return this._httpClient.get(this._baseUrl + '/user/profile', httpOptions).pipe(
            catchError((error: any) => {
                console.error('An error occurred:', error.error.message);
                // Return false
                return of(false);
            }),
            switchMap((response: any) => {
              console.log('access token response =>' + response);
              this.accessToken = localStorage.getItem('accessToken') ?? '';

              this._authenticated = true;
              this._userService.user = response.data.user;

              return of(true);
            }),
        );
    }



    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.clear();
        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    // signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
    //     return this._httpClient.post('https://api.module.school/api/user/add', user);
    // }



    signUp(full_name: string, email: string, username: string, password: string, group: string, role: string): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                //"Content-Type": "application/json",
                "X-Api-Key": this._apiKey,
            })
        };
        const credentials = new FormData();
        credentials.append('full_name', full_name);
        credentials.append('email', email);
        credentials.append('username', username);
        credentials.append('password', password);
        credentials.append('group[]', group); // Append 'group[]' as an array value
        credentials.append('role', role);

        return this._httpClient.post(this._baseUrl + '/user/add', credentials, httpOptions).pipe(
            switchMap((response: any) => {

                if (response.status === true) {

                    console.log('user created=>' + JSON.stringify(response));

                }


                return of(response);
            }),
        );
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists, and it didn't expire, sign in using it
        return this.signInUsingToken();
    }





}

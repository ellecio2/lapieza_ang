import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User, UserPayDetails, UserSubsc } from '../user/user.types';
import { environment } from 'environments/environment';
import { BehaviorSubject, map, Observable, of, ReplaySubject, switchMap, tap } from 'rxjs';
import { Buffer } from 'buffer';
import { Router } from '@angular/router';



@Injectable({providedIn: 'root'})
export class UserService
{
    private _httpClient = inject(HttpClient);
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    private _userSubscription: BehaviorSubject<UserSubsc[] | null> = new BehaviorSubject(null);

    private _baseUrl = environment.baseUrl;
    private _apiKey = Buffer.from(environment.apiKey, 'base64').toString('binary');
    private _router: Router;
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User)
    {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current signed-in user data
     */
    get(): Observable<User>
    {
        const httpOptions = {
            headers: new HttpHeaders({
            //"Content-Type": "application/json",
            "X-Api-Key": this._apiKey,
            "X-Token": localStorage.getItem('accessToken'),
          })
          };

        return this._httpClient.get<User>(this._baseUrl+'/user/profile', httpOptions).pipe(
            tap((user) =>
            {
                this._user.next(user);
                console.log('get user is=>', user);
            }),
        );
    }



    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) =>
            {
                this._user.next(response);
            }),
        );
    }

    checkRole(checkRole: string, userRole?: string): boolean | void {
        if (userRole === undefined) {
          // Handle the case where userRole is undefined
          console.error('userRole is undefined');
          return;
        }
        if (userRole === checkRole) {
          return false;
        } else {
            return true;
        }
      }

        //get user subscription

        getUserSubsc(id: string, module_id: string): Observable<UserSubsc> {
            const httpOptions = {
                headers: new HttpHeaders({
                    "X-Api-Key": this._apiKey,
                    "X-Token": localStorage.getItem('accessToken')
                })
            };

            return this._httpClient.get<UserSubsc>(`${this._baseUrl}/user_subscription/all?filter=&field=&start=&limit=&filters[0][co][0][fl]=user_id&filters[0][co][0][op]=equal&filters[0][co][0][vl]=${id}&filters[0][co][0][lg]=and&filters[0][co][1][fl]=module_id&filters[0][co][1][op]=equal&filters[0][co][1][vl]=${module_id}&filters[0][co][1][lg]=and&sort_field=&sort_order=ASC`, { ...httpOptions }).pipe(
                map((userSubscriptionDetails: any) => {
                    // Update the course
                    this._userSubscription.next([userSubscriptionDetails.data.user_subscription]);
                    //console.log('User Subscription Is data =>', userSubscriptionDetails.data.user_subscription);
                    // Return the course
                    return userSubscriptionDetails.data.user_subscription;
                }),
                switchMap((userSubscriptionDetails: any) => {
                    if (!userSubscriptionDetails) {
                        throw new Error('Could not find User sub with id of ' + id + '!');
                    }

                    return of(userSubscriptionDetails);
                }),
            );
        }

        getUserHistoryPay(id: string, module_id: string): Observable<UserSubsc> {
            const httpOptions = {
                headers: new HttpHeaders({
                    "X-Api-Key": this._apiKey,
                    "X-Token": localStorage.getItem('accessToken')
                })
            };

            return this._httpClient.get<UserSubsc>(`${this._baseUrl}/user_pay/all?filter=&field=&start=&limit=&filters[0][co][0][fl]=user_id&filters[0][co][0][op]=equal&filters[0][co][0][vl]=${id}&filters[0][co][0][lg]=and&filters[0][co][1][fl]=module_id&filters[0][co][1][op]=equal&filters[0][co][1][vl]=${module_id}&filters[0][co][1][lg]=and&sort_field=&sort_order=ASC`, { ...httpOptions }).pipe(
                map((userHistoryPay: any) => {
                    // Update the course
                    this._userSubscription.next([userHistoryPay.data.user_pay]);
                    //console.log('User Subscription Is data =>', userSubscriptionDetails.data.user_subscription);
                    // Return the course
                    return userHistoryPay.data.user_pay;
                }),
                switchMap((userHistoryPay: any) => {
                    if (!userHistoryPay) {
                        throw new Error('Could not find User history pay with id of ' + id + '!');
                    }

                    return of(userHistoryPay);
                }),
            );
        }


        getUserPayDetails(id: string): Observable<UserPayDetails> {
            const httpOptions = {
                headers: new HttpHeaders({
                    "X-Api-Key": this._apiKey,
                    "X-Token": localStorage.getItem('accessToken')
                })
            };

            return this._httpClient.get<UserPayDetails>(`${this._baseUrl}/user_pay_details/all?filter=&filter=&field=&start=&limit=&filters[0][co][0][fl]=user_pay_id&filters[0][co][0][op]=equal&filters[0][co][0][vl]=${id}&filters[0][co][0][lg]=and&sort_field=&sort_order=ASC`, { ...httpOptions }).pipe(
                map((userHistoryPay: any) => {
                    // Update the course
                    this._userSubscription.next([userHistoryPay.data.user_pay_details]);
                    //console.log('User Subscription Is data =>', userSubscriptionDetails.data.user_subscription);
                    // Return the course
                    return userHistoryPay.data.user_pay_details;
                }),
                switchMap((userHistoryPay: any) => {
                    if (!userHistoryPay) {
                        throw new Error('Could not find User history pay with id of ' + id + '!');
                    }

                    return of(userHistoryPay);
                }),
            );
        }

}
export { User };


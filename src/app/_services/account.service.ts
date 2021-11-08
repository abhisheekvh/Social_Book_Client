import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl='http://localhost:63813/api/'
private currentUserSource=new ReplaySubject<User | null>(1);
currentUser$=this.currentUserSource.asObservable();
  constructor(private httpclient:HttpClient) { }

  login(model:any)
  {
    return this.httpclient.post<User>(this.baseUrl+ 'account/login',model).pipe(
      map((Response:User)=>{
        const user =Response;
        if(user)
        {
          console.log(user)
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);

        }
      })
    );
  }
  setCurentUser(user:User)
  {
    console.log(user)
    this.currentUserSource.next(user);
  }
  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  register(model:any)
  {
    return this.httpclient.post<User>(this.baseUrl+'account/register',model).pipe(
      map((usr:User)=>{
        if(usr)
        {
          localStorage.setItem('user',JSON.stringify(usr));
          this.currentUserSource.next(usr);
        }
        return usr;
      })
    )
  }
}

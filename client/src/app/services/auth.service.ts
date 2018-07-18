import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  domain = "http://localhost:8080";
  authToken;
  user;
  options;

  constructor(
    private http: Http
  ) { }

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    });
  }



  postClients() {
    this.options = new RequestOptions({
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type':'application/json',
        'authorization': 'Bearer: eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiIzNjM2NjM4ODE3NzcyZTQyYjU5ZDc0Y2ZmNTcxZmJiMyIsImF1ZCI6IkFQSSIsInJsbSI6ImJ1c2luZXNzX3Byb2ZpbGUiLCJjdGQiOjE1MzE5MDA0MDc5MDYsImlzcyI6IlN5bmVyaXNlIiwiYnBpIjoxNjksImV4cCI6MTUzMTkwNDAwNywiYXBrIjoiNThEN0NBMEItOUE4Ri02REI2LTlCQ0MtMzkwRjU2RjE1QjQ4In0.YEZRrXel9kJ7ob-Mzfo0xo_9ZMWmsjJ1YUXW0kdG4CShTkWH6y9kEqI33FcdBEmn4qhh_HN6NwzAjIMLT3w2BxEPhIl_VVB_7zZCSUVyoudxiW5qDwR1-R86LcNhg2v4wUOpeoTvxacZQTlgOnkaG3lkuHO74Ty6ArVeHBALzjcdYle-1-Q8fGPOCG62ZxXn4bcCxXcbM-bzGcBuTAc3qo9ADTyB2_UMVwUbyXTkc_KL6KB5EEyBh4a6YgAw58r13RkgWDDvEajs6YPGQ7f7v7e9AqXHZEV-IFaKN5nZURAjdnOpIZfCqk_DYK63ERc3u_1ZR2NEKDTPJUSGIXlAgNgZfetSgVCEzmr6uurGhXDaDzE-P5t24ZvqZegsUdQzU6naq99kG7N6kNAkRZDMLaAsukCxpE1ZnKhr0xjZvYQZC6-5GyOwe2SA-R0Vg65-KN6_T6O_HCdJyAUvMx1GDSdwYWm-ep41mtwA7Hn1zW8RYbOqSGMc8mnm0DYOzuC90d51Y8orDsFcEDLMizN6NV5fxb_6b-EeJ927kUINAThCZZGE3pv8sTBHABVvk46F3OKH3LKGZI81PbWhO5CseK4WA2Cs2A5GCJTuvR6voPGxGXWpzvHk0fKsWf9rY13si6UArp-UOXyR854TkvgVEnMMWlBshXLmhhS4gYBty3Y',
        'Api-Version': '4.0'
      })
    });
  }

  postIt(clients){
    this.postClients();
    return this.http.post('https://api.synerise.com/v4/clients/batch', clients, this.options);
  }


  loadToken() {
    this.authToken = localStorage.getItem('token');
  }

  registerUser(user){
    return this.http.post(this.domain + '/authentication/register', user).map(res => res.json());
  }

  checkUsername(username){
    return this.http.get(this.domain + '/authentication/checkUsername/' + username).map(res => res.json());
  }

  checkEmail(email){
    return this.http.get(this.domain + '/authentication/checkEmail/' + email).map(res => res.json());
  }

  login(user) {
    return this.http.post(this.domain + '/authentication/login', user).map(res => res.json());
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/authentication/profile', this.options).map(res => res.json());
  }

  getPublicProfile(username) {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/authentication/publicProfile/' + username).map(res => res.json());
  }  

  loggedIn() {
    return tokenNotExpired();
  }

}

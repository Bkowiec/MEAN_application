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
        'authorization': 'Bearer: eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJjOGZmZTlhNTg3YjEyNmYxNTJlZDNkODlhMTQ2YjQ0NSIsImF1ZCI6IkFQSSIsInJsbSI6ImJ1c2luZXNzX3Byb2ZpbGUiLCJjdGQiOjE1MzQ3OTc2NjI2OTgsImlzcyI6IlN5bmVyaXNlIiwiYnBpIjoxMjQsImV4cCI6MTUzNDgwMTI2MiwiYXBrIjoiOUFGRkFFNDYtRkQyNS01NDc4LTA5ODAtNzU0NzRDRURDQjFDIn0.FVY-0ngbLqVhxyGkQfbRBURpT9dlvEE7hWF7V2CAsEmmupIbA8n9wNVwHX5EPwzPaZxNnHbuW18_0u61xQSzfEyCy2UQp5eBArzrMv-641mn8T4WePDosFjxROdHDlSKp5574bOQghuSsMax-ZLbRkJBpIiPA6cgKdPkCToy6_zizLqGMPsCIq-b6s1Ihsvi5Vs_fhioATCYqgiV2SOoZ9m_v0IMhs4x9u1_JCP5vnW__pT8a-8sq8qMSJWMmW5MuMKLAl3BufJevE4zYqdHlIFuTt_zd69HLGPqPSv4EBY6fBeXfLJtTyKDCpIZfWqxq9SG_4u1-uiGbCIBtqa9F1-W7binmq8pz8-n8CiGFmeNTBvfx75EUACdWn7GVX0T2fJN7Mfq8W_qIEMj-5VTAkFrkbmTYLkURQcKXRxcn-Dz3vxYm7g8lYuYM-8ZC5bmIbGosmGNa6WexG-fwkOssz1OeX0Gg9X3QCMC5MyBMwhzyFECT_17_6Np5Nee4tr9paj30U1Ak6B86T3Bauov5l4V7OugEkbh2CtCGIsdSPACEKrdPgG71n1LP2fJ1bNd-XLenD2X3CsEn4cQVZjhqPuLbBWkaZyj4a3P94FvdUkQFuKI9tFGe2-Wpt88hTwCxlCIv6Ukv-1zgMHo8qIP2vwFH_GyFWU1TvSq7AbTwOk',
        'Api-Version': '4.0'
      })
    });
  }

  postIt(clients){
    this.postClients();
    return this.http.post('https://api.synerise.com/v4/events/custom', clients, this.options);
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

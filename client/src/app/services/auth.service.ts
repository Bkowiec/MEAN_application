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
        'authorization': 'Bearer: eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiI2ZWEyZWY3MzExYjQ4MjcyNGE5YjdiMGJjMGRkODVjNiIsImF1ZCI6IkFQSSIsInJsbSI6ImJ1c2luZXNzX3Byb2ZpbGUiLCJjdGQiOjE1MjYxNzgxNDIxOTIsImlzcyI6IlN5bmVyaXNlIiwiYnBpIjo0ODAsImV4cCI6MTUyNjE4MTc0MiwiYXBrIjoiNDUwQTgzM0YtNDg4NC03Njg4LUFCQTYtRUE0N0M2M0Q4Njk0In0.MV8tj9fEUBpAA95xDPDH-ObhGZWMumfAJSj30Jb5QwY5-VogWdise7stpMi43f16KsUMG_l5gVx4QqsGiv2n103sZovuBJ7h72F1rBYkJPZgCn5sayAoba_QvEWB17k5oVyPIzDEAkIiVVt5BKIRyqBih8JS3EI1ZJjWHkCdkm2xrTFWBTmnzo1NU_KMMENc2hU7xJ7qpEIyq-5o4lfou59MmpxpqPpNDYL22Dxcq54XHXbBEwm6Pc8-uT0PB6r3PObAylt-5haYFcc76xyHRNSHY1Bl08Z4daKB2vt3hlds5MK3tMLG0t5pIILjOwpc6iH7HSzwmAyAOOpBrt2OmjRJMrkN7iX14RBvrmnRbX6nk2ObCGVg5DvOvMdX2TEsyfCa973zPLZ6KVOBYl5x2asD3LzBp2xir9mdlQrD_fvdSB5QC1YF20Ef-z33tmAPxnmG_CN-VnSLuPkGT_CVkXFjz5zpEFKgdImGQEiEaz1lphkr-fkxhoa3w39CfVd2URMvd6p-1VN_sGRcV7fq6x-tH-Z-qjHAcizd4wkeS5_h9u7WPUea059rjt9pNWi3DYPM8OM5W6bSAdeSgpdE_evU9IeOUUhJL47mRdI-5KhqS4aQF7SiZKmXKbIZ7kjvNB854kMTIMuwZ-MTGasqA-MlaMONA-nDnDjCwRIjZO8',
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

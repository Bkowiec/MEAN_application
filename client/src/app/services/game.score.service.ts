import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class GameScoreService {
  private options;
  private domain = this.authService.domain;


  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  createAuthenticationHeaders() {
    this.authService.loadToken();

    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    });
  }
  save(gameScoreToSave: { carType: string; score: number; createdBy: any }) {
    this.createAuthenticationHeaders();
    return this.http.post(this.domain + '/games', gameScoreToSave, this.options).map(res => res.json())

  }

  getAll(): Observable<any> {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/games', this.options).map(res => res.json())
  }
}

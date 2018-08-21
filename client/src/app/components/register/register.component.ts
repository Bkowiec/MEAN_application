import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  Form
} from '@angular/forms';
import {
  AuthService
} from '../../services/auth.service'
import {
  Router
} from '@angular/router'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;
  importplus = 0;
  toimport = 0;
  elomelo = '';
  importprocent = 0;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}



  postIt() {

    var shops = []

var events = [];

    events.forEach(function(item){
      shops.forEach(function(item2){
        if(item2.email.match(item.params.shopId)){	
          item.client.uuid = item2.uuid;		
        }
      })
    })

// console.log(JSON.stringify(events));
document.querySelector('.areatext').value = JSON.stringify(events)

    const user = events;
    
this.toimport = user.length;
    for (var i = 0; i < user.length; i++) {
      const client = [];
      client.push(user[i]); 
      this.authService.postIt(client[0]).subscribe(
        data => {
        if (!data.ok == true) {
          // console.log(client[0]);
          // console.log('niezaimportowany!');
          return;
        } else {
          // console.log(client[0]);
          // console.log('zaimportowany');
          var item = document.createElement("li");
          item.innerText = JSON.stringify(client[0]);
          document.querySelector('.successItem').appendChild(item);
          var objDiv = document.querySelector('.successItem');
          objDiv.scrollTop = objDiv.scrollHeight;
          this.importplus += 1;
          this.importprocent = Number(((this.importplus / this.toimport) * 100).toFixed(2));
        }
      },
        error => {
          // console.log(client[0]);
          var item = document.createElement("li");
          item.innerText = JSON.stringify(client[0]);
          document.querySelector('.errorItem').appendChild(item);
          var objDiv2 = document.querySelector('.errorItem');
          objDiv2.scrollTop = objDiv2.scrollHeight;
        },
        () => {
        
        }
      );
    }
  }

  ngOnInit() {}

}

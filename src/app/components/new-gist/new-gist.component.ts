import {
  Component,
  OnInit,
  NgZone
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  DataService
} from '../../services/data.service';
import {
  AuthService
} from "../../services/auth.service";

@Component({
  selector: 'app-new-gist',
  templateUrl: './new-gist.component.html',
  styleUrls: ['./new-gist.component.css']
})
export class NewGistComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router,
    public ngZone: NgZone,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  createGist(form: NgForm) {

    if (form.valid) {

      let data: {
        title: string,
        email: string,
        timestamp: number,
        code: string
      } = {
        title: form.value.title,
        code: form.value.code,
        email: this.authService.userState.email,
        timestamp: Math.floor((new Date()).getTime() / 1000)
      }

      this.dataService.createGist(data)
        .then(res => {
          this.router.navigate(['my-gists']);
        });
    }

  }

}

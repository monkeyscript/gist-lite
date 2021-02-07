import {
  Component,
  OnInit
} from '@angular/core';
import {
  DataService
} from '../../services/data.service';
import {
  AuthService
} from '../../services/auth.service';

@Component({
  selector: 'app-my-gists',
  templateUrl: './my-gists.component.html',
  styleUrls: ['./my-gists.component.css']
})
export class MyGistsComponent implements OnInit {

  gists: any[]

  constructor(
    private dataService: DataService,
    public authService: AuthService,
  ) {
    this.gists = [];
  }

  ngOnInit(): void {

    let timer = setInterval(() => {
      if(this.authService.userState != undefined) {
        clearInterval(timer);
        this.loadGists()
      }
    }, 1000);

  }

  loadGists() {

    this.gists = [];

    this.dataService
      .loadGists().subscribe(res => {
        this.gists = res;
        this.formatList()
      });
  }

  formatList() {

    this.gists.sort((a, b) => {
      return b.payload.doc.data().timestamp - a.payload.doc.data().timestamp;
    });

    this.gists.forEach(
      gist => {
        var date = new Date(gist.payload.doc.data().timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var month = 1 + date.getMonth();
        var formattedTime = date.getDate() + '/' + month + '/' + date.getFullYear() + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        gist.formattedTime = formattedTime;

        gist.code = gist.payload.doc.data().code

      }
    )
  }

  deleteGist(gist: any) {
    this.dataService.deleteGist(gist);
  }

}

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

  isEmpty: boolean=true;

  constructor(
    private dataService: DataService,
    public authService: AuthService,
  ) {
    this.gists = [];
  }

  ngOnInit(): void {

    // Run a loop to check if the user state is ready or not 
    // Once readSync, load the list of gists 
    let timer = setInterval(() => {
      if(this.authService.userState != undefined) {
        clearInterval(timer);
        this.loadGists()
      }
    }, 100);

  }

  //
  // Load the list
  //
  loadGists() {

    this.dataService
      .loadGists().subscribe(res => {
        this.gists = res;
        this.formatList()
      });
  }

  //
  // Sort and format the list
  //
  formatList() {

    // Sort the list based on timestamp
    this.gists.sort((a, b) => {
      return b.payload.doc.data().timestamp - a.payload.doc.data().timestamp;
    });

    // Iterate and format time 
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

        // If at least one entry is there for current user, set flag to disable image 
        if(gist.payload.doc.data().email == this.authService.userState.email) {
          this.isEmpty=false;
        }

      }
    )
  }

  //
  // Remove a gist
  //
  deleteGist(gist: any) {
    this.dataService.deleteGist(gist);
  }

}

import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthService
} from "../../services/auth.service";
import {
  DataService
} from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gists : any[]

  constructor(
    private dataService: DataService,
    public authService: AuthService
  ) {
    this.gists = [];
  }

  ngOnInit(): void {
    

    this.loadGists()
  }

  loadGists() {
    this.dataService
      .loadGists().subscribe(res => {
        console.log(res)
        this.gists = res
      });
  }

  deleteGist(gist:any) {
    this.dataService.deleteGist(gist);
  }

}

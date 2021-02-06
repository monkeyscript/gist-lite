import {
  Component,
  OnInit
} from '@angular/core';
import {
  DataService
} from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  gists: any[]

  constructor(
    private dataService: DataService,
  ) {
    this.gists = [];
  }

  ngOnInit(): void {
    this.loadGists()
  }

  loadGists() {
    this.dataService
      .loadGists().subscribe(res => {
        this.gists = res
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

}

import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-new-gist',
  templateUrl: './new-gist.component.html',
  styleUrls: ['./new-gist.component.css']
})
export class NewGistComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router,
    public ngZone: NgZone
  ) { }

  ngOnInit(): void {
  }

  createGist(form:NgForm) {
    console.log(form.value)

    this.dataService.createGist(form.value)
         .then(res => {
           console.log(res)
          this.ngZone.run(() => {
            this.router.navigate(['home']);
          });
             /*do something here....
             maybe clear the form or give a success message*/
         });
  }

}

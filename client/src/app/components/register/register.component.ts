import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    // this.ordersService.createCoffeeOrder(data)
    //      .then(res => {
    //          ///*do something here....
    //          maybe clear the form or give a success message*/
    //      });/
  }

}

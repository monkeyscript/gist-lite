import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  createCoffeeOrder(data:any) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("coffeeOrders")
            .add(data)
            .then(res => {}, err => reject(err));
    });
  }

  getCoffeeOrders() { 
    return 
     this.firestore.collection("coffeeOrders").snapshotChanges();
  }

}

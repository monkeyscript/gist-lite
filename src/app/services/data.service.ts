import {
  Injectable
} from '@angular/core';
import {
  AngularFirestore
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: AngularFirestore
  ) {}

  //
  // Create a new gist 
  //
  createGist(data: any) {
    return new Promise < any > ((resolve, reject) => {
      this.firestore
        .collection("gists")
        .add(data)
        .then(res => { resolve(res) }, err => reject(err));
    });
  }

  //
  // Load all gists 
  //
  loadGists() {
    return this.firestore.collection("gists").snapshotChanges();
  }

  //
  // Remove a gist 
  //
  deleteGist(data: any) {
    return this.firestore
              .collection("gists")
              .doc(data.payload.doc.id)
              .delete();
  }

}

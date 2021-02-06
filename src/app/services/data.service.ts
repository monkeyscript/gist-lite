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

  createGist(data: any) {
    return new Promise < any > ((resolve, reject) => {
      this.firestore
        .collection("gists")
        .add(data)
        .then(res => { resolve(res) }, err => reject(err));
    });
  }

  loadGists() {
    return this.firestore.collection("gists").snapshotChanges();
  }

  updateGist(data: any) {
    return this.firestore
              .collection("gists")
              .doc(data.payload.doc.id)
              .set({
                completed: true
              }, {
                merge: true
              });
  }

  deleteGist(data: any) {
    return this.firestore
              .collection("gists")
              .doc(data.payload.doc.id)
              .delete();
  }

}

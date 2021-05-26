import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Observable, Subject } from 'rxjs';
import { kidinfo } from '../app/interfaces/kidinfo';
@Injectable({
  providedIn: 'root'
})

export class KidstoreService {

  public kidsArray: kidinfo[] = [];
   constructor(private store: Storage) {
  }

  async init()
  {
    await this.store.create();
  }

  public LoadKids() {
    this.kidsArray = [];
    var allKeys = this.store.keys().then(allKeys => {
      allKeys.forEach(kid=> {
        this.store.get(kid).then(kidInfo => this.kidsArray.push(kidInfo) );
      }
      );
    });

  }

  public StoreKids() {
    this.store.clear().then(()=> {
      this.kidsArray.forEach(kidinfo => {
        this.store.set(kidinfo.name, kidinfo).then(()=> { console.log(kidinfo.name + "gespeichert")});
        });
    });
  }

}

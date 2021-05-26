import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { Observable, Subject } from 'rxjs';
import { pairedList } from './interfaces/pairedList';

@Injectable({
  providedIn: 'root'
})
export class BtService {

  public status = new Subject<string>();
  public isInitialized : boolean = false;
  public ErrorMessage : string = null;
  public pairedList: pairedList[] = null;
  constructor(private bt: BluetoothSerial) { }

  public initialize() {
      this.status.next("Initialize Bluetooth");
    this.bt.isEnabled().then(success=> {
      this.status.next("List Paired Devs");
      this.listPairedDevs();
    }, error => {
      this.ErrorMessage = "Please enable bluetooth";
    });


  }
  listPairedDevs() {
    this.bt.list().then(success=> {
      this.pairedList = success;
      console.log("got list");
      console.log(success);
      this.pairedList.forEach(element => {
        if (element.name === "KiddyBank") {
          this.status.next("Connecting to: " +element.id);
          this.connectTo(element);
          return;
        }
      });
    }, error => {
      this.status.next("error listing devices");
      this.ErrorMessage = "unable to list devices";
  });
  }

  private connectTo(element: pairedList) {
    this.bt.connectInsecure(element.address).subscribe(success => {
      this.status.next("Sucessfully connected");

      this.bt.subscribe("\n").subscribe(success => {
        this.handleData(success);
    }, error => {
          console.log(error);
          this.status.next("error connecting KiddyBank");
          this.ErrorMessage = error;
      } );
    }, error => {
      console.log("error while connecting");
      this.status.next("error: " + error);
    } );
  }

  private handleData(success: any) {
    console.log("received: " + success);
  }

  public sendData(test: string)
  {
    this.bt.write(test);
  }

}

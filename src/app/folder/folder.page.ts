import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BtService } from '../bt.service';
import { AlertController} from '@ionic/angular'

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public btStatus: string = "nicht verbunden";

  constructor(private activatedRoute: ActivatedRoute, private btSerice: BtService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.btSerice.status.subscribe(message => this.btStatus = message);
  }

  public aktualisieren() {
    this.btSerice.initialize();

  }

  public sendTest()
  {
    this.btSerice.sendData("abc die katze liegt im schnee");
  }

}

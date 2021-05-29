import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddkidComponent } from './addkid.component';

import { AddkidRoutingModule} from './addkid-routing.module';

@NgModule({
  declarations: [ AddkidComponent ],
  imports: [
    AddkidRoutingModule,CommonModule, FormsModule, IonicModule
  ]
})
export class AddkidModule { }

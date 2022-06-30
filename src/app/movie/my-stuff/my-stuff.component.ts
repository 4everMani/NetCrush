import { Component, OnInit } from '@angular/core';
import { MyStuff } from '../utilities/mode.enum';

@Component({
  selector: 'app-my-stuff',
  templateUrl: './my-stuff.component.html',
  styleUrls: ['./my-stuff.component.scss']
})
export class MyStuffComponent implements OnInit {

  public mode = MyStuff;

  public isWatcLaterEnabled = true;

  constructor() { }

  ngOnInit(): void {
  }

  public changeMode(mode: MyStuff): void{
    if (this.isWatcLaterEnabled && mode === MyStuff.favourtie){
      this.isWatcLaterEnabled = false;
    }
    else if (!this.isWatcLaterEnabled && mode === MyStuff.watchLater){
      this.isWatcLaterEnabled = true
    }
  }

}

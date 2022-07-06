import { Component, OnInit } from '@angular/core';
import { MyStuff } from '../utilities/mode.enum';

@Component({
  selector: 'app-my-stuff',
  templateUrl: './my-stuff.component.html',
  styleUrls: ['./my-stuff.component.scss']
})
export class MyStuffComponent implements OnInit {

  /**
   * mystuff mode enum
   */
  public mode = MyStuff;

  /**
   * indicates that we are in watch later section of my-stuff
   */
  public isWatcLaterEnabled = true;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * On changing mode from watch later to favourite or vice-versa
   * @param mode 
   */
  public changeMode(mode: MyStuff): void{
    if (this.isWatcLaterEnabled && mode === MyStuff.favourtie){
      this.isWatcLaterEnabled = false;
    }
    else if (!this.isWatcLaterEnabled && mode === MyStuff.watchLater){
      this.isWatcLaterEnabled = true
    }
  }

}

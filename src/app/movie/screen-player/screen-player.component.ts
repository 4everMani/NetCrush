import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen-player',
  templateUrl: './screen-player.component.html',
  styleUrls: ['./screen-player.component.scss']
})
export class ScreenPlayerComponent implements OnInit {

  @Input() videoUrl: string = 'https://www.youtube.com/embed/z6cBtguFSTk'

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { initVirtualMirror, destroyVirtualMirror } from './utils/BRFv4DemoMinimalWebcam';

@Component({
  selector: 'app-ar',
  templateUrl: './ar.component.html',
  styleUrls: ['./ar.component.css']
})
export class ArComponent implements OnInit, OnDestroy {

  constructor() { }
  ngOnInit() {
    initVirtualMirror();
  }

  ngOnDestroy() {
    destroyVirtualMirror();
  }

}

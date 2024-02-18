import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-pfooter',
  templateUrl: './pfooter.component.html',
  styleUrls: ['./pfooter.component.css']
})
export class PfooterComponent {
  constructor(private viewportScroller: ViewportScroller, @Inject(DOCUMENT) private document: Document) { }

  scrollToTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

}

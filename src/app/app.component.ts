import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  isCellSelected: boolean = false;
  startedXIndex: number;
  startedYIndex: number;
  @ViewChild('mainDiv', { static: false }) private mainDiv: ElementRef;

  @HostListener('document:click', ['$event'])
  clickout() {
    this.onMouseUp();
  }

  onMouseDown(xIndex: number, yIndex: number) {
    this.isCellSelected = true;
    this.startedXIndex = xIndex;
    this.startedYIndex = yIndex;
  }

  onMouseUp() {
    this.isCellSelected = false;
    this.startedXIndex = -1;
    this.startedYIndex = -1;
    const mainDiv = this.mainDiv.nativeElement as HTMLElement;
    const filledSpans = mainDiv.getElementsByClassName('fill-span');
    for (let i = filledSpans.length - 1; i >= 0; i--) {
      filledSpans[i].classList.remove('fill-span');
    }
  }

  onMouseMove(event: any, mainIndex: number, innerIndex: number) {
    if (this.isCellSelected) {
      event.srcElement.classList.add('fill-span');
      if (mainIndex == innerIndex && this.startedXIndex == this.startedYIndex) {
        for (let i = 0; i <= mainIndex; i++) {
          for (let j = 0; j <= innerIndex; j++) {
            const element = document.getElementById('innerSpan' + i + j) as HTMLElement;
            element?.classList.add('fill-span')
          }
        }
      }
    }
  }
}

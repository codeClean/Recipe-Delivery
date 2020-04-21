import { Component, OnInit, Input, Output,EventEmitter, Injectable } from '@angular/core';
import { state, trigger, style, transition, animate, keyframes } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css'],
  animations: [
    trigger('triggerMessage', [
      state('in', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        animate(4000, keyframes([
          style({
            transform: 'translateY(-100px)',
            backgroundColor: 'green',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'translateY(0px)',
            backgroundColor: '#333',
            opacity: 1,
            offset: 0.4
          }),
          style({
            transform: 'translateY(0px)',
            backgroundColor: '#333',
            opacity: 1,
            offset: 0.6
          }),
          style({
            transform: 'translateY(100px)',
            backgroundColor: 'red',
            opacity: 1,
            offset: 1,
          'z-index': 100
          })
        ]))
      ])
    ])
  ]

})
export class AlertModalComponent implements OnInit {

 @Input() message: string;
 @Input() type: string;

 // tslint:disable-next-line: no-output-native
 @Output() close = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
    console.log('error message ' + this.message);
  }
 onClose() {
   console.log('closing alert');
   this.close.emit();
  }
}

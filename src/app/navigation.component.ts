import {Component, Input} from '@angular/core';
import {AppComponent} from './app.component';


@Component({
  selector: 'navigation',
  template: `
            <div style="padding:0px 50px">
              <ul class="pager">
                <li  *ngIf="app.hasPrevious()" class="previous"><a href="javascript:void(0)" (click)="app.onPrevious()">Previous</a></li>
                <li  *ngIf="app.hasNext()" class="next"><a href="javascript:void(0)" (click)="app.onNext()">Next</a></li>
              </ul>
            </div>
`
})
export class NavigationComponent {

  @Input() public app: AppComponent;

}

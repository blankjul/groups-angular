import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {StudentComponent} from './student.component';
import {ConstraintsComponent} from './constraints.component';
import {GroupLimitComponent} from './group.limits.component';
import {Problem} from './model/problem';
import {ResultComponent} from './result.component';
import {ConstraintsGroupComponent} from './constraints.groups.component';
import {NavigationComponent} from './navigation.component';
import {AlgorithmComponent} from './algorithm.component';
import {ResultService} from './result.service';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    StudentComponent,
    ConstraintsComponent,
    ConstraintsGroupComponent,
    GroupLimitComponent,
    AlgorithmComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [Problem, ResultService],
  bootstrap: [AppComponent]
})
export class AppModule { }


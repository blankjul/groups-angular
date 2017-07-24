import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {StudentComponent} from "./student.component";
import {ConstraintsComponent} from "./constraints.component";
import {GroupLimitComponent} from "./group.limits.component";
import {Problem} from "./model/problem";
import {ResultComponent} from "./result.component";
import {ConstraintsGroupComponent} from "./constraints.groups.component";
import {NavigationComponent} from "./navigation.component";
import {AlgorithmComponent} from "./algorithm.component";
import {ResultService} from "./result.service";
import {ToastModule} from 'ng2-toastr/ng2-toastr';

@NgModule({
  imports: [BrowserModule, FormsModule, ToastModule.forRoot()],
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
  providers: [Problem, ResultService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

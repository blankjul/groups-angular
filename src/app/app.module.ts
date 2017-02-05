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
import {ToastModule} from "ng2-toastr";
import {ToolTipModule} from "angular2-tooltip/src/tool-tip.module";

@NgModule({
  imports: [BrowserModule, FormsModule, ToastModule, ToolTipModule],
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

import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Problem} from './model/problem';
import {fromJson, toJson} from './util/io';
import {AbstractComponent} from './abstract.component';
import {StudentComponent} from './student.component';
import {ConstraintsComponent} from './constraints.component';
import {GroupLimitComponent} from './group.limits.component';
import {ResultComponent} from './result.component';
import {NavigationComponent} from './navigation.component';
import {AlgorithmComponent} from './algorithm.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  entryComponents: [
    NavigationComponent,
    StudentComponent,
    ConstraintsComponent,
    GroupLimitComponent,
    ResultComponent,
    AlgorithmComponent]
})
export class AppComponent extends AbstractComponent implements OnInit {

  constructor(public problem: Problem,
              private vc: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {
    super();

  }

  @ViewChild('content', {static: true, read: ViewContainerRef}) content: ViewContainerRef;

  public component: any;
  public counter = 0;
  public components: any[] = [StudentComponent, ConstraintsComponent, GroupLimitComponent, AlgorithmComponent, ResultComponent];
  public txtInput: string;


  public json = `{
    "groupLimits": [4,4,4,4],
  "members": [
    {
      "name": "Kevin Schw.",
      "preferences": ["Dennis Kr.", "Bünjamin E.","Steven R."],
      "rejections": ["Max Schn.", "Jonas H."]
    },
    {
      "name": "B. Gültekin",
      "preferences": ["Tobias Tr.", "Konstantin","Jonas H."],
      "rejections": ["Sven R.", "Yannik H."]
    },
    {
      "name": "Sven R.",
      "preferences": ["Dennis Kr.", "Yannik H.","Dennis H."],
      "rejections": ["Tobias Tr.", "Jonas H."]
    },
    {
      "name": "Dennis Kr.",
      "preferences": ["Sven R.", "Bünjamin E.","Jürgis P.", "Justin Sw.", "Steven R."],
      "rejections": ["Max Schn.", "Tobias Tr."]
    },
    {
      "name": "Yannik H.",
      "preferences": ["Sven R.", "Dennis H.", "Max Schn.","Konstantin"],
      "rejections": ["Justin Sw."]
    },
    {
      "name": "Bünjamin E.",
      "preferences": ["Dennis Kr.", "Jürgis P.", "Steven R."],
      "rejections": ["Kevin Schw.", "B. Gültekin"]
    },
    {
      "name": "Dennis H.",
      "preferences": ["Berat K.", "Steven R."],
      "rejections": ["Kevin Schw.", "B. Gültekin"]
    },
    {
      "name": "Max Schn.",
      "preferences": ["Sven R.", "Yannik H.", "René S." ],
      "rejections": ["Berat K.", "Tobias Tr."]
    },
    {
      "name": "Jürgis P.",
      "preferences": ["Sven R.", "Bünjamin E."],
      "rejections": ["Kevin Schw.", "Jonas H."]
    },
    {
      "name": "Berat K.",
      "preferences": ["Sven R.", "Dennis H.", "Justin Sw.", "Steven R."],
      "rejections": ["Jürgis P.", "René S."]
    },
    {
      "name": "Tobias Tr.",
      "preferences": ["Sven R.", "René S."],
      "rejections": ["Berat K.", "Konstantin"]
    },
    {
      "name": "Justin Sw.",
      "preferences": ["Bünjamin E.", "Jürgis P.", "Steven R."],
      "rejections": ["Kevin Schw.", "Tobias Tr."]
    },
    {
      "name": "René S.",
      "preferences": ["Bünjamin E.", "Dennis H.", "Tobias Tr."],
      "rejections": ["Berat K."]
    },
    {
      "name": "Steven R.",
      "preferences": ["Bünjamin E.", "Dennis H.", "René S."],
      "rejections": ["Kevin Schw.", "Konstantin"]
    },
    {
      "name": "Konstantin",
      "preferences": ["Sven R.", "Yannik H.", "Max Schn."],
      "rejections": ["Dennis Kr.", "Justin Sw."]
    },
    {
      "name": "Jonas H.",
      "preferences": ["Bünjamin E.", "Berat K.", "Justin Sw."],
      "rejections": ["Max Schn.", "Jürgis P."]
    }
    ],
  "notInOneGroup": [
    [
      "Max Schn.",
      "Tobias Tr.",
      "B. Gültekin"
      ]
    ],
  "inOneGroup": [
    [
      "Dennis Kr.",
      "Bünjamin E."
      ]
    ]
}`;

  ngOnInit(): void {
    /*fromJson(this.problem, this.json);*/
    this.update();
  }


  public update() {
    if (this.component != null) { this.component.instance.submit(); }
    this.content.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(this.components[this.counter]);
    this.component = this.content.createComponent(factory);
  }


  public hasPrevious() {
    return this.counter > 0;
  }

  public hasNext() {
    return this.counter < this.components.length - 1 && this.component.instance.isValid();
  }


  public onPrevious() {
    this.counter--;
    this.update();
  }

  public onNext() {
    this.counter += 1;
    this.update();
  }


  public onDialog() {
    this.txtInput = toJson(this.problem);
  }


  public onDialogSave() {
    this.problem.members = [];
    this.problem.groupLimits = [];
    this.problem.inOneGroup.clear();
    this.problem.notInOneGroup.clear();
    fromJson(this.problem, this.txtInput);
  }


}







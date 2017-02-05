import {Component, Input} from "@angular/core";
import {Problem} from "./model/problem";
import {AbstractComponent} from "./abstract.component";
import {Member} from "./model/member";


@Component({
  selector: 'constraints-groups',
  templateUrl: './constraints.groups.component.html'
})
export class ConstraintsGroupComponent extends AbstractComponent {

  constructor(public problem: Problem) {
    super();
  }

  @Input() inOneGroup: boolean;

  public getGroups(): Set<Set<Member>> {
    if (this.inOneGroup) return this.problem.inOneGroup;
    else return this.problem.notInOneGroup;
  }

  public hover(): string {
    if (this.inOneGroup) return 'success';
    else return 'danger';
  }

  public onDelete(group: Set<Member>) {
    this.getGroups().delete(group);
  }


}

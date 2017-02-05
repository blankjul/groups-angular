import {Component, Input, OnInit, AfterViewInit, AfterViewChecked, OnChanges} from "@angular/core";
import {AbstractComponent} from "./abstract.component";
import {Problem} from "./model/problem";

@Component({
  selector: 'group-limits',
  templateUrl: './group.limits.component.html'
})
export class GroupLimitComponent extends AbstractComponent implements OnInit {


  constructor (public problem:Problem){ super();}

  public txtAdd: string = '';

  public inGroup: number = 0;


  ngOnInit(): void {
    this.inGroup = 0;
    this.problem.groupLimits.forEach(limit => this.inGroup += limit);
  }


  public onAdd() {
    let i: number = Number(this.txtAdd);

    if (i > 0 && this.inGroup + i <= this.problem.members.length) {
      this.problem.groupLimits.push(i);
      this.inGroup += i;
    }

    this.txtAdd = '';
  }


  public onDelete(i: number) {
    this.inGroup -= this.problem.groupLimits[i];
    this.problem.groupLimits.splice(i, 1);
    this.txtAdd = '';
  }

  public isValid() : boolean {
    return this.inGroup == this.problem.members.length;
  }


}


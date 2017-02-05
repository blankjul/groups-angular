import {Component} from "@angular/core";
import {Problem} from "./model/problem";
import {Member} from "./model/member";
import {AbstractComponent} from "./abstract.component";

@Component({
  selector: 'constraints',
  templateUrl: './constraints.component.html',
})
export class ConstraintsComponent extends AbstractComponent{


  constructor (public problem:Problem){ super();}


  public inGroup:boolean = true;

  public groupToAdd:Set<Member> = new Set<Member>();


  public onClick(member:Member) {
    if (this.groupToAdd.has(member)) this.groupToAdd.delete(member);
    else this.groupToAdd.add(member);
  }


  public onSwitch() {
    this.inGroup = !this.inGroup;
  }

  public onAdd() {
    if (this.groupToAdd.size < 2) return;
    this.groups().add(this.groupToAdd);
    this.groupToAdd = new Set<Member>();

  }

  public groups() {
    if (this.inGroup) return this.problem.inOneGroup;
    else return this.problem.notInOneGroup;
  }

  hoverClass() {
    if (this.inGroup) return "success";
    else  return "danger";
  }

  isSelectedClass(member:Member) {
    if (this.groupToAdd.has(member)) return this.hoverClass();
  }


}

import {Component} from "@angular/core";
import {Member} from "./model/member";
import {Problem} from "./model/problem";
import {AbstractComponent} from "./abstract.component";
import {ToastsManager} from "ng2-toastr";


@Component({
  selector: 'students',
  templateUrl: './student.component.html'
})
export class StudentComponent extends AbstractComponent {

  public txtAdd: string = '';
  public membersToShow: Set<Member> = new Set<Member>();



  constructor(public problem:Problem, public toastr: ToastsManager) {
    super();
  }


  onAdd() {
    if (this.txtAdd == '') return;
    let m:Member = new Member(this.txtAdd);
    let isAdded:boolean = this.problem.addMember(m);

    if (isAdded)  this.txtAdd = '';
    else  this.toastr.warning("Member's name must be unique.");
  }


  onCollapseClick(member: Member, other: Member) {

    if (member.prefers(other)) {
      member.preferences.delete(other);
      member.rejections.add(other);
    } else if (member.rejects(other)) {
      member.rejections.delete(other);
    } else {
      member.preferences.add(other);
    }

  }

  membersExcept(member: Member) {
    let set: Set<Member> = new Set<Member>(this.problem.members);
    set.delete(member);
    return set;
  }

  public onDelete(m:Member) {
    this.problem.removeMember(m);
    this.membersToShow.delete(m);
  }


  public toogle(m:Member) {
    if (this.membersToShow.has(m)) this.membersToShow.delete(m);
    else this.membersToShow.add(m);
  }



}

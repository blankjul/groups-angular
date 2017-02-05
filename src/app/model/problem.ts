import {Member} from "./member";
import {Injectable} from "@angular/core";
import {Solution} from "./solution";


@Injectable()
export class Problem {


  public members: Array<Member> = new Array<Member>();

  public groupLimits: Array<number> = new Array<number>();

  public inOneGroup: Set<Set<Member>> = new Set<Set<Member>>();

  public notInOneGroup: Set<Set<Member>> = new Set<Set<Member>>();



  public addMember(toAdd:Member) : boolean {
    for(let m of this.members) {
      if (m.name == toAdd.name) return false;
    }
    this.members.push(toAdd);
    return true;
  }


  public removeMember(toRemove:Member) {
    // remove member
    var index = this.members.indexOf(toRemove, 0);
    if (index > -1) {
      this.members.splice(index, 1);
    }

    // remove all preferences
    this.members.forEach( m => {
      m.preferences.delete(toRemove);
      m.rejections.delete(toRemove);
    });


    // remove all group constraints

    let nextInOneGroup:Set<Set<Member>> = new Set<Set<Member>>();
    this.inOneGroup.forEach(group => {
      group.delete(toRemove);
      if (group.size >0) nextInOneGroup.add(group);
    });
    this.inOneGroup = nextInOneGroup;


    let nextNotInOneGroup:Set<Set<Member>> = new Set<Set<Member>>();
    this.notInOneGroup.forEach(group => {
      group.delete(toRemove);
      if (group.size >0) nextNotInOneGroup.add(group);
    });
    this.notInOneGroup = nextNotInOneGroup;


  }




}

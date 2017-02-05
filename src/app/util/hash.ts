import {Problem} from "../model/problem";
import {Member} from "../model/member";
import {Md5} from "ts-md5/dist/md5";
export class VariableHash {

  public m: Map<Member,number> = new Map<Member,number>();


  constructor(public problem: Problem) {

    for (let i: number = 0; i < problem.members.length; i++) {
      this.m.set(problem.members[i], i);
    }

  }


  public calc2(variable: Array<Set<Member>>): string {
    let vector: number[] = [];

    let n: number = this.problem.members.length;

    for (let i: number = 0; i < n; i++) vector.push(0);

    // add all relations of group A
    for (let i: number = 0; i < variable.length; i++) {

      let group: Set<Member> = variable[i];

      group.forEach((member: Member) => {
        vector[this.m.get(member)] = i;
      });

    }

    return JSON.stringify(vector);
  }


  public calc(variable: Array<Set<Member>>): string {

    let groupAsArray: Array<Array<number>> = [];
    variable.forEach(group => {

      let array: Array<number> = [];
      group.forEach(member => {
        array.push(this.m.get(member));
      });
      array.sort((n1,n2) => n1 - n2);
      groupAsArray.push(array);

    });

    groupAsArray.sort((n1,n2) => n1[0] - n2[0]);

    return JSON.stringify(groupAsArray);
  }


}

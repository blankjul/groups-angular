import {Problem} from "./problem";
import {Member} from "./member";
import {Solution} from "./solution";
import {intersection} from "../algorithms/util";
export class Evaluator {


  public n:number = 0;

  public evaluate(problem:Problem, groups: Array<Set<Member>>) :Solution {

    this.n++;

    let s:Solution = new Solution(groups);

    // soft constraints
    groups.forEach(group => {
      group.forEach(member => {

        let prefs: number = 1;
        if (member.preferences.size > 0) prefs = intersection(member.preferences, group).size / member.preferences.size;

        let rejs: number = 1;
        if (member.rejections.size > 0)  rejs = 1 - (intersection(member.rejections, group).size / member.rejections.size);
        s.satisfaction += prefs + rejs;

        s.mPreference.set(member, prefs);
        s.mRejection.set(member, rejs);

      });
    });


    s.satisfaction /= 2* problem.members.length;


    // hard constraints
    problem.inOneGroup.forEach(inOneGroup => {
      let violation: number = 1;
      groups.forEach(group => {
        let n: number = intersection(inOneGroup, group).size;
        if (n == inOneGroup.size) violation = 0;
      });
      s.constraints += violation;
    });

    problem.notInOneGroup.forEach(notInOneGroup => {
      let violation: number = 0;
      groups.forEach(group => {
        let n: number = intersection(notInOneGroup, group).size;
        if (n == notInOneGroup.size) violation = 1;
      });
      s.constraints += violation;
    });

    return s;
  }






}

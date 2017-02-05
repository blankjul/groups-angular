import {Member} from "./member";
export class Solution {

  public groups: Array<Set<Member>>;

  public satisfaction: number = 0;

  public constraints: number = 0;

  public mPreference: Map<Member,number> = new Map<Member,number>();

  public mRejection: Map<Member,number> = new Map<Member,number>();


  constructor(public g: Array<Set<Member>>) {
    this.groups = g;
  }

  public isDominating(other: Solution): boolean {
    if (this.constraints < other.constraints) return true;
    else if (this.constraints > other.constraints) return false;
    else {
      return this.satisfaction > other.satisfaction;
    }


  }

  public minPref() {
     return Math.min.apply(null, Array.from(this.mPreference.values()));
  }

  public minRejs() {
    return Math.min.apply(null, Array.from(this.mRejection.values()));
  }



}

import {Member} from "../model/member";
import {Problem} from "../model/problem";


function toStringList(arg: Iterable<Member>): Array<string> {
  let list: Array<string> = new Array<string>();
  for (let entry of arg) {
    list.push(entry.name);
  }
  return list;
}

function toStringSet(arg: Iterable<Member>): Set<string> {
  let set: Set<string> = new Set<string>();
  for (let entry of arg) {
    set.add(entry.name);
  }
  return set;
}


export function toJson(problem: Problem): string {

  var obj = {};

  obj['groupLimits'] = problem.groupLimits;

  let jsonMembers: any = [];

  problem.members.forEach((member: Member) => {
    var jsonMember = {name: member.name};
    jsonMember['preferences'] = toStringList(member.preferences);
    jsonMember['rejections'] = toStringList(member.rejections);
    jsonMembers.push(jsonMember);
  });
  obj['members'] = jsonMembers;


  let jsonGroups: Array<Array<String>> = [];
  problem.inOneGroup.forEach((group: Set<Member>) => {
    jsonGroups.push(toStringList(group));
  });
  obj['inOneGroup'] = jsonGroups;


  let jsonNotInGroups: Array<Array<String>> = [];
  problem.notInOneGroup.forEach((group: Set<Member>) => {
    jsonNotInGroups.push(toStringList(group));
  });
  obj['notInOneGroup'] = jsonNotInGroups;

  return JSON.stringify(obj, null, 2);
}




function stringListToMemberSet<T>(l:Iterable<string>, map:Map<string,Member>) : Set<Member> {
  let members: Set<Member> = new Set<Member>();
  for (let entry of l) {
    members.add(map.get(entry));
  }
  return members;
}



export function fromJson(problem:Problem, s:string) : Problem {

  let obj = JSON.parse(s);
  let map: Map<string,Member> = new Map<string,Member>();

  obj.members.forEach((e:any) => {
    let m: Member = new Member(e.name);
    map.set(e.name, m);
    problem.addMember(m);
  });

  obj.members.forEach((e:any) => {

    e.preferences.forEach((pref:any) => {
      map.get(e.name).preferences.add(map.get(pref));
    });

    e.rejections.forEach((rej:any) => {
      map.get(e.name).rejections.add(map.get(rej));
    });

  });

  obj.inOneGroup.forEach((group:any) => {problem.inOneGroup.add(stringListToMemberSet(group,map));});
  obj.notInOneGroup.forEach((group:any) => {problem.notInOneGroup.add(stringListToMemberSet(group,map));});
  if (obj.groupLimits.length > 0) problem.groupLimits = obj.groupLimits;

  return problem;

}

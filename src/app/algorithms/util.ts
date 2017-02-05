import {Problem} from "../model/problem";
import {Member} from "../model/member";
import {group} from "@angular/core";


export function crossover(a: Array<Set<Member>>, b: Array<Set<Member>>): Array<Set<Member>> {

  let m: Map<Member,Set<Member>> = new Map<Member,Set<Member>>();


  // add all relations of group A
  a.forEach((group: Set<Member>) => {
    group.forEach((member: Member) => {
      let setWithoutMe: Set<Member> = new Set<Member>(group);
      setWithoutMe.delete(member);
      m.set(member, setWithoutMe);
    });
  });

  // extend it with relations of group B
  b.forEach((group: Set<Member>) => {
    group.forEach((member: Member) => {
      let setWithoutMe: Set<Member> = new Set<Member>(group);
      setWithoutMe.delete(member);

      let setToAdd: Set<Member> = m.get(member);
      setWithoutMe.forEach(other => {
        setToAdd.add(other);
      });
    });
  });

  // start with random entry
  let off: Array<Set<Member>> = [];

  // start with random member
  let rndGroup: Member[] = Array.from(a[getRandom(0, a.length - 1)]);
  let current: Member = rndGroup[getRandom(0, rndGroup.length - 1)];

  // save all Members added so far
  let notAdded: Set<Member> = new Set<Member>();
  a.forEach((group: Set<Member>) => {
    group.forEach((member: Member) => {
      notAdded.add(member);
    });
  });


  // for each group
  for (let i: number = 0; i < a.length; i++) {

    let groupToAdd: Set<Member> = new Set<Member>();

    // until group limit is reached
    for (let j: number = 0; j < a[i].size; j++) {

      // add member to set
      groupToAdd.add(current);
      notAdded.delete(current);

      // take one other member in group with relation to current
      let possibleNextMember: Set<Member> = m.get(current);


      // define the next member
      let next: Member;
      if (possibleNextMember.size == 0) {
        next = Array.from(notAdded)[getRandom(0, notAdded.size - 1)];
      } else {
        next = Array.from(possibleNextMember)[getRandom(0, possibleNextMember.size - 1)];
      }

      // remove the current member from the map
      m.delete(current);
      for (let group of m.values()) {
        group.delete(current);
      }
      current = next;


    }

    off.push(groupToAdd);

  }

  return off;
}


export function mutate(groups: Array<Set<Member>>) {
  if (groups.length < 2) return;
  let random: number[] = shuffle(indexArray(groups.length));

  let a: Set<Member> = groups[random[0]];
  let b: Set<Member> = groups[random[1]];

  let memberOfA = randomOfArray(Array.from(a));
  let memberOfB = randomOfArray(Array.from(b));

  a.delete(memberOfA);
  a.add(memberOfB);

  b.delete(memberOfB);
  b.add(memberOfA);

}


export function copy(groups: Array<Set<Member>>): Array<Set<Member>> {
  let copy: Array<Set<Member>> = new Array<Set<Member>>();
  groups.forEach((group: Set<Member>) => {
    copy.push(new Set<Member>(group));
  });
  return copy;
}


export function randomGroup(problem: Problem): Array<Set<Member>> {

  let indices: Array<Number> = [];
  for (let idx in problem.groupLimits) {
    for (let j = 0; j < problem.groupLimits[idx]; j++) {
      indices.push(new Number(idx));
    }
  }
  shuffle(indices);

  return arrayToGroups(problem, indices);

}


export function arrayToGroups(problem: Problem, indices: Array<Number>): Array<Set<Member>> {

  // create empty groups
  let groups: Array<Set<Member>> = [];
  problem.groupLimits.forEach(limit => groups.push(new Set<Member>()));

  // assign to groups according to indices
  indices.forEach((groupToAdd: number, idx: number) => {
    groups[groupToAdd].add(problem.members[idx]);
  });

  return groups;

}

export function randomOfArray<T>(array: Array<T>): T {
  return array[getRandom(0, array.length - 1)];
}

export function getRandom(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function indexArray(n: number): number[] {
  let list: number[] = [];
  for (var _i = 0; _i < n; _i++) {
    list.push(_i);
  }
  return list;
}


export function shuffle<T>(array: T[]): T[] {
  // if it's 1 or 0 items, just return
  if (array.length <= 1) return array;

  // For each index in array
  for (let i = 0; i < array.length; i++) {

    // choose a random not-yet-placed item to place there
    // must be an item AFTER the current item, because the stuff
    // before has all already been placed
    const randomChoiceIndex = getRandom(i, array.length - 1);

    // place our random choice in the spot by swapping
    [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[i]];
  }

  return array;
}

export function intersection(a: Set<Member>, b: Set<Member>): Set<Member> {
  return new Set<Member>([...a].filter(x => b.has(x)));
}

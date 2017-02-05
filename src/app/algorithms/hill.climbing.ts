import {Problem} from "../model/problem";
import {Member} from "../model/member";
import {randomGroup, getRandom, copy, mutate} from "./util";
import {Evaluator} from "../model/evaluator";
import {Solution} from "../model/solution";
import {Algorithm} from "./algorithm";

export class HillClimbingAlgorithm extends Algorithm{


  public solve(problem: Problem) : Solution[] {

    let evaluator:Evaluator = new Evaluator();
    let result:Solution[] = [evaluator.evaluate(problem, randomGroup(problem))];

    while (evaluator.n < this.max) {

      let nextGroups: Array<Set<Member>> = copy(result[result.length-1].groups);
      mutate(nextGroups);
      let nextSolution:Solution = evaluator.evaluate(problem, nextGroups);

      if (nextSolution.isDominating(result[result.length-1])) {
        result.push(nextSolution)
      }
    }

    result.reverse();
    return result;


  }


}



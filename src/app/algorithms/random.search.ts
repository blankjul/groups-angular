import {Problem} from "../model/problem";
import {Algorithm} from "./algorithm";
import {randomGroup} from "./util";
import {Solution} from "../model/solution";
import {Evaluator} from "../model/evaluator";

export class RandomSearch extends Algorithm {


  public solve(problem: Problem): Solution[] {

    let evaluator: Evaluator = new Evaluator();
    let s: Solution = evaluator.evaluate(problem, randomGroup(problem));

    while (evaluator.n < this.max) {
      let next: Solution = evaluator.evaluate(problem, randomGroup(problem));
      if (next.isDominating(s)) s = next;
    }

    return [s];


  }


}



import {Problem} from "../model/problem";
import {Solution} from "../model/solution";
import {Evaluator} from "../model/evaluator";
export abstract class Algorithm {

  public max: number = 10;

  abstract solve(problem:Problem) : Solution[];

}

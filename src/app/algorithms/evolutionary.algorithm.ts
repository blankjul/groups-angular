import {Problem} from "../model/problem";
import {Member} from "../model/member";
import {randomGroup, getRandom, copy, mutate, indexArray, shuffle, crossover} from "./util";
import {Evaluator} from "../model/evaluator";
import {Solution} from "../model/solution";
import {Algorithm} from "./algorithm";
import {VariableHash} from "../util/hash";

export class EvolutionaryAlgorithm extends Algorithm {

  // population populationSize
  public populationSize: number = 30;

  // probability to do a mutation
  public probMutation: number = 0.3;


  public solve(problem: Problem): Solution[] {

    let evaluator: Evaluator = new Evaluator();
    let hash: VariableHash = new VariableHash(problem);

    // generate starting population
    let population: Array<Solution> = [];
    for (let i: number = 0; i < this.populationSize; i++) {
      population.push(evaluator.evaluate(problem, randomGroup(problem)));
    }


    // instantiate generations until no evaluations are left
    while (evaluator.n < this.max) {

      let offsprings: Array<Solution> = [];

      while (offsprings.length < this.populationSize) {

        let a: Solution = population[getRandom(0, population.length - 1)];
        let b: Solution = population[getRandom(0, population.length - 1)];

        let off: Array<Set<Member>> = crossover(a.groups, b.groups);
        if (Math.random() < this.probMutation) mutate(off);

        // add it to the population
        offsprings.push(evaluator.evaluate(problem, off));

      }

      let next: Array<Solution> = [];

      let h: Set<string> = new Set<string>();

      population.forEach(entry => {
        let fingerprint: string = hash.calc(entry.groups);
        if (!h.has(fingerprint)) {
          next.push(entry);
          h.add(fingerprint);
        }
      });

      offsprings.forEach(entry => {
        let fingerprint: string = hash.calc(entry.groups);
        if (!h.has(fingerprint)) {
          next.push(entry);
          h.add(fingerprint);
        }
      });


      next.sort((a: Solution, b: Solution): number => {
        if (a.isDominating(b)) return -1;
        else if (b.isDominating(a)) return 1;
        else return 0;
      });

      if (next.length > this.populationSize) {
        next = next.slice(0, this.populationSize);
      }

      population = next;


    }


    population.forEach( ind => {
      //console.log(hash.calc(ind.groups));
    });

    return population;


  }


}



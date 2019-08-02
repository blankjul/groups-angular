import {Injectable} from '@angular/core';
import {Problem} from './model/problem';
import {Solution} from './model/solution';
import {Algorithm} from './algorithms/algorithm';
import {RandomSearch} from './algorithms/random.search';
import {HillClimbingAlgorithm} from './algorithms/hill.climbing';
import {EvolutionaryAlgorithm} from './algorithms/evolutionary.algorithm';


@Injectable()
export class ResultService {


  public algorithms: Algorithm[] = [new RandomSearch(), new HillClimbingAlgorithm(), new EvolutionaryAlgorithm()];

  public algorithm: Algorithm;


  public calc(problem: Problem): Promise<Array<Solution>> {
    const selectedAlgorithm = (this.algorithm != null) ? this.algorithm : new EvolutionaryAlgorithm();
    const p: Promise<Array<Solution>> = new Promise(
      (resolve, reject) => {
        setTimeout(function() {
          console.log('START ALGORITHM');
          console.log(selectedAlgorithm.constructor.name);
          console.log(selectedAlgorithm.max);
          const results = selectedAlgorithm.solve(problem);
          console.log('Found ' + results.length + ' solutions.');
          console.log('END ALGORITHM');
          console.log('---------------------------');
          resolve(results);
        }, 0);
      }
    );
    return p;
  }


  public getAlgorithms(): Algorithm[] {
    return this.algorithms;
  }


}

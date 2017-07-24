import {Problem} from "./model/problem";
import {AbstractComponent} from "./abstract.component";
import {ResultService} from "./result.service";
import {Component, OnInit} from "@angular/core";
import {Algorithm} from "./algorithms/algorithm";


@Component({
  selector: 'algorithm',
  templateUrl: './algorithm.component.html'
})
export class AlgorithmComponent extends AbstractComponent implements OnInit{


  algorithm:Algorithm;
  maxEvaluations: number = 10000;


  constructor(public problem: Problem, public service: ResultService) {
    super();

  }

  ngOnInit(): void {
    this.algorithm = this.service.algorithm;
    if (this.algorithm != null) this.maxEvaluations = this.service.algorithm.max
  }


  public select(algorithm) {
    this.algorithm = algorithm;
  }


  public isValid(): boolean {
    return this.algorithm != null && this.maxEvaluations > 0;
  }


  public submit() {
    this.service.algorithm = this.algorithm;
    this.service.algorithm.max = this.maxEvaluations;
  }


}

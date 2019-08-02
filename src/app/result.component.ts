import {Component, OnInit} from '@angular/core';
import {Problem} from './model/problem';
import {Solution} from './model/solution';
import {AbstractComponent} from './abstract.component';
import {ResultService} from './result.service';



@Component({
  selector: 'result',
  templateUrl: './result.component.html'
})
export class ResultComponent extends AbstractComponent implements OnInit {


  public isLoading = true;
  public results: Array<Solution>;
  public resultsToShow: Set<Solution> = new Set<Solution>();


  constructor(public problem: Problem, public service: ResultService) {
    super();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.service.calc(this.problem).then((results: Solution[]) => {
      this.results = results;
      this.isLoading = false;
    });
  }


  public toogle(s: Solution) {
    if (this.resultsToShow.has(s)) { this.resultsToShow.delete(s); } else { this.resultsToShow.add(s); }
  }


}

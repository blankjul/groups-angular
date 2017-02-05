System.register(["./util", "../model/evaluator"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var util_1, evaluator_1;
    var RandomSearch;
    return {
        setters:[
            function (util_1_1) {
                util_1 = util_1_1;
            },
            function (evaluator_1_1) {
                evaluator_1 = evaluator_1_1;
            }],
        execute: function() {
            RandomSearch = class RandomSearch {
                solve(problem) {
                    let s = new evaluator_1.Evaluator().evaluate(problem, util_1.randomGroup(problem));
                    let n = 0;
                    while (n < 10000) {
                        let next = new evaluator_1.Evaluator().evaluate(problem, util_1.randomGroup(problem));
                        if (next.isDominating(s))
                            s = next;
                        n++;
                    }
                    return [s];
                }
            };
            exports_1("RandomSearch", RandomSearch);
        }
    }
});
//# sourceMappingURL=random.search.js.map
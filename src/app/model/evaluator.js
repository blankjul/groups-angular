System.register(["./solution"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var solution_1;
    var Evaluator;
    return {
        setters:[
            function (solution_1_1) {
                solution_1 = solution_1_1;
            }],
        execute: function() {
            Evaluator = class Evaluator {
                evaluate(problem, groups) {
                    let s = new solution_1.Solution(groups);
                    // soft constraints
                    groups.forEach(group => {
                        group.forEach(member => {
                            let prefs = 1;
                            if (member.preferences.size > 0)
                                this.intersection(member.preferences, group).populationSize / member.preferences.size;
                            let rejs = 1;
                            if (member.rejections.size > 0)
                                rejs = 1 - (this.intersection(member.rejections, group).populationSize / member.rejections.size);
                            s.satisfaction += prefs + rejs;
                            s.mPreference.set(member, prefs);
                            s.mRejection.set(member, rejs);
                        });
                    });
                    s.satisfaction /= 2 * problem.members.length;
                    // hard constraints
                    problem.inOneGroup.forEach(inOneGroup => {
                        let violation = 1;
                        groups.forEach(group => {
                            let n = this.intersection(inOneGroup, group).populationSize;
                            if (n == inOneGroup.populationSize)
                                violation = 0;
                        });
                        s.constraints += violation;
                    });
                    problem.notInOneGroup.forEach(notInOneGroup => {
                        let violation = 0;
                        groups.forEach(group => {
                            let n = this.intersection(notInOneGroup, group).populationSize;
                            if (n == notInOneGroup.populationSize)
                                violation = 1;
                        });
                        s.constraints += violation;
                    });
                    return s;
                }
                intersection(a, b) {
                    return new Set([...a].filter(x => b.has(x)));
                }
            };
            exports_1("Evaluator", Evaluator);
        }
    }
});
//# sourceMappingURL=evaluator.js.map

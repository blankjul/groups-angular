System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var HillClimbingAlgorithm;
    function convert(array, limits) {
        let result = new Set();
        let idx = 0;
        limits.forEach(limit => {
            let group = new Set();
            for (let i = 0; i < limit; i++) {
                group.add(array[idx + limit]);
            }
            idx += limit;
            result.add(group);
        });
        return result;
    }
    return {
        setters:[],
        execute: function() {
            HillClimbingAlgorithm = class HillClimbingAlgorithm {
                solve(problem) {
                    // random array
                }
            };
            exports_1("HillClimbingAlgorithm", HillClimbingAlgorithm);
        }
    }
});
//# sourceMappingURL=hill.climbing.js.map
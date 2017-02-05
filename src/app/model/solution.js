System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Solution;
    return {
        setters:[],
        execute: function() {
            Solution = class Solution {
                constructor(g) {
                    this.g = g;
                    this.satisfaction = 0;
                    this.constraints = 0;
                    this.mPreference = new Map();
                    this.mRejection = new Map();
                    this.groups = g;
                }
                isDominating(other) {
                    if (this.constraints < other.constraints)
                        return true;
                    else if (this.constraints > other.constraints)
                        return false;
                    else {
                        return this.satisfaction > other.satisfaction;
                    }
                }
            };
            exports_1("Solution", Solution);
        }
    }
});
//# sourceMappingURL=solution.js.map
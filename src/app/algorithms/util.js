System.register(["../model/problem"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var problem_1;
    var p;
    function randomGroup(problem) {
        let indices = [];
        for (let idx in problem.groupLimits) {
            for (let j = 0; j < problem.groupLimits[idx]; j++) {
                indices.push(new Number(idx));
            }
        }
        shuffle(indices);
        // create empty groups
        let groups = [];
        problem.groupLimits.forEach(limit => groups.push(new Set()));
        // assign to groups according to indices
        indices.forEach((groupToAdd, idx) => {
            groups[groupToAdd].add(problem.members[idx]);
        });
        return groups;
    }
    exports_1("randomGroup", randomGroup);
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function shuffle(array) {
        // if it's 1 or 0 items, just return
        if (array.length <= 1)
            return array;
        // For each index in array
        for (let i = 0; i < array.length; i++) {
            // choose a random not-yet-placed item to place there
            // must be an item AFTER the current item, because the stuff
            // before has all already been placed
            const randomChoiceIndex = getRandom(i, array.length - 1);
            // place our random choice in the spot by swapping
            [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex], array[i]];
        }
        return array;
    }
    return {
        setters:[
            function (problem_1_1) {
                problem_1 = problem_1_1;
            }],
        execute: function() {
            p = new problem_1.Problem();
            p.groupLimits = [2, 2, 3];
            randomGroup(p);
        }
    }
});
//# sourceMappingURL=util.js.map
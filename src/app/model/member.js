System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Member;
    return {
        setters:[],
        execute: function() {
            Member = class Member {
                constructor(name) {
                    this.preferences = new Set();
                    this.rejections = new Set();
                    this.name = name;
                }
                toString() {
                    return this.name;
                }
                prefers(member) {
                    return this.preferences.has(member);
                }
                rejects(member) {
                    return this.rejections.has(member);
                }
            };
            exports_1("Member", Member);
        }
    }
});
//# sourceMappingURL=member.js.map
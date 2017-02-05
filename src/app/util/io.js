System.register(["../model/member"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var member_1;
    function toStringList(arg) {
        let list = new Array();
        for (let entry of arg) {
            list.push(entry.name);
        }
        return list;
    }
    function toStringSet(arg) {
        let set = new Set();
        for (let entry of arg) {
            set.add(entry.name);
        }
        return set;
    }
    function toJson(problem) {
        var obj = {};
        obj['groupLimits'] = problem.groupLimits;
        let jsonMembers = [];
        problem.members.forEach((member) => {
            var jsonMember = { name: member.name };
            jsonMember['preferences'] = toStringList(member.preferences);
            jsonMember['rejections'] = toStringList(member.rejections);
            jsonMembers.push(jsonMember);
        });
        obj['members'] = jsonMembers;
        let jsonGroups = [];
        problem.inOneGroup.forEach((group) => {
            jsonGroups.push(toStringList(group));
        });
        obj['inOneGroup'] = jsonGroups;
        let jsonNotInGroups = [];
        problem.notInOneGroup.forEach((group) => {
            jsonNotInGroups.push(toStringList(group));
        });
        obj['notInOneGroup'] = jsonNotInGroups;
        return JSON.stringify(obj, null, 2);
    }
    exports_1("toJson", toJson);
    function stringListToMemberSet(l, map) {
        let members = new Set();
        for (let entry of l) {
            members.add(map.get(entry));
        }
        return members;
    }
    function fromJson(problem, s) {
        let obj = JSON.parse(s);
        let map = new Map();
        obj.members.forEach((e) => {
            let m = new member_1.Member(e.name);
            map.set(e.name, m);
            problem.addMember(m);
        });
        obj.members.forEach((e) => {
            e.preferences.forEach((pref) => {
                map.get(e.name).preferences.add(map.get(pref));
            });
            e.rejections.forEach((rej) => {
                map.get(e.name).rejections.add(map.get(rej));
            });
        });
        obj.inOneGroup.forEach((group) => { problem.inOneGroup.add(stringListToMemberSet(group, map)); });
        obj.notInOneGroup.forEach((group) => { problem.notInOneGroup.add(stringListToMemberSet(group, map)); });
        if (obj.groupLimits.length > 0)
            problem.groupLimits = obj.groupLimits;
        return problem;
    }
    exports_1("fromJson", fromJson);
    return {
        setters:[
            function (member_1_1) {
                member_1 = member_1_1;
            }],
        execute: function() {
        }
    }
});
//# sourceMappingURL=io.js.map
const RelationInfoModel = require("../models/RelationInfoModel");
var Utility = require("../../core/lib/Utility");

class RelationInfoFinder {
    static async getRelationInfo(classObject) {
        let record = await RelationInfoModel.getRelationInfo(classObject);
        return record;
    }
}

module.exports = RelationInfoFinder;
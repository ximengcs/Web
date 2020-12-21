var DBConnection = require("../../core/lib/DBConnection");
var Utility = require("../../core/lib/Utility");
var Squel = require("squel");

class RelationInfoModel {

    static async getRelationInfo(classObject, fields) {
        let queryBuilder = Squel.select().from("relation").fields(fields)
            .where("namespace = ? and class_name = ?", classObject.NameSpace, classObject.ClassName);
        return Utility.getFirstRecord(await DBConnection.query(queryBuilder.toString()));
    }
}

module.exports = RelationInfoModel;
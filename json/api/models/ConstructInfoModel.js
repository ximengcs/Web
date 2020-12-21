var DBConnection = require("../../core/lib/DBConnection");
var Utility = require("../../core/lib/Utility");
var Squel = require("squel");

class ConstructInfoModel {

    static async getConstructInfo(classObject, fields) {
        let queryBuilder = Squel.select().from("construct").fields(fields)
            .where("namespace = ? and class_name = ?",
                classObject.NameSpace, classObject.ClassName)
            .order('namespace', true).order('class_name', true).order('param_amount', true);
        return await DBConnection.query(queryBuilder.toString());
    }

    static async getConstructDetail(classObject, param_amount, fields) {
        let queryBuilder = Squel.select().from("construct").fields(fields)
            .where("namespace = ? and class_name = ? and param_amount = ?",
                classObject.NameSpace, classObject.ClassName, param_amount)
            .order('namespace', true).order('class_name', true).order('param_amount', true);;
        return await DBConnection.query(queryBuilder.toString());
    }

}

module.exports = ConstructInfoModel;
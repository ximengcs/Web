var DBConnection = require("../../core/lib/DBConnection");
var Utility = require("../../core/lib/Utility");
var Squel = require("squel");

class MethodInfoModel {

    static async getMethodInfo(classObject, fields) {
        let queryBuilder = Squel.select().from("method").fields(fields)
            .where("namespace = ? and class_name = ?", classObject.NameSpace, classObject.ClassName)
            .order('namespace', true).order('class_name', true).order('method_name', true)
            .order('param_amount', true);
        return await DBConnection.query(queryBuilder.toString());
    }

    static async getMethodDetail(classObject, method_name, param_amount, fields) {
        let queryBuilder = Squel.select().from("method").fields(fields)
            .where("namespace = ? and class_name = ? and method_name = ? and param_amount = ?",
                classObject.NameSpace, classObject.ClassName, method_name, param_amount)
            .order('namespace', true).order('class_name', true).order('method_name', true)
            .order('param_amount', true);
        return await DBConnection.query(queryBuilder.toString());
    }
}

module.exports = MethodInfoModel;
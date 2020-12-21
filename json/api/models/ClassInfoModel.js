var DBConnection = require("../../core/lib/DBConnection");
var Utility = require("../../core/lib/Utility");
var Squel = require("squel");

class ClassInfoModel {

    static async getAllClassInfo() {
        let queryBuilder = Squel.select().from("class").fields([''])
        .order('namespace', true).order('class_name', true).order('type', true);
        return await DBConnection.query(queryBuilder.toString());
    }

    static async getClassInfo(classObject, fields) {
        let queryBuilder = Squel.select().from("class").fields(fields)
            .where("namespace = ? and class_name = ? and type = ?",
                classObject.NameSpace, classObject.ClassName, classObject.Type).limit(1);
        return Utility.getFirstRecord(await DBConnection.query(queryBuilder.toString()));
    }
}

module.exports = ClassInfoModel;
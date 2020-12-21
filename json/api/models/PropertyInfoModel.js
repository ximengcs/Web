var DBConnection = require("../../core/lib/DBConnection");
var Utility = require("../../core/lib/Utility");
var Squel = require("squel");

class PropertyInfoModel {

    static async getPropertyInfo(classObject, fields) {
        let queryBuilder = Squel.select().from("property").fields(fields)
            .where("namespace = ? and class_name = ?",
                classObject.NameSpace, classObject.ClassName)
            .order('namespace', true).order('class_name', true)
            .order('property_name', true).order('property_type', true);
        return await DBConnection.query(queryBuilder.toString());
    }

    static async getPropertyDetail(classObject, property_name, property_type, fields) {
        let queryBuilder = Squel.select().from("property").fields(fields)
            .where("namespace = ? and class_name = ? and property_name = ? and property_type = ?",
                classObject.NameSpace, classObject.ClassName, property_name, property_type);
        return Utility.getFirstRecord(await DBConnection.query(queryBuilder.toString()));
    }

}

module.exports = PropertyInfoModel;
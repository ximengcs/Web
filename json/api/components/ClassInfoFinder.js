const ClassInfoModel = require("../models/ClassInfoModel");
var Utility = require("../../core/lib/Utility");

class ClassInfoFinder {

    static async getAllClassInfomation() {
        return await ClassInfoModel.getAllClassInfo();
    }

    static async getClassInfo(classObject) {
        let record = await ClassInfoModel.getClassInfo(classObject);
        record.description = Utility.getDescriptionInfoJSON(record.description);
        record.modifier = Utility.getModifierInfoArray(record.modifier);
        return record;
    }

}

module.exports = ClassInfoFinder;
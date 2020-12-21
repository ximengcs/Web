const PropertyInfoModel = require("../models/PropertyInfoModel");
var Utility = require("../../core/lib/Utility");

class PropertyInfoFinder {

    static async getPropertyInfo(classObject) {
        let record = await PropertyInfoModel.getPropertyInfo(classObject);
        for (let i in record) {
            record[i].i = i;
            record[i].modifier = Utility.getModifierInfoArray(record[i].modifier);
            record[i].description = Utility.getDescriptionInfoJSON(record[i].description);
        }
        return record;
    }

    static async getPropertyDetail(classObject, property_name, property_type) {
        let record = await PropertyInfoModel.getPropertyDetail(classObject, property_name, property_type);
        record.modifier = Utility.getModifierInfoArray(record.modifier);
        record.detail_description = Utility.getDescriptionIncludeCodeInfoArray(record.detail_description);
        return record;
    }
}

module.exports = PropertyInfoFinder;
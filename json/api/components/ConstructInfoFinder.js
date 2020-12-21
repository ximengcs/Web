const ConstructInfoModel = require("../models/ConstructInfoModel");
var Utility = require("../../core/lib/Utility");

class ConstructInfoFinder {

    static async getConstructInfo(classObject) {
        let record = await ConstructInfoModel.getConstructInfo(classObject);
        for(let i in record) {
            record[i].i = i;
            record[i].param = Utility.getParamInfoArray(record[i].param);
            record[i].modifier = Utility.getModifierInfoArray(record[i].modifier);
            record[i].description = Utility.getDescriptionInfoJSON(record[i].description);
        }
        return record;
    }

    static async getConstructDetail(classObject, param_amount, param) {
        let record = await ConstructInfoModel.getConstructDetail(classObject, param_amount);
        let data = {};
        for( let i in record) {
            let perRecord = record[i];
            // compare param
            let paramArray = Utility.getParamInfoArray(perRecord.param);
            let matched = false;
            for (let j in paramArray) {
                if (param[j].trim() != paramArray[j].paramType.trim()) 
                    break;
                if (parseInt(j) + 1 == paramArray.length) {
                    matched = true;
                    break;
                }
            }
            if (param.length == 0 && paramArray.length == 0)
                matched = true;
            if (matched) {
                data.namespace = perRecord.namespace;
                data.class_name = perRecord.class_name;
                data.type = classObject.type;
                data.param_amount = perRecord.param_amount;
                data.param = paramArray;
                data.modifier = Utility.getModifierInfoArray(perRecord.modifier);
                data.detail_description = Utility.getDescriptionIncludeCodeInfoArray(perRecord.detail_description);
                break;
            }
        }
        return data;
    }

}

module.exports = ConstructInfoFinder;
class Utility {

    static createClassObject(namespace, className, type) {
        return {
            NameSpace: namespace,
            ClassName: className,
            Type: type
        }
    }
    
    static getFirstRecord(data) {
        if (data == null || data == undefined)
            return data;
        if (Array.isArray(data)) {
            if (data.length > 0)
                return data[0];
            else
                return {};
        }
        return data;
    }
    
    static getDescriptionInfoJSON(descriptionInfo) {
        let description = { cn: [], en: [] };
        let desLable = "language-chinese";
        let desArray = Utility.matchLable(descriptionInfo, desLable);
        for (let i in desArray) {
            let item = Utility.removeLable(desArray[i], desLable);
            description.cn.push(item);
        }
        desLable = "language-english";
        desArray = Utility.matchLable(descriptionInfo, desLable);
        for (let i in desArray) {
            let item = Utility.removeLable(desArray[i], desLable);
            description.en.push(item);
        }
        return description;
    }

    static getDescriptionIncludeCodeInfoArray(descriptionInfo) {
        let description = [];
        let desLable = ["language-chinese", "language-english", "code"];
        let desArray = Utility.matchAllLable(descriptionInfo, desLable);
        for (let i in desArray) {
            let item = {};
            let lable = Utility.searchLable(desArray[i], desLable);
            item[lable] = Utility.symbolToHTMLLable(Utility.removeAllLable(desArray[i], desLable));
            description.push(item);
        }
        return description;
    }

    static getModifierInfoArray(modifierInfo) {
        let modifier = [];
        let modifierLable = "modifier";
        let modfArray = Utility.matchLable(modifierInfo, modifierLable);
        for (let i in modfArray) {
            let item = Utility.removeLable(modfArray[i], modifierLable);
            modifier.push(item);
        }
        return modifier;
    }

    
    static getParamInfoArray(paramInfo) {
        let param = [];
        let paramLable = "param";
        let paramOutLable = "param-out";
        let paramTypeLable = "param-type";
        let paramNameLable = "param-name";
        let paramDescriptionLable = "param-description";
        let paramDefaultvalueLable = "param-defaultvalue";

        let paramList = Utility.matchLable(paramInfo, paramLable);
        for (let i = 0; paramList && i < paramList.length; i++) {
            let removeLable = Utility.removeLable(paramList[i], paramLable);
            let paramOut = Utility.matchLable(removeLable, paramOutLable);
            if (paramOut != null && paramOut != undefined)
                paramOut = Utility.removeLable(paramOut[0], paramOutLable);
            let paramType = Utility.removeLable(Utility.matchLable(removeLable, paramTypeLable)[0], paramTypeLable);
            let paramName = Utility.removeLable(Utility.matchLable(removeLable, paramNameLable)[0], paramNameLable);
            let paramDescription = Utility.matchLable(removeLable, paramDescriptionLable);
            if (paramDescription != null && paramDescription != undefined)
                paramDescription = Utility.getDescriptionInfoJSON(Utility.removeLable(paramDescription[0], paramDescriptionLable));
            let paramDefaultValue = Utility.matchLable(removeLable, paramDefaultvalueLable);
            if (paramDefaultValue != null && paramDefaultValue != undefined)
                paramDefaultValue = Utility.removeLable(paramDefaultValue[0], paramDefaultvalueLable);
            let item = {
                paramOut: paramOut,
                paramType: paramType,
                paramName: paramName,
                paramDescription: paramDescription,
                paramDefaultValue: paramDefaultValue
            };
            param.push(item);
        }
        return param;
    }

    /**
     * match text content
     * @param {string} text 
     * @param {string} lable 
     */
    static matchLable(text, lable) {
        if (text == null || text == undefined)
            return "";
        const regStr = "\\[" + lable + "\\-start\\]((.)|[\\n\\r])+?\\[" + lable + "\\-end\\]";
        const regMode = "g";
        let regExp = new RegExp(regStr, regMode);
        return text.match(regExp);
    }
    
    /**
     * match text content
     * @param {string} text 
     * @param {Array} lable 
     */
    static matchAllLable(text, lableArray) {
        if (text == null || text == undefined)
            return "";
        let regStr = "";
        for (let i = 0; i < lableArray.length; i++) {
            regStr += "(\\[" + lableArray[i] + "\\-start\\]((.)|[\\n\\r])+?\\[" + lableArray[i] + "\\-end\\])";
            if (i + 1 != lableArray.length)
                regStr += "|";
        }
        const regMode = "g";
        let regExp = new RegExp(regStr, regMode);
        return text.match(regExp);
    }
    
    /**
     * remove the lable in text
     * @param {string} text 
     * @param {string} lable 
     */
    static removeLable(text, lable) {
        if (text == null || text == undefined)
            return "";
        return text.replace(RegExp("\\[" + lable + "\\-start\\]|\\[" + lable + "\\-end\\]", 'g'), "");
    }

    
    /**
     * remove the lable in text
     * @param {string} text 
     * @param {Array} lableArray 
     */
    static removeAllLable(text, lableArray) {
        if (text == null || text == undefined)
            return "";
        let regStr = "";
        for (let i = 0; i < lableArray.length; i++) {
            regStr += "(\\[" + lableArray[i] + "\\-start\\]|\\[" + lableArray[i] + "\\-end\\])";
            if (i + 1 != lableArray.length)
                regStr += "|";
        }
        const regMode = "g";
        let regExp = new RegExp(regStr, regMode);
        return text.replace(regExp, "");
    }

    static searchLable(text, lableRangeArray) {
        for (let i = 0; i < lableRangeArray.length; i++)
            if (text.search(lableRangeArray[i]) != -1)
                return lableRangeArray[i];
        return null;
    }

    static symbolToHTMLLable(text) {
        let result = text;
        const map = [
            {
                key: "\r",
                value: "&nbsp;"
            },
            {
                key: "\n",
                value: "<br>"
            },
            {
                key: " ",
                value: "&nbsp;"
            }
        ];

        for (let i = 0; i < map.length; i++) {
            let item = map[i];
            while (result.search(item.key) != -1)
                result = result.replace(item.key, item.value);
        }

        return result;
    }

}

module.exports = Utility;
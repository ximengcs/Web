const RequestTool = require("./RequestTool");
const TemplateHelper = require("./TemplateHelper");
const Utility = require("./Utility");

class MainContentHelper {

    static async createContentHTML(namespace, class_name, type) {
        // self data
        let classObject = {
            "namespace": namespace,
            "class_name": class_name,
            "type": type
        };
        let classData = await RequestTool.post('/class-info/basic', classObject);
        let propertyData = await RequestTool.post('/property-info/basic', classObject);
        let constructData = await RequestTool.post('/construct-info/basic', classObject);
        let methodData = await RequestTool.post('/method-info/basic', classObject);
        let relationInfo = await RequestTool.post('/relation-info/simple', classObject);
        let content = Utility.mergeJSON(
            classData, { relation: relationInfo }, { propertyList: propertyData },
            { constructList: constructData }, { methodList: methodData });
            
        // parent data
        if (relationInfo.parent_namespace) {
            let parentObject = {
                "namespace": relationInfo.parent_namespace,
                "class_name": relationInfo.parent_class_name,
                "type": relationInfo.parent_type
            };
            let parentClassData = await RequestTool.post('/class-info/basic', parentObject);
            let parentPropertyData = await RequestTool.post('/property-info/basic', parentObject);
            let parentConstructData = await RequestTool.post('/construct-info/basic', parentObject);
            let parentMethodData = await RequestTool.post('/method-info/basic', parentObject);
            content.parent = Utility.mergeJSON(
                parentClassData, { propertyList: parentPropertyData },
                { constructList: parentConstructData }, { methodList: parentMethodData });
        }

        TemplateHelper.compileHTML(content, 'content');
    }

}

module.exports = MainContentHelper;
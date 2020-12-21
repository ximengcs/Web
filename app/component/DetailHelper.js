const RequestTool = require("./RequestTool");
const TemplateHelper = require("./TemplateHelper");

class DetailHelper {

    static async createPropertyHTML(namespace, class_name, type, property_name, property_type) {
        var post_parameters = {
            namespace: namespace,
            class_name: class_name,
            type: type,
            property_name: property_name,
            property_type: property_type
        };
        let data = await RequestTool.post('/property-info/detail', post_parameters);
        TemplateHelper.compileHTML(data, 'property-detail');
    }

    static async createConstructHTML(namespace, class_name, type, param_amount, param) {
        var post_parameters = {
            namespace: namespace,
            class_name: class_name,
            type: type,
            param_amount: param_amount,
            param: param
        };
        let data = await RequestTool.post('/construct-info/detail', post_parameters);
        TemplateHelper.compileHTML(data, 'construct-detail');
    }

    static async createMethodHTML(namespace, class_name, type, method_name, param_amount, param) {
        var post_parameters = {
            namespace: namespace,
            class_name: class_name,
            type: type,
            method_name: method_name,
            param_amount: param_amount,
            param: param
        };
        let data = await RequestTool.post('/method-info/detail', post_parameters);
        TemplateHelper.compileHTML(data, 'method-detail');
    }

}

module.exports = DetailHelper;
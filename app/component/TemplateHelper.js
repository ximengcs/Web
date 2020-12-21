var handleBars = require("handlebars");
var path = require("path");
var fs = require("fs");

class TemplateHelper {

    static compileHTML(content, page) {
        let template = fs.readFileSync(path.join("views", page + "-template.html"), { encoding: "utf-8" });
        handleBars.registerHelper("exist", TemplateHelper.scriber_exist);
        handleBars.registerHelper("comma", TemplateHelper.scriber_comma);
        let resultHTML = handleBars.compile(template)(content);
        fs.writeFileSync(path.join("views", page + ".html"), resultHTML, "utf-8");
    }

    static scriber_exist(data, options) {
        if (data)
            return options.fn(data);
        return options.inverse(data);
    }

    static scriber_comma(index, length, options) {
        if ((parseInt(index) + 1) < length)
                return ",";
            return "";
    }
}

module.exports = TemplateHelper;
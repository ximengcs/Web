/**
 * load menu
 */
$(function() {
    $.get("http://114.215.208.130:8080/class-info/all-class", null, function(response, status, xhr) {
        let data = response.data;
        let result = [];
        let root = {
            Key: data[0].namespace,
            Child: []
        }
        for (let i in data) {
            let record = data[i];
            let item = {
                Key: record.class_name,
                Type: record.type,
                Child: []
            };
            root.Child.push(item);
        }

        result.push(root);

        let tree = $("#tree");
        createTree(result, tree, root);
    });
});

function createTree(arr, parent, root) {

    for (let index in arr) {
        let item = arr[index];
        if (item.Child.length == 0) { // no child
            var li = $("<li>");
            var span = $("<span>");
            li.attr("value", "test");
            li.attr("onclick", "load('" + root.Key + "', '" + item.Key + "','" + item.Type + "')");
            span.append(item.Key);
            li.append(span);
            parent.append(li);
        } else if (item.Child.length > 0) {
            let detail = $("<details>");
            let ul = $("<ul>");
            let summary = $("<summary>");
            summary.append(item.Key);
            detail.append(summary);
            createTree(item.Child, ul, root);
            detail.append(ul);
            parent.append(detail);
        }
    }
}

function load(namespace, class_name, type) {
    // $('#content').load('http://114.215.208.130/content', null, function (response, status, xhr) {
    // });
    $.post("http://114.215.208.130/content", {
        namespace: namespace,
        class_name: class_name,
        type: type
    }, function(response, status, xhr) {
        $("#content").html(response);
    });
}

function propertyDetail(html) {
    let classInfo = html.children[0].innerHTML.split('|');
    $.post("http://114.215.208.130/property-detail", {
        namespace: classInfo[0],
        class_name: classInfo[1],
        type: classInfo[2],
        property_name: classInfo[3],
        property_type: classInfo[4]
    }, function(response, status, xhr) {
        $("#content").html(response);
    });
}

function constructDetail(html) {
    let classInfo = html.children[0].innerHTML.split('|');
    $.post("http://114.215.208.130/construct-detail", {
        namespace: classInfo[0],
        class_name: classInfo[1],
        type: classInfo[2],
        param_amount: classInfo[3],
        param: classInfo[4]
    }, function(response, status, xhr) {
        $("#content").html(response);
    });
}

function methodDetail(html) {
    let classInfo = html.children[0].innerHTML.split('|');
    console.log(classInfo)
    $.post("http://114.215.208.130/method-detail", {
        namespace: classInfo[0],
        class_name: classInfo[1],
        type: classInfo[2],
        method_name: classInfo[3],
        param_amount: classInfo[4],
        param: classInfo[5]
    }, function(response, status, xhr) {
        $("#content").html(response);
    });
}
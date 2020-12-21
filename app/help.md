HandleBars:
 纯数组遍历

    <\ul>
        {{# each list.list1}}
            <\li>{{this}}<\/li>
        {{/each}}
    <\/ul>

 列表键值对

<\ul>
    {{# list.list2}}
        <\li>{{date}}---索引{{@index}}<\/li>
    {{/list.list2}}
<\/ul>

 if判断

{{#if list.list3}}
    <\ul>
        {{#each list.list3}}
            <\li>{{this}}<\/li>
        {{/each}}
    <\/ul>
{{else}}
    <\p>{{list.error}}<\/p>
{{/if}}

 unless 相当于反向的if

{{# unless list.list3}}
    <\p>不存在list3<\/p>
{{/unless}}

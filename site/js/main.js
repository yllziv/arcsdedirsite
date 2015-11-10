requirejs.config({
    baseUrl: './js',
    paths: {
        jquery: 'lib/jquery.min',
        underscore: 'lib/underscore-min',
        jstree: 'lib/jstree'
    },
    shim: {
        underscore: {exports: '_'},
        jstree: {deps: ['jquery']}
    }
});

require(['MyFunction','jquery', 'jstree'], function (MyFunction,$) {
    var chooseall = 0;// 用于切换全选按钮
    var sortall = 0; // 用于切换排列按钮
    var chooseArray = new Array(0); // 保存选择的数据
    var resetting = false; // 模拟rodia单选功能
    var currentFileID = "";
    $(document)
        .ready(function(){ // 初始化事件
            MyFunction.resizewindow(); // 窗口改变时响应式布局
            MyFunction.initJstree(); //初始化jstree
            MyFunction.getAllLayersFromArcSDE();// 读取ArcSDE数据
        })
        .on("click","#openfile",function(){  // 打开所有节点事件
            var instance = $("#jstreeDiv").jstree(true);
            instance.open_all();
        })
        .on("click","#foldfile",function(){ // 折叠所有节点事件
            var instance = $("#jstreeDiv").jstree(true);
            instance.close_all();
        })
        .on("click","#refreshfile",function(){ //刷新目录
            $("#jstreeDiv").jstree(true).refresh();
        })
        .on("click","#chooseall",function(){ // 全选事件变化图标：glyphicon glyphicon-unchecked
            chooseArray = [];
            var checkedFunction = function () {
                $("#chooseall").children("span").attr("class", "glyphicon glyphicon-check");
                $("li.imgli").addClass("clickimg");
            }
            var uncheckedFunction = function () {
                $("#chooseall").children("span").attr("class", "glyphicon glyphicon-unchecked");
                $("li.imgli").removeClass("clickimg");
            }
            chooseall % 2 == 0 ?
                checkedFunction() :
                uncheckedFunction();
            chooseall++;
        })
        .on("click","#sortall",function(){ //排列按钮
            sortall % 2 == 0 ?
                $(this).children("span").attr("class", "glyphicon glyphicon-th-list") :
                $(this).children("span").attr("class", "glyphicon glyphicon-th");
            sortall++;
        })
        .on("click","#moveall",function(){ //移动按钮,返回选中数据
            if($("ul.jstree-container-ul li[aria-selected=true]").length == 1) { // 确保有目录选中
                chooseArray = [];
                $("li.clickimg").each(function (index) {
                    //console.log(index + " " + $(this).text())
                    // 发布图层
                    $.get("http://localhost:8088/rscloudsde/servlet/PublishLayerServlet?layername=" + $(this).text(), function () {})
                    // 保存到数据库
                    $.get("http://localhost:8088/rscloudsde/servlet/AddFileInDBServlet?fileid=" + currentFileID+"&filename="+$(this).text().trim(), function () {})
                    chooseArray.push($(this).text().trim())
                });
            }
        })
        .on("click","#refreshall",function(){ // 刷新ArcSDE文件
            MyFunction.getAllLayersFromArcSDE();
        })
        .on("click",".picStream .imgli",function(){ // 单击ArcSDE文件改变样式
            $(this).toggleClass("clickimg");
        })

    // 默认打开所有节点
    $('#jstreeDiv').on("loaded.jstree", function () {
        $("#jstreeDiv").jstree(true).open_all();
    });
    // 模拟rodia单选功能，选中单一目录
    $('#jstreeDiv').on('select_node.jstree', function (e, data) {
        if (resetting) //ignoring the changed event
        {
            resetting = false;
            return;
        }
        if ($("#jstreeDiv").is(':checked') == false && data.selected.length > 1) {
            resetting = true; //ignore next changed event
            data.instance.uncheck_all(); //will invoke the changed event once
            data.instance.check_node(data.node/*currently selected node*/);
        }
        console.log("The selected nodes are:");
        console.log(data.selected);//节点id
        console.log(data.instance.get_selected(true)[0].original.uid);//节点id
        console.log(data.instance.get_selected(true)[0].text);//节点内容
        currentFileID = data.instance.get_selected(true)[0].original.uid;
    });

    $(window).resize(function () {
        MyFunction.resizewindow();
    });

});

define(['jquery','jstree'],function($){
    return {
        initJstree : function(){
            $("#jstreeDiv").jstree({
                'core': {
                    'data': {
                        "url": "http://localhost:8088/rscloudsde/servlet/GetFolderServlet",
                        //"url": "./js/data/data1.json",
                        "charset":"utf-8",
                        "dataType": "json" // needed only if you do not supply JSON headers
                    }
                },
                "themes": {"theme": "default", "dots": false, "icons": true},
                "plugins": ["themes", "json_data", "checkbox"],
                'checkbox': {
                    three_state: false, //required for the cascade none to work
                    cascade: 'none' //no auto all_children<->parent selection
                }
            });
        },
        resizewindow : function(){ // 当窗口变化，设置arcsde数据图片的高度=分割线的高度
            console.log("ok")
            $(".imgbox").height($(window).height() * 0.80);
        },

        getAllLayersFromArcSDE : function() {  //从服务端读取ArcSDE文件数据
            $.get("http://localhost:8088/rscloudsde/servlet/GetAllLayersServlet", function (data) {
                $(".picStream").html("");
                for(var i in data){
                    var imgli = $("<li class='imgli'><img class='imgfile' src='./img/file.png'><p class='imgtext'>"+ data[i]+"</p></li>");
                    $(".picStream").append(imgli);
                }
            })
        }
    }
})
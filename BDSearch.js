$(function() {
    $("#keyWord").keyup(function() {
        var kw = $("#keyWord").val();
        var url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + kw;
        querySUG(url);
    });
});

function querySUG(url) {
    document.getElementById("list").innerHTML = "";
    $.ajax({
        type: "get",
        async: true,
        url: url,
        dataType: "jsonp",
        jsonp: "cb",
        // jsonpCallback: "callback",
        success: function(data) {
            console.log(data.s);
            var ul = $("<ul></ul>");
            $.each(data.s, function(i, element) {
                var ele = $("<li></li>").append(element);
                $(ul).append(ele);
            });
            $("#list").append(ul).show();
        },
        error: function() {
            console.log("fail");
        }
    });
}
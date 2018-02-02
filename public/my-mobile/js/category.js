$(function () {

    // 初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });

    // 请求左侧列表数据
    getLeftData();

    // 请求右侧列表数据（默认第一个）
    getRightData(1);
});


// 请求左侧列表数据
function getLeftData() {

    $.ajax({
        type: 'GET',
        url: '/category/queryTopCategory',
        success: function (data) {
            // console.log(data);
            var leftTmp = template('LeftTmp',data);
            $(".category-list ul").html(leftTmp);
            $(".category-list ul li").eq(0).addClass("active");

        }
    });

}


// 点击左侧列表时，获取其ID，并更新右侧列表
$(".category-list").on('click','ul li',function() {

    var leftId = $(this).data('id');
    getRightData(leftId);
    $(this).siblings('li').removeClass("active");
    $(this).addClass("active");
})

// 请求右侧列表数据
function getRightData(leftId) {


    $.ajax({
        type: 'GET',
        url: '/category/querySecondCategory',
        data: {
            id: leftId
        },
        success: function (data) {
            // console.log(data);
            var RightTmp = template('RightTmp',data);

            $(".category-items .mui-row").html(RightTmp);
            
        }
    });

}

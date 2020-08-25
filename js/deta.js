; (function () {

    $("#detail_playPicture_list").children("ul").find("li").mouseenter(function () {
        $(this).addClass("checked").siblings().removeClass("checked")
        let i = $(this).index() + 1;
        $(".sBox").children("img").attr("src", "../images/deta" + i + ".png");
        $(".large-box").children("img").attr("src", "../images/deta" + i + ".png")
    });
    $("#detail_left").find(".pic").hover(function () {
        $(".large-box").toggle();
    })
    $(".button-pay").click(function(){
        location.href="http://127.0.0.1/vivostore/html/cart.html"
    })
    $(".button-add").click(function(){
        location.href="http://127.0.0.1/vivostore/html/cart.html"
    });
    class Magnifier {
        constructor() {
            this.sBox = document.querySelector(".sBox");
            this.span = this.sBox.getElementsByTagName("span")[0];
            this.lBox = document.querySelector(".large-box");
            this.lImg = this.lBox.children[0];
            this.addEvent();
        }
        init() {
            this.span.style.width = this.sBox.offsetWidth / (this.lImg.offsetWidth / this.lBox.offsetWidth) + "px";
            this.span.style.height = this.sBox.offsetHeight / (this.lImg.offsetHeight / this.lBox.offsetHeight) + "px";
        }
        addEvent() {
            var that = this;
            // 进入
            this.sBox.onmouseover = function () {
                that.over()
            }
            // 离开
            this.sBox.onmouseout = function () {
                that.out()
            }
            // 移动
            this.sBox.onmousemove = function (eve) {
                var e = eve || window.event;
                that.move(e);
            }
        }
        move(e) {
            var l =e.offsetX - this.span.offsetWidth / 2;
            var t = e.offsetY - this.span.offsetHeight / 2;
            if (l < 0) l = 0;
            if (t < 0) t = 0;
            if (l > this.sBox.offsetWidth - this.span.offsetWidth) {
                l = this.sBox.offsetWidth - this.span.offsetWidth
            }
            if (t > this.sBox.offsetHeight - this.span.offsetHeight) {
                t = this.sBox.offsetHeight - this.span.offsetHeight
            }
            this.span.style.left = l + "px";
            this.span.style.top = t + "px";
            var x = l / (this.sBox.offsetWidth - this.span.offsetWidth);
            var y = t / (this.sBox.offsetHeight - this.span.offsetHeight);
            // console.log(x, y)
            // 根据比例计算位置
            this.lImg.style.left = (this.lBox.offsetWidth - this.lImg.offsetWidth) * x + "px";
            this.lImg.style.top = (this.lBox.offsetHeight - this.lImg.offsetHeight) * y + "px";
        }
        over() {
            this.span.style.display = "block";
            this.lBox.style.display = "block";
            this.init();
        }
        out() {
            this.span.style.display = "none";
            this.lBox.style.display = "none";
        }
    }
    new Magnifier();
    function fn(){
        var userMsg = localStorage.getItem("userMsg") ? JSON.parse(localStorage.getItem("userMsg")) : [];

        var i = 0;
        var onoff = userMsg.some((val,idx)=>{
            i = idx;
            return val.onoff === 1;
        })


    }

    fn();
})();





  

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





class Goods {
    // 构造方法
    constructor() {
      this.list();
      // 给登录按钮绑定事件
    }
    /******实现商品列表***** */
    list () {
      //1 发送ajax获取数据
      ajax.get('../php/goods.php', { fn: 'lst' }).then(res => {
        // console.log(res);
        let { stateCode, data } = JSON.parse(res);
        //2 判断状态,拿到data
        if (stateCode == 200) {
          // 3 循环数据,拼接追加
          let str = '';
          data.forEach(ele => {
            // console.log(ele);
            str += `<div class="goodsCon"><a target = "_blank" href="http://127.0.0.1/vivostore/html/deta.html">
              <img src="${ele.goodsImg}" class="icon"><h4 class="title">${ele.goodsName}</h4>
              <div class="info">限时抢购200条</div></a><div class="priceCon">
              <span class="price">￥${ele.price}</span>
              <span class="oldPrice">￥${(ele.price * 1.2).toFixed(2)}</span>
              <div><span class="soldText">已售${ele.num}%</span>
              <span class="soldSpan"><span style="width: 87.12px;">
              </span></span></div>
              <a class="button" target="_blank" onclick="Goods.addCart(${ele.id},1)">立即抢购</a></div></div >`;
          });
          // 4 获取divs,将数据追加
          $('.divs').innerHTML = str;
        }
  
      })
    }
  
    /****数据加入购物车****/
    static addCart (goodsId, goodsNum) {
      //1 判断当前用户是否登录
      if (localStorage.getItem('user')) {
        // 2 登录则存入数据库
        Goods.setDataBase(goodsId, goodsNum)
      } else {    // 3 没有登录存入浏览器
        Goods.setLocal(goodsId, goodsNum)
      }
    }
    /****存数据库的方法*****/
    static setDataBase (goodsId, goodsNum) {
      // 1 获取当前用户id
      let userId = localStorage.getItem('userId');
      // 2 发送ajax,进行存储
      ajax.post('../php/goods.php?fn=add', { userId: userId, gId: goodsId, gNum: goodsNum }).then(res => {
        console.log(res);
  
      });
    }
    /*****存浏览器的方法*****/
    static setLocal (goodsId, goodsNum) {
      //1 取出local中的数据
      let carts = localStorage.getItem('carts')
      // 2 判断是否有数据,存在则判断当前商品是否存在
      if (carts) {
        // console.log(carts);
        // 2-1 转化为对象
        carts = JSON.parse(carts);
        //2-2 判断当前商品是否存在,存在则增加数量
  
        for (let gId in carts) {
          if (gId == goodsId) {  // 判断当前添加的商品和正在循环的商品是否一致
            goodsNum = carts[gId] - 0 + goodsNum;
          }
        }
        // 2-3 不存在就新增,存在就重新给数量
        carts[goodsId] = goodsNum;
  
        // 2-4 存到local
        localStorage.setItem('carts', JSON.stringify(carts))
      } else {
        // 3 没有数据就新增,保存商品id和数量
        let goodsCart = { [goodsId]: goodsNum };
        // 3-1 转化为json进行存储
        goodsCart = JSON.stringify(goodsCart);
        localStorage.setItem('carts', goodsCart)
  
      }
  
    }
  
    /******用户登录后,将浏览器数据添加到数据库*********/
  
  }
  
  new Goods;
  
  

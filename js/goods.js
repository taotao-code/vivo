

class Goods {
    // 构造方法
    constructor() {
      Goods.list();
      this.lay();
      // 给登录按钮绑定事件
    }
    lay(){
      layui.use('flow', function(){
        var flow = layui.flow;
        flow.lazyimg(); 
      });
      flow.lazyimg(options)
    }
    
    
    /******实现商品列表***** */
   static list (tmp=1) {
      //1 发送ajax获取数据
      ajax.get('../php/goods.php', { fn: 'lst', page:tmp}).then(res => {
        let { stateCode, data ,count} = JSON.parse(res);
       
        //2 判断状态,拿到data
        if (stateCode == 200) {
          // 3 循环数据,拼接追加
          let str = '';
          data.forEach(ele => {
            // console.log(ele);
            str += `<div class="goodsCon"><a target = "_blank" href="http://127.0.0.1/vivostore/html/deta.html">
              <img lay-src="${ele.goodsImg}" class="icon"><h4 class="title">${ele.goodsName}</h4>
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

          //渲染页码
          let pagstr=""; 
          for(let i=1;i<=count;i++){
            // console.log(i);
             pagstr+=`<li><a href="#" onclick="Goods.list(${i})">${i}</a></li>`;
          };
          // console.log(pagstr);
          document.querySelector(".pagination").innerHTML=pagstr;
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
      let userId = localStorage.getItem('user');
      // 2 发送ajax,进行存储
      ajax.post('../php/goods.php?fn=add', { userId:userId, gId:goodsId, gNum:goodsNum }).then(res => {
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
          if (gId == goodsId) {  
            goodsNum = carts[gId] - 0 + goodsNum;
          }
        }
        carts[goodsId] = goodsNum;
  
        localStorage.setItem('carts', JSON.stringify(carts))
      } else {
        let goodsCart = { [goodsId]: goodsNum };
        goodsCart = JSON.stringify(goodsCart);
        localStorage.setItem('carts', goodsCart);
      }
  
    }
  
  
  }
  
  new Goods;
  
  
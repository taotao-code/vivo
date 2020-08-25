/*******获取购物车数据进行渲染*********/

class Cart {
    constructor() {
      this.list();
      // 给全选按钮绑定事件
      all('.check-all')[0].addEventListener('click', this.checkAll);
      all('.check-all')[1].addEventListener('click', this.checkAll);
    }
  
    /*******购物车列表******/
    list () {
      // 1 根据登录状态获取商品id
      let userId = localStorage.getItem('user');
    // console.log(userId)  
      // 声明保存购物车商品id的变量
      let cartGoodsId = '';
      if (userId) {
        //2 存在则去cart表中获取id
        ajax.get('../php/cart.php', { fn: 'getGoodsId', userId:userId }).then(res => {
          // console.log(res);
          let { data, stateCode } = JSON.parse(res);
          if (stateCode == 200) {
            //console.log(data);
            // 购物车数据为空则停止
            if (!data) return;
  
            // 将商品id和数量保存为对象
            let cartIdNum = {};
            data.forEach(ele => {
              cartGoodsId += ele.productId + ','
              cartIdNum[ele.productId] = ele.num;
            })
            // 根据id获取商品信息
            // console.log(cartIdNum);
            Cart.getCartGoods(cartGoodsId, cartIdNum);
           
          }
         
  
        })
      } else {
        // 3 未登录去浏览器获取数据
        let cartGoods = localStorage.getItem('carts');
        // 3-1 为空则停止
        if (!cartGoods) return;
        cartGoods = JSON.parse(cartGoods);
        // console.log(cartGoods);
  
        // 3-2 循环遍历,获取商品id
        for (let gId in cartGoods) {
          //console.log(gId);
  
          cartGoodsId += gId + ','
        }
        //console.log(cartGoodsId);
        Cart.getCartGoods(cartGoodsId);
      }
    }
    /******根据购物车商品id,去商品表获取商品信息*****/
    static getCartGoods (gId, cartIds = '') {
      // 如果是登录状态,商品数量从cartIds,为登录从浏览器来
      cartIds = cartIds || JSON.parse(localStorage.getItem('carts'));
      // console.log(cartIds);
  
      ajax.post('../php/cart.php?fn=lst', { goodsId: gId }).then(res => {
        // console.log(res);
        // 1 转化数据,获取data
        let { data, stateCode } = JSON.parse(res);
        if (stateCode == 200) {
          let str = '';
          data.forEach(ele => {
            // console.log(ele);
            // 将数据循环到页面中
            str += `<tr>
            <td class="checkbox"><input class="check-one check" type="checkbox"/ onclick="Cart.goodsCheck(this)"></td>
            <td class="goods"><a href="http://127.0.0.1/vivostore/html/deta.html">
            <img src="${ele.goodsImg}" alt=""/><a>
            <span>${ele.goodsName}</span></td>
            <td class="price">${ele.price}</td>
            <td class="count">
                <span class="reduce" onclick="Cart.decGoodsNum(this,${ele.id})">-</span>
                <input class="count-input" type="text" value="${cartIds[ele.id]}"/>
                <span class="add" onclick="Cart.addGoodsNum(this,${ele.id})">+</span></td>
            <td class="subtotal">${(ele.price * cartIds[ele.id]).toFixed(2)}</td>
            <td class="operation"><span class="delete" onclick='Cart.delGoods(this,${ele.id})'>删除</span></td>
        </tr>`
          })
          $('tbody').innerHTML = str;
        }
      });
    }
    /*********商品的删除******/
    static delGoods (eleObj, gId) {
      let userId = localStorage.getItem('user');
      console.log(userId)
      if (userId) {
        ajax.get('../php/cart.php', { fn: 'delete', goodsId: gId, userId: userId }).then(res => {
          console.log(res);
  
        })
      } else {
        let cartGoods = JSON.parse(localStorage.getItem('carts'));
        delete cartGoods[gId];
        localStorage.setItem('carts', JSON.stringify(cartGoods));
      }
      eleObj.parentNode.parentNode.remove();
      Cart.cpCount();
    }
    /******价格和数量计算********/
    static cpCount () {
      let checkOne = all('.check-one');
      let count = 0;
      let xj = 0;
      checkOne.forEach(ele => {
        if (ele.checked) {
          // console.log(ele);
          let trObj = ele.parentNode.parentNode;
          let tmpCount = trObj.getElementsByClassName('count-input')[0].value;
          let tmpXj = trObj.getElementsByClassName('subtotal')[0].innerHTML;
          count = tmpCount - 0 + count;
          xj = tmpXj - 0 + xj;
        }
      })
      // 5 放到页面中
      $('#selectedTotal').innerHTML = count;
      $('#priceTotal').innerHTML = parseInt(xj * 100) / 100;
  
    }
  
    /******数量增加*****/
    static addGoodsNum (eleObj, gId) {
      // console.log(eleObj);
      let inputNumObj = eleObj.previousElementSibling;
      //console.log(inputNumObj);
      inputNumObj.value = inputNumObj.value - 0 + 1;
      if (localStorage.getItem('user')) {
        Cart.updateCart(gId, inputNumObj.value);
      } else {
        Cart.updateLocal(gId, inputNumObj.value)
      }
  
      // 3 实现小计的计算
      //  3-1 获取价格的节点
      let priceObj = eleObj.parentNode.previousElementSibling;
      eleObj.parentNode.nextElementSibling.innerHTML = (priceObj.innerHTML * inputNumObj.value).toFixed(2);
      Cart.cpCount();
    }
    /********cart中数量修改******** */
    static updateCart (gId, gNum) {
      let id = localStorage.getItem('user');
      // console.log(id)
      ajax.get('../php/cart.php', { fn: 'update', goodsId: gId, goodsNum: gNum, userId: id }).then(res => {
        console.log(res);
      })
    }
    /******浏览器中数量修改*****/
    static updateLocal (gId, gNum) {
      // 取出并转化
      let cartGoods = JSON.parse(localStorage.getItem('carts'));
      // 重新赋值
      cartGoods[gId] = gNum;
      localStorage.setItem('carts', JSON.stringify(cartGoods))
    }
    /*****全选的实现*******/
    checkAll () {
      // console.log(this);
      let state = this.checked;
      // console.log(state);
      all('.check-all')[this.getAttribute('all-key')].checked = state;
      let checkGoods = all('.check-one');
      checkGoods.forEach(ele => {
        //console.log(ele);
        ele.checked = state;
  
      })
      Cart.cpCount();
    }
  
    /*******单选的实现*****/
    static goodsCheck (eleObj) {
      //  console.log(eleObj);
      let state = eleObj.checked;
      //console.log(state);
      if (!state) {
        all('.check-all')[0].checked = false;
        all('.check-all')[1].checked = false;
      } else {
        let checkOne = all('.check-one');
        let len = checkOne.length;
        let checkCount = 0;
        checkOne.forEach(ele => {
          ele.checked && checkCount++
        })
        if (len == checkCount) {
          all('.check-all')[0].checked = true;
          all('.check-all')[1].checked = true;
        }
      }
      // 计算价格和数量
      Cart.cpCount();
    }
    /******数量的减少********/
static decGoodsNum(eleobj,gId){
  let inputNumObj=eleobj.nextElementSibling;
  // console.log(inputNumObj)
  if(inputNumObj.value>1){
    inputNumObj.value=inputNumObj.value-0-1;
  }
  if(localStorage.getItem("user")){
      Cart.updateCart(gId, inputNumObj.value);
  }else {
      Cart.updateLocal(gId, inputNumObj.value)
    }
  let priceObj = eleobj.parentNode.previousElementSibling;
  eleobj.parentNode.nextElementSibling.innerHTML = (priceObj.innerHTML * inputNumObj.value).toFixed(2);
  Cart.cpCount();
}
  }
  
  new Cart;
  
  
  
  
  
  
  
  
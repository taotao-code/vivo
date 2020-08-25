//下拉列表

$(".nav-ul").onmouseenter=function(){
  $(".nex-con").style.display="block";
}
$(".nav-ul").onmouseleave=function(){
  $(".nex-con").style.display="none";
}


//  轮播图
 //获取节点
 var div=document.querySelector("#banner-con"),
 imgs=document.querySelectorAll(".banner-ul li"),
 btns=document.querySelectorAll("ol li"),
 goPrev = document.querySelector('#goPrev')
 var index=0;
 var lastIndex=0;
 for(let i=0;i<btns.length;i++){
   btns[i].key=i;
   btns[i].onclick=function(){
       lastIndex=index;
       index=this.key;
       show()
   }
   goPrev.onclick = function () {
    lastIndex = index;
    index--;
    if (index < 0) index = imgs.length - 1;
    show();
  }
 }
  function show(){
      imgs[lastIndex].classList.remove("ac")
      imgs[index].classList.add("ac");
       btns[lastIndex].classList.remove('ac');
       btns[index].classList.add('ac');
  }
/*****定时器******/
  function bo(){
   timer = setInterval(function () {
        goPrev.onclick();
      }, 3000);
  }
  bo();

  //侧边导航





  //倒计时
  var  hour=$(".time-hour");
  var  minute=$(".time-minute");
  var  second=$(".time-second");
  
  var h=11;
  var m=59;
  var s=59;
  function fn(){
    var time = setInterval(function () {
        s--; // 秒数自减
        if (s < 0) {  // 秒数小于0
          m -= 1;  // 分钟减-1
          s = 59
        }
        if(m<0){
          h-=1;
          m=59
        }
        if (s == 0 && m == 0&& h==0 ) {  // 当秒数和分钟为0,就清除定时器
          clearInterval(time);
          // 初始化倒计时
          h=11
          m = 59;
          s = 59;
        }
        if(s<10) second.innerHTML = "0"+s;else second.innerHTML =s;
        if(m<10) minute.innerHTML = "0"+m;else minute.innerHTML =m;
        if(h<10) hour.innerHTML = "0"+h;else hour.innerHTML = h;

      }, 1000)
  }
  
  fn();


 
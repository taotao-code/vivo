//下拉列表
var navul=document.querySelector(".nav-ul");
var nexcon=document.querySelector(".nex-con");
navul.onmouseenter=function(){
  nexcon.style.display="block";
}
navul.onmouseleave=function(){
  nexcon.style.display="none";
}


//  轮播图
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



  //倒计时
  var  hour=$(".time-hour");
  var  minute=$(".time-minute");
  var  second=$(".time-second");
  
  var h=11;
  var m=59;
  var s=59;
  function fn(){
    var time = setInterval(function () {
        s--; 
        if (s < 0) { 
          m -= 1; 
          s = 59
        }
        if(m<0){
          h-=1;
          m=59
        }
        if (s == 0 && m == 0&& h==0 ) {  
          clearInterval(time);
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

  $(function(){
    $(window).scroll(function(){
      let top =$(window).scrollTop();
      if(top>800){
        $(".gotop").fadeIn(1000)
      }else{
        $(".gotop").fadeOut(1000)
      }
    });
    $(".gotop").click(function(){
      $("html,body").animate({
        scrollTop:0
      },1000);
    });
  })



 
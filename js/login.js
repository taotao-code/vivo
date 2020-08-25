var x=false;
var y=false;

var user=$("#username");
var pwd=$("#pwd");

   // 2 验证用户名,当失去焦点时触发事件
   user.onblur = function(){
    // a 获取表单中的值
    let username=localStorage.getItem('user');
    var val  = this.value;
    if(username==val){
        this.nextElementSibling.innerHTML = '输入正确';
        x = true;
    }else{
        this.nextElementSibling.innerHTML = '输入错误';
        x=false;
    }
}
pwd.onblur = function(){
    let pwdId=localStorage.getItem('userId');
    var passVal = this.value;
    //a 验证密码的长度
    if(pwdId==passVal){
       this.nextElementSibling.innerHTML = "密码正确";
        y=true;

    }else{
        this.nextElementSibling.innerHTML = '密码错误';
        y=false;
    }
}
$("#login-button").onclick = function(){
    if(x&&y){
        $("#login-buttona").setAttribute("href","http://127.0.0.1/vivostore/html/vivo.html")
    }else{
        alert("输入错误");
    }
}



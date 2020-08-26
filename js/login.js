class login{
    constructor(){
       this.button();
    }
    button(){
        $('#login-button').onclick=function(){
            var user=$("#username").value;
            var pwd=$("#pwd").value;
           login.list(user,pwd);
        }
    }
     static list(user,pwd){
        ajax.get("../php/sign.php",{fn:"lst"}).then(res=>{
           let { stateCode, data } = JSON.parse(res);
           if(stateCode==200){
            data.forEach(ele => {
                if(pwd==ele.userId){
                    if(user==ele.user){
                        localStorage.setItem('user',ele.user);
                        alert("登录成功")
                        window.location.href = "http://127.0.0.1/vivostore/html/vivo.html";
                    }
                }else{ 
                        $("#username").nextElementSibling.innerHTML = '用户名不存在';   
                }
            })     
           }
        })
    }
}
new login();



var x = false;
var y = false;

var user = $("#username");
var pwd = $("#pwd");

// 2 验证用户名,当失去焦点时触发事件
user.onblur = function () {
    // a 获取表单中的值
    var val = this.value;
    //console.log(val);
    // b 书写正则
    var reg = /^1{1}[3-9]{1}\d{9}$/;
    if (reg.test(val)) {
        this.nextElementSibling.innerHTML = '输入正确';
        x = true;
    } else {
        this.nextElementSibling.innerHTML = '输入错误';
        x = false;
    }
}
pwd.onblur = function () {
    var passVal = this.value;
    //a 验证密码的长度
    if (passVal.length >= 6 && passVal.length <= 20) {
        // b 验证密码输入的内容
        //记录密码的强度状态
        var a = 0, b = 0; c = 0;
        // 验证是否是有数字
        var reg = /\d+/;
        a = reg.test(passVal) ? 1 : 0;
        //console.log(a);
        // 验证是否有字母
        var reg1 = /[a-zA-Z]+/;
        b = reg1.test(passVal) ? 1 : 0;
        // 验证是否包含特殊字符
        var reg2 = /[^a-zA-Z\d]+/;
        c = reg2.test(passVal) ? 1 : 0;
        // 给出面强度判断
        var str = '';
        switch (a + b + c) {
            case 1:
                str = '弱';
                break;
            case 2:
                str = '中';
                break;
            case 3:
                str = '强';
                break;
        }
        // 将密码强度追加到密码框后
        this.nextElementSibling.innerHTML = str;
        // console.log(a+b+c);
        y = true;

    } else {
        this.nextElementSibling.innerHTML = '密码长度不够';
        y = false;
    }
}
$("#login-button").onclick = function () {
    if (x && y) {
        ajax.get("../php/sign.php", { fn: 'lst' }).then(res => {
            let { stateCode, data } = JSON.parse(res);
            // console.log(data)
            if (stateCode == 200) {
                let users="";
                data.forEach(ele => {
                    users=ele.user
                })
                if (users== user.value) {
                    alert("用户名已占用");
                }else{
                    ajax.post("../php/sign.php?fn=add", { user: user.value, userId: pwd.value }).then(res => {
                        console.log(res)
                    })
                    alert("注册成功,立即登录")
                    window.location.href = "http://127.0.0.1/vivostore/html/login.html";
                }
            }
        })
    } else {
        alert("输入错误");
    }
}



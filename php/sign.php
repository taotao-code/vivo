<?php
// 导入php文件
include('./mysql.php');
// 获取ajax请求的方法
$fn = $_GET['fn'];  // lst
$fn();  // lst()
function lst(){
  $sql = 'select * from user';
//   echo $sql;die;
  $data = select($sql);
//   print_r($data);
  echo json_encode([
    'stateCode'=>200,
    'state'=>'success',
    'data'=>$data
  ]);
}
function add()
{
//  echo '我是添加';
 $userId = $_POST['userId'];
 $user = $_POST['user'];
 $sql = "insert into user(user,userId) values('$user','$userId')";
 
  $res = query($sql);
  echo $res;die;
  if($res==1){
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>''
    ]);
  }else{
    echo json_encode([
      'stateCode'=>201,
      'state'=>'error',
      'data'=>''
    ]);
  }
}
?>
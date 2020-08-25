<?php
// 导入php文件
include('./mysql.php');
// 获取ajax请求的方法
$fn = $_GET['fn'];  // lst
$fn();  // lst()
function lst(){
  $sql = 'select * from product';
  $data = select($sql);

  // print_r($data);
  echo json_encode([
    'stateCode'=>200,
    'state'=>'success',
    'data'=>$data
  ]);
}
//lst();
 // 添加数据的方法
function add()
{
 //echo '我是添加';
 $userId = $_POST['userId'];
 $gId = $_POST['gId'];
 $gNum = $_POST['gNum'];

 $sql = "insert into cart(userId,productId,num,size) values('$userId','$gId','$gNum',40) on duplicate key update num=num+$gNum";
//  echo $sql;die;
  $res = query($sql);
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
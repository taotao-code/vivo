<?php
include("./mysql.php");
$fn=$_GET["fn"];
$fn();

/******获取cart中指定用户的商品id******/
function getGoodsId(){
    $userId=$_GET["userId"];
    $sql="select productId,num from cart where userId='$userId'";
    $data=select($sql);
    echo json_encode([
        "stateCode"=>200,
        "state"=>"success",
        "data"=>$data
    ]);
}
function lst(){
    $id=$_POST["goodsId"];
    $id=substr($id,0,strlen($id)-1);
    $sql = "select * from product where id in ($id)" ;
    $data=select($sql);
    echo json_encode([
        "stateCode"=>200,
        "state"=>"success",
        "data"=>$data
    ]);

}

/******修改数据库信息******/
function update(){
    $gId=$_GET["goodsId"];
    $num=$_GET["goodsNum"];
    $userId=$_GET["userId"];
    $sql="update cart set num=$num where productId='$gId' and userId='$userId'";   
    $res=query($sql);
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
/******删除数据*********/
function delete(){
    $gId = $_GET['goodsId'];
    $user = $_GET['userId']; 
    $sql = "delete from cart where productId=$gId and userId='$user'";
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
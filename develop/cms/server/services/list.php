<?php
/**
 * Created by PhpStorm.
 * User: 14080226
 * Date: 2015/7/2
 * Time: 14:07
 */
date_default_timezone_set('PRC'); //默认时区
//设置报头类型为
header('Content-type: application/json');
// ok
header('HTTP/1.1 200 OK');

//默认5页面
//一般5页或10页
//XX.php?startIndex=1&pageSize=10&pageIndex=1&endIndex=10&timestamp=1435820793675

//获取参数
$startIndex = $_REQUEST["startIndex"];
$endIndex = $_REQUEST["endIndex"];
$pageSize = $_REQUEST['pageSize'];
$pageIndex = $_REQUEST['pageIndex'];
$isNodata = $_REQUEST['isNodata'];

$isNodata = isset($isNodata) ? true : false;
if($isNodata==true){
    $result["total"] = 0;
    $result["list"] = array();
    print(json_encode($result));
    exit();
}

$startIndex = isset($startIndex) ? intval($startIndex) : 1;
$endIndex = isset($endIndex) ? intval($endIndex) : 1;
$pageSize = isset($pageSize) ? intval($pageSize) : 10;
$pageIndex = isset($pageIndex) ? intval($pageIndex) : 1;






$result = Array();
$items = array();


//设置
//TODO:共39条数据
$count = 39;
//根据分页数量判定
//共39条数据，每页10条，共4页，前三页10条，第四页9条数据
//pageSize:10
//39/10
$pageCount=$count/$pageSize;
settype($pageCount,"int");
//echo $realDataCount;
//echo $pageCount;

//实际数据量
$realDataCount=$pageSize;

//如果是整除的
if($count%$pageSize==0){
    $realDataCount=$pageSize;
}
//单页
else if($count%$pageSize!=0){

    $pageCountReal=$pageCount+1;

    if($pageIndex<$pageCount){
        $realDataCount=$pageSize;
    }
    else if($pageIndex==$pageCount+1){
        $realDataCount=$count-$pageCount*$pageSize;

    }
}




for ($i = 0; $i < $realDataCount; $i++) {
    $jsonData = new JsonData();
    $jsonData->orderNumber = $i;
//    $jsonData->orderDate=date("Y-m-d H:i:s");
    //时间
//    $timestamp = time();
//    echo $timestamp;
//    echo "p";
//    $date_time_array = getdate( $timestamp);
//    $hours = $date_time_array[ "hours"];
//    $minutes = $date_time_array["minutes"];
//    $seconds = $date_time_array[ "seconds"];
//    $month = $date_time_array["mon"];
//    $day = $date_time_array["mday"];
//    $year = $date_time_array["year"];
//    $jsonData->orderDate=$year.$month.$day;
    //"2015-9-9 15:32:38"
    $date = date("Y-m-d H:i:s");
    $dateNew = date("Y-m-d H:i:s", strtotime("$date +" . $i . " day"));
    $dateNew = date("Y-m-d H:i:s", strtotime("$dateNew +" . $i . " hours"));
    $jsonData->orderDate = $dateNew;

    $jsonData->orderState = "1";
    if($i%2){
        $jsonData->orderState = "0";
    }




    //money
    $jsonData->orderMoney = "100"*$i;
    //
    array_push($items, $jsonData);
}
$result["total"] = $count;
$result["list"] = $items;
$result["startIndex"] = $startIndex;
$result["endIndex"] = $endIndex;
$result["pageSize"] = $pageSize;
$result["pageIndex"] = $pageIndex;


print(json_encode($result));


class JsonData
{
    public function __construct()
    {
    }

    public function __clone()
    {
    }
}
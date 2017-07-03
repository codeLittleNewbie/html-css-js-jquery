<?php
/**
 * Created by PhpStorm.
 * User: W-Q
 * Date: 2017/7/2
 * Time: 下午7:50
 */

$operation = $_GET["act"];
//
//echo $operation;
// 添加评论


if ($operation == "add"){
    // 从数据库中获取文件
    $contents = file_get_contents("../file/contents.json");
//    $contents = file_get_contents("../file/xmlData.xml");

    // 把js对象转化为php对象
    $obj = json_decode($contents);

    // $myfile = fopen("contents","w+");
    // $str = "content : ".$operation;
    // fwrite($myfile,$str);

    print_r($obj);
}
//
//echo 1;
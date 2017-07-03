<?php
/**
 * Created by PhpStorm.
 * User: W-Q
 * Date: 2017/7/3
 * Time: 下午9:11
 */

//
header("Content-type: text/html; charset=utf-8");


// 导入文件
$json = file_get_contents("../file/tsconfig.json");


// 直接把数据返回

echo $json;
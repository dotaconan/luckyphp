<?php

$dirCurrent = dirname(__FILE__);
$dirService = dirname($dirCurrent);
$dirServer = dirname($dirService);

//例如：制作500×300的绿色图片
$width=500;
$height=300;
//创建真彩色的画布
$img=imageCreateTrueColor($width,$height);
// var_dump($img);    //测试结果： resource(2) of type (gd)   $img是一个资源类型
//使用函数imageColorAllocate(画布，R，G，B)分配颜色，颜色的表示方式：R  G  B
$green=imageColorAllocate($img, 0x0, 0xff, 0x0);
//填充画布，原点：0，0,画布的左上角，imageFill(画布, 填充位置x， 填充位置Y，颜色标识)完成
imageFill($img,0,0,$green);
//输出画布，直接输出到当前路径下为图片文件，格式有PNG、JPEG、GIF
//imagePNG($img,'./green.png');  //如果没有第二个参数，表示直接输出

//如果直接输出到浏览器，需要告知浏览器，响应数据的类型应该是PNG格式的图片：使用指令Content-type
header('Content-Type:image/png;');
imagePNG($img);
//注：一个画布可以输出多次，输出为各种格式

//销毁画布资源
imageDestroy($img);

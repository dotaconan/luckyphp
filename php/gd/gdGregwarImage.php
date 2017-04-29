<?php

$dirCurrent = dirname(__FILE__);
$dirService = dirname($dirCurrent);
$dirServer = dirname($dirService);

$color = $_REQUEST['color'];

//echo $dirService;
require $dirService . "/vendor/autoload.php";

use Gregwar\Image\Image;

// Opening vinci.png
$imgHeart = Image::open('heart.png');
//$imgHeart->fill(0xcc33ff, 0, 0);

$data = 'iVBORw0KGgoAAAANSUhEUgAAABwAAAASCAMAAAB/2U7WAAAABl'
    . 'BMVEUAAAD///+l2Z/dAAAASUlEQVR4XqWQUQoAIAxC2/0vXZDr'
    . 'EX4IJTRkb7lobNUStXsB0jIXIAMSsQnWlsV+wULF4Avk9fLq2r'
    . '8a5HSE35Q3eO2XP1A1wQkZSgETvDtKdQAAAABJRU5ErkJggg==';
$data = base64_decode($data);
$imgBase64ToImgResult = Image::fromData($data)
    ->save('imgBase64ToImgResult.jpg');


$img = Image::open('icon.png');
//$img = Image::open('heart.png')
$imgResult = $img
    //颜色修改
//    ->colorize(320,103,130)
//    ->resize(300, 300)
    //消除颜色
//    ->negate()
//    ->jpeg()
    //复古的
//    ->sepia()
    //只留边缘
//    ->edge()
    //锐化
//    ->sharp()
    //灰度级;
//    ->grayscale()
//浮雕
//    ->emboss()

    //填充背景颜色
//    ->fillBackground(0xeeeeee)
//    ->fillBackground(0xffffff)

    //模糊
//    ->smooth(20)

    //填充颜色
//    ->fill(0xcc33ff, 100, 100)


    //垂直翻转
//    ->flip( 100, 100)
    //垂直翻转
//    ->flip( 0, 1)
    //水平翻转
//    ->flip( 1, 0)
    //水平垂直翻转
//    ->flip( 1, 1)

    //增加亮度
//    ->brightness( 50)

    //★编写文字
    ->fillBackground(0xeeeeee)
//    ->write('./stheitisc.ttf', '亲爱的Tina123123123123123,你好!', 320, 120, 50, 0,0x800080 , 'left')
    ->write('pingfang.ttf', '亲爱的,你的作品好棒!', 520, 120, 50, 0,0x800080 , 'center')

//        ->enableProgressive()

//    ->merge($imgHeart, $x, $y, $width, $height)


    //左上角
    ->merge($imgHeart, 0, 0)
//右上角
    ->merge($imgHeart, $img->width() - $imgHeart->width(), 0)
    //左下角
    ->merge($imgHeart, 0, $img->height() - $imgHeart->height())
    //右下角
    ->merge($imgHeart, $img->width() - $imgHeart->width(), $img->height() - $imgHeart->height())
    //动态计算爱心宽度高度查看边框能够填充多少个

        //缩放大小
//    ->cropResize(100, 100)
    //80失真
//    ->guess(80)


//    ->inline("inline")

    ->save('iconOut.png');
//    ->get('jpeg');

var_dump($imgResult);

//$content=file_get_contents("heartOut.jpg");
//header('Content-Type:image/jpg');
//imagejpeg($img);
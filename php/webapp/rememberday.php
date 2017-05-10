<?php

$dirCurrent = dirname(__FILE__);
$dirService = dirname($dirCurrent);
$dirServer = dirname($dirService);

$color = $_REQUEST['color'];

//echo $dirService;
require $dirService . "/vendor/autoload.php";

use Gregwar\Image\Image;

$startdate=strtotime("2015-10-24 12:00");
$enddate=time();
$days=round(($enddate-$startdate)/3600/24) ;

// Opening vinci.png
//$imgHeart = Image::open('rememberday.png');
//$imgHeart->fill(0xcc33ff, 0, 0);

$img = Image::open('rememberday.png');
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
    //->fillBackground(0xeeeeee)
//    ->write('./stheitisc.ttf', '亲爱的Tina123123123123123,你好!', 320, 120, 50, 0,0x800080 , 'left')
    ->write($dirService.'/font/huakang.ttf', 'Lucky', 350, 510, 30, 0,0xe13098 , 'center')
    ->write($dirService.'/font/huakang.ttf', 'Tina', 520, 510, 30, 0,0xe13098 , 'center')

    ->write($dirService.'/font/huakang.ttf', '&', 440, 510, 22, 0,0xd577bb , 'center')

    ->write($dirService.'/font/huakang.ttf', $days, 450, 560, 22, 0,0xe13098 , 'center')

    ->write($dirService.'/font/huakang.ttf', '相恋已', 360, 560, 22, 0,0xd577bb , 'center')
    ->write($dirService.'/font/huakang.ttf', '天', 530, 560, 22, 0,0xd577bb , 'center')



//        ->enableProgressive()

//    ->merge($imgHeart, $x, $y, $width, $height)


    //左上角
    //->merge($imgHeart, 0, 0)
//右上角
    //->merge($imgHeart, $img->width() - $imgHeart->width(), 0)
    //左下角
    //->merge($imgHeart, 0, $img->height() - $imgHeart->height())
    //右下角
    //->merge($imgHeart, $img->width() - $imgHeart->width(), $img->height() - $imgHeart->height())
    //动态计算爱心宽度高度查看边框能够填充多少个

        //缩放大小
//    ->cropResize(100, 100)
    //80失真
//    ->guess(80)


//    ->inline("inline")

//    ->save('iconOut.png');
    ->get('png');

//    ->jpeg();

//var_dump($imgResult);
//$content=file_get_contents("heartOut.jpg");

//输出图片
header('Content-Type:image/png');
echo $imgResult;


?>
<!--<img src="--><?//= $imgResult  ?><!--" />-->

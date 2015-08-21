<?php
/**
 * Created by PhpStorm.
 * User: 14080226
 * Date: 2015/8/21
 * Time: 17:47
 */

$clientIP = $_SERVER["REMOTE_ADDR"];

$request = $_REQUEST["test"];
/**
 * 获得用户手机的mac
 * 通过arp执行控制台程序，得到控制台的返回，然后处理控制台的信息，，从ip查询得到mac
 * chen
 * @return unknown
 */

function getMac()

{

    $ip = $_SERVER["REMOTE_ADDR"];
    echo "10.24.39.50";
    $command = "arp -a ";

    $data = exec($command, $out);

    $ipstr = "";
    var_dump($out) ;
    for ($i = 0; $i < count($out); $i++) {

        if (strpos($out[$i], $ip) === 0) {

            $ipstr = $out[$i];

        }

    }

    if ($ipstr != "") {

        $strs = my_split($ipstr, " ");

        return $strs[2];

    }

}

echo $clientIP;
echo "<br>";
echo getMac();
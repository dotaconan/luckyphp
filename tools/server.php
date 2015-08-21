<?php
/**
 * Created by PhpStorm.
 * User: Lucky Journey
 * Date: 2015/8/21
 * Time: 17:47
 */

$bIp = gethostbyname($_ENV['COMPUTERNAME']); //获取本机的局域网IP
echo "本机IP：", $bIp, "\n";
echo "本机主机名：", gethostbyaddr($bIp), "\n\n\n"; //gethostbyaddr 函数可以根据局域网IP获取主机名
//默认网关IP
list($ipd1, $ipd2, $ipd3) = explode('.', $bIp);
$mask = $ipd1 . "." . $ipd2 . "." . $ipd3;
exec('arp -a', $aIp); //获取局域网中的其他IP

foreach ($aIp as $ipv) {
    if (strpos($ipv, '接口') !== false) {//一下显示的IP是否是当前局域网中的 而不是其他的类型 可以在cmd下试一下命令
        $bool = false;
        preg_match('/(?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/', $ipv, $arr);
        if (strcmp($arr[0], $bIp) == 0) {
            $bool = true;
        }

    } else {
        if ($bool) {

            $str = preg_replace('/\s+/', '|', $ipv);
            $sArr = explode('|', $str);
            if ($sArr[1] == 'Internet' || empty($sArr[1])) {
                continue;
            }
            //去除默认网关
            if (strcmp($mask . ".1", $sArr[1]) == 0) {
                continue;
            }
            //去除同网关下255的IP
            if (strcmp($mask . ".255", $sArr[1]) == 0) {
                continue;
            }
            //去除组播IP
            list($cIp) = explode('.', $sArr[1]);
            if ($cIp >= 224 && $cIp <= 239) {
                continue;
            }
            echo "IP地址：|", $sArr[1], "|\n";
            echo "MAC地址：", $sArr[2], "\n";
            echo "主机名：", gethostbyaddr($sArr[1]), "\n";
            echo "\n\n";
        }
    }
}
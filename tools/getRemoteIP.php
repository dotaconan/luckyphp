<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2015/8/22
 * Time: 0:06
 */
@exec("arp -a",$array); //ִ��arp -a�������ŵ�����$array��
foreach($array as $value){
//ƥ�����ŵ�����$mac_array
    if(strpos($value,$_SERVER["REMOTE_ADDR"]) && preg_match("/(:?[0-9A-F]{2}[:-]){5}[0-9A-F]{2}/i",$value,$mac_array)){
        $mac = $mac_array[0];
        break;
    }
}
echo $mac;
echo PHP_OS;
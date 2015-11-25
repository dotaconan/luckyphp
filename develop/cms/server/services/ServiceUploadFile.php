<?php
/**
 * ServiceUploadFile
 * 独立多线程上传组件！
 * Created by PhpStorm.
 * User: 14080226
 * Date: 2015/10/27
 * Time: 14:03
 */


$dirCurrent = dirname(__FILE__);
$dirService = dirname($dirCurrent);
$dirServer = dirname($dirService);

$fileTemp = str_replace($dirServer, "", $dirCurrent);
$file = str_replace("\\", "/", $fileTemp);

header('content-type:application/json;charset=utf8');
$actionType = isset($_REQUEST["actionType"]) ? $_REQUEST["actionType"] : "";
switch ($actionType) {
    case "getUploadFileList":
        getUploadFileList();
        break;
    case "getUploadFileStatus":
        getUploadFileStatus();
        break;
    case "postUploadFile":
        postUploadFile();
        break;
    default;
        echo "break";
        break;
}

//上传文件
function postUploadFile()
{
    function _get($str)
    {
        $val = !empty($_GET[$str]) ? $_GET[$str] : null;
        return $val;
    }

    $guid = isset($_POST["APC_UPLOAD_PROGRESS"]) ? $_POST["APC_UPLOAD_PROGRESS"] : "";

    //配置文件，是否覆盖文件
    $overwrite = true;

    $uploadfileResponse = new ServiceUploadFileInfo();
    //1.判定是否含有上传文件
    if (isset($_FILES["uploadFile"])) {
        $uploadfile = $_FILES["uploadFile"];
        if (isset($uploadfile["name"])) {

            $filename = $_FILES["uploadFile"]["name"];
            $tmp_name = $_FILES['uploadFile']['tmp_name'];
            $error = $_FILES['uploadFile']['error'];

            if (!empty($filename)) {

                $uploadfileResponse->filename = $uploadfile['name'];       //文件名
                $uploadfileResponse->filetype = $uploadfile['type'];       //文件类型
                $uploadfileResponse->filesize = $uploadfile['size'];       //文件大小

                $dirCurrent = dirname(__FILE__);
                $dirService = dirname($dirCurrent);
                $dirServer = dirname($dirService);


                $destination_folder = $dirServer . '\\tmpuploads\\';

                //创建上传文件根目录文件夹
                if (!file_exists($destination_folder)) {
                    mkdir($destination_folder);
                }
                //获取当前年月,如 2015-01-01
                $dateFolder = date("Y-m-d");
                $destination_folder_date = $destination_folder . $dateFolder;
                //创建月份文件夹
                if (!file_exists($destination_folder_date)) {
                    mkdir($destination_folder_date);
                }
                $pinfo = pathinfo($filename);
                $ftype = $pinfo['extension'];
                $sysfilename = date("YmdHis") . "." . $ftype;
                $destination = $destination_folder_date . "/" . $sysfilename;

                //防止重复上传
                if (file_exists($destination) && $overwrite != true) {
                    //echo $destination . " already exists. ";
                    $uploadfileResponse->status = "OK";
                    $uploadfileResponse->actionType = "ADD";
                    $resultMsg = '不能重复上传';
                    $resultStatus = "error";
                    $uploadfileResponse->resultStatus = $resultStatus;
                    $uploadfileResponse->resultMsg = $resultMsg;
                    $uploadfileResponse->servertime = date("Y-m-d H:i:s");
                    print(json_encode($uploadfileResponse));
                    exit ();
                }
                //
                //session_start();
                //$guid = \app\Guid::create_guid();
                //$_SESSION["uploadFile"] = $guid;


                $uploadfileResponse->status = "OK";
                $uploadfileResponse->actionType = "ADD";
                $uploadfileResponse->resultStatus = '开始上传！';
                $uploadfileResponse->resultMsg = "error";
                //$uploadfileResponse->sessionGuid = $_SESSION["uploadFile"];
                $uploadfileResponse->guid = $guid;
                $uploadfileResponse->servertime = date("Y-m-d H:i:s");
                print(json_encode($uploadfileResponse));


                //处理上传不管，另一个进程监听
                if (move_uploaded_file($tmp_name, $destination)) {
                    //echo 'Uploaded';
                    apc_delete("upload_" . $guid);
                }

            } else {
                echo 'please choose a file';
            }
        }
    } else {
        $uploadfileResponse->status = "OK";
        $uploadfileResponse->actionType = "ADD";
        $uploadfileResponse->resultStatus = '上传文件为空！';
        $uploadfileResponse->resultMsg = "error";
        $uploadfileResponse->servertime = date("Y-m-d H:i:s");
        print(json_encode($uploadfileResponse));
        exit();
    }
}

//获取文件状态
function getUploadFileStatus()
{
    $uploadfileResponse = new ServiceUploadFileInfo();
    $uploadfileGuid = isset($_REQUEST["uploadfileGuid"]) ? $_REQUEST["uploadfileGuid"] : "";

    if ($uploadfileGuid != "") {
        $status = apc_fetch('upload_' . $uploadfileGuid);
        if ($status['total'] != 0 && !empty($status['total'])) {
            /*$json = array(
                'per'=> $status['current']/$status['total']*100,
                'total'=> round($status['total']/1024),
                'current'=> round($status['current']/1024),
            );
            echo json_encode($json);      */

            $uploadfileResponse->status = "OK";
            $uploadfileResponse->actionType = "ADD";
            $uploadfileResponse->resultStatus = 'success';
            //当前传递的GUID

            $uploadfileResponse->sessionUploadFile = $uploadfileGuid;
            $uploadfileResponse->resultMsg = "success";
            $uploadfileResponse->servertime = date("Y-m-d H:i:s");
            $uploadfileResponse->per = $status['current'] / $status['total'] * 100;
            $uploadfileResponse->total = round($status['total'] / 1024);
            $uploadfileResponse->current = round($status['current'] / 1024);

            print(json_encode($uploadfileResponse));
            exit;
        } else {
            $uploadfileResponse->status = "OK";
            $uploadfileResponse->actionType = "ADD";
            $uploadfileResponse->resultStatus = 'error';
            $uploadfileResponse->serverMessage = '暂无数据';
            $uploadfileResponse->guid = $uploadfileGuid;
            $uploadfileResponse->per = 0;
            $uploadfileResponse->total = 0;
            $uploadfileResponse->current = 0;
            print(json_encode($uploadfileResponse));
            exit;
        }

    }
}

//获取文件列表
function getUploadFileList()
{
    $dir = isset($_REQUEST["dir"]) ? $_REQUEST["dir"] : "";
    $uploadfileResponse = new ServiceUploadFileInfo();

    $dirCurrent = dirname(__FILE__);
    $dirService = dirname($dirCurrent);
    $dirServer = dirname($dirService);
    $destination_folder = $dirServer . '\\tmpuploads\\';
    //创建uploads上传文件根目录文件夹
    if (!file_exists($destination_folder)) {
        mkdir($destination_folder);
    }

    if ($dir != "") {
        $destination_folder = $destination_folder . $dir;
    }


    $resultFileList = Array();

    if (is_dir($destination_folder)) {
        if ($dh = opendir($destination_folder)) {
            while (($filename = readdir($dh)) !== false) {
                if ($filename == ".") {
                    continue;
                }
                if ($filename == "..") {
                    continue;
                };
                $pinfo = pathinfo($filename);

//                $ftype = $pinfo['extension'];

                //是否为文件夹
                $finalPath = $destination_folder . "\\" . $filename;
                $isdir = is_dir($finalPath);
                //目前都是文件下载
                //下载文件
                if (!$isdir) {
                    $fileObj = array(
                        'fileinfo' => $pinfo,
                        'filename' => $filename,
                        'directory' => $dir,
                        'filemtime' => date("Y-m-d H:i:s", filemtime($finalPath)),// 返回文件上次被修改的时间
                        'isdir' => $isdir ? "1" : "0"
                    );
                } else {
                    //文件夹
                    $fileObj = array(
                        'fileinfo' => $pinfo,
                        'filename' => $filename,
                        'filemtime' => date("Y-m-d H:i:s", filemtime($finalPath)),// 返回文件上次被修改的时间
                        'isdir' => $isdir ? "1" : "0",
                        'downloadPath' => $destination_folder . "/" . $filename
                    );
                }

                array_push($resultFileList, $fileObj);


                //echo "filename: $file : filetype: " . filetype($destination_folder . $file) . "<br>";
            }
            closedir($dh);
        }
    }

    $uploadfileResponse->status = "OK";
    $uploadfileResponse->actionType = "GET";
    $uploadfileResponse->actionName = "getUploadFileList";
    $uploadfileResponse->resultStatus = 'success';
    $uploadfileResponse->rows = $resultFileList;
    print(json_encode($uploadfileResponse));
}

class ServiceUploadFileInfo
{
    public function __construct()
    {
    }

    public function __clone()
    {
    }

}
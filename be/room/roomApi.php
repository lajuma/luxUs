<?php

session_start();

require_once 'roomLogic.php';
require_once 'roomDB.php';
require_once '../connectDB.php';


if (isset($_POST['method'])) {
    switch ($_POST['method']) {
      case 'readAll':
         if (isset($_SESSION['uid'])) {
            $id = (int) $_SESSION['uid'];
            if ($_SESSION['isAdmin'] === 1) {
               $data = readAllRoomData();
            } else {
               $data = readAllRoomDataOnPermission($id);
            }
            $json = json_encode($data);
            echo $json;
         }
         break;

         case 'readTypes':
            if ($_SESSION['isAdmin'] === 1) {
                $data = readAllRoomTypesData();
                $json = json_encode($data);
                echo $json;
            } else {
                echo null;
            }
            break;

         case 'create':
             if ($_SESSION['isAdmin'] === 1) {
                 if (isset($_POST['name']) && isset($_POST['type'])) {
                    $name = htmlspecialchars(trim($_POST['name']));
                    $type = htmlspecialchars(trim($_POST['type']));
                    $data = saveRoomData($name, $type);
                    echo $data;
                 } else {
                    echo false;
                 }
             }
             break;

        case 'update':
            if ($_SESSION['isAdmin'] === 1) {
                if (isset($_POST['id']) && isset($_POST['name']) && isset($_POST['type'])) {
                    $id = (int) $_POST['id'];
                    $name = htmlspecialchars(trim($_POST['name']));
                    $type = htmlspecialchars(trim($_POST['type']));
                    $data = changeRoomData($id, $name, $type);
                    echo $data;
                } else {
                    echo false;
                }
            }
            break;

        case 'delete':
            if ($_SESSION['isAdmin'] === 1) {
                if (isset($_POST['id'])) {
                    $id = (int) $_POST['id'];
                    $data = deleteRoomData($id);
                    echo $data;
                } else {
                    echo false;
                }
            }
            break;

        default:
            echo "Chosen method is not available!";
            break;
    }
}

?>

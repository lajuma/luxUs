<?php

session_start();

require_once 'permissionLogic.php';
require_once 'permissionDB.php';
require_once '../connectDB.php';


if (isset($_POST['method'])) {
    switch ($_POST['method']) {

         case 'readForUser':
             if ($_SESSION['isAdmin'] === 1 && isset($_POST['id'])) {
                 $id = (int) $_POST['id'];
                 $data = readPermissionForUser($id);
                 $json = json_encode($data);
                 echo $json;
             } else {
                 echo null;
             }
             break;

         case 'readForUserForChange':
              if ($_SESSION['isAdmin'] === 1 && isset($_POST['id'])) {
                 $id = (int) $_POST['id'];
                 $data = readPermissionForUserForChange($id);
                 $json = json_encode($data);
                 echo $json;
              } else {
                 echo null;
              }
              break;

          case 'changeForUser':
               if ($_SESSION['isAdmin'] === 1 && isset($_POST['id']) && isset($_POST['permissions'])) {
                   $id = (int) $_POST['id'];
                   $permissions = json_decode($_POST['permissions'], true); // decodes json from frontend
                   $data = changePermissionForUser($id, $permissions);
                   echo $data;
               } else {
                   echo false;
               }
               break;

         case 'readForRoom':
             if ($_SESSION['isAdmin'] === 1 && isset($_POST['id'])) {
                 $id = (int) $_POST['id'];
                 $data = readPermissionForRoom($id);
                 $json = json_encode($data);
                 echo $json;
             } else {
                 echo null;
             }
             break;

        case 'readForRoomForChange':
            if ($_SESSION['isAdmin'] === 1 && isset($_POST['id'])) {
                $id = (int) $_POST['id'];
                $data = readPermissionForRoomForChange($id);
                $json = json_encode($data);
                echo $json;
            } else {
                echo null;
            }
            break;

        case 'changeForRoom':
            if ($_SESSION['isAdmin'] === 1 && isset($_POST['id']) && isset($_POST['permissions'])) {
                $rid = (int) $_POST['id'];
                $permissions = json_decode($_POST['permissions'], true); // decodes json from frontend
                $data = changePermissionForRoom($rid, $permissions);
                echo $data;
            } else {
                echo false;
            }
            break;

        default:
            echo "Chosen method is not available!";
            break;
    }
}

?>

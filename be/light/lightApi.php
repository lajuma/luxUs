<?php

session_start();

require_once 'lightLogic.php';
require_once 'lightDB.php';
require_once '../connectDB.php';

if (isset($_POST['method'])) {
    switch ($_POST['method']) {
         case 'readAll':
            if (isset($_POST['id'])) {
               $id = (int) $_POST['id'];
               $data = getAllLightData($id);
               $json = json_encode($data);
               echo $json;
         } else {
             echo null;
         }
             break;

        case 'change':
              if (isset($_POST['id'])) {
               $id = (int) $_POST['id'];
               $data = changeLightStatus($id);
               echo $data;
             } else {
               echo false;
             }
             break;

            case 'create':
               if ($_SESSION['isAdmin'] === 1) {
                   if (isset($_POST['name']) && isset($_POST['rid'])) {
                       $name = htmlspecialchars(trim($_POST['name']));
                       $rid = (int) $_POST['rid'];
                       $data = saveLightData($name, $rid);
                       echo $data;
                   } else {
                       echo false;
                   }
               }
               break;

        case 'update':
            if ($_SESSION['isAdmin'] === 1) {
                if (isset($_POST['id']) && isset($_POST['name'])) {
                    $id = (int) $_POST['id'];
                    $name = htmlspecialchars(trim($_POST['name']));
                    $data = changeLightData($id, $name);
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
                    $data = deleteLightData($id);
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

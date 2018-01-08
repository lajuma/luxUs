<?php

session_start();

require_once 'userLogic.php';
require_once 'userDB.php';
require_once '../connectDB.php';



if (isset($_POST['method'])) {
    switch ($_POST['method']) {

        case 'checkLoginStatus':
            if (isset($_COOKIE['auth']) && $_COOKIE['auth'] != '') {
                $data = checkLoginStatus();
                $json = json_encode($data);
                echo $json;
            } else {
                echo null;
            }
            break;

        case 'read':
            if (isset($_POST['name']) && isset($_POST['pass'])) {
                $name = htmlspecialchars(trim($_POST['name']));
                $pass = $_POST['pass'];
                $data = readUserLoginData($name, $pass);
                $json = json_encode($data);
                echo $json;
            } else {
                echo null;
            }
            break;

        case 'readAll':
            if ($_SESSION['isAdmin'] === 1) {
                $data = readAllUserData();
                $json = json_encode($data);
                echo $json;
            } else {
                echo null;
            }
            break;

        case 'create':
            if ($_SESSION['isAdmin'] === 1) {
                if (isset($_POST['name'])
                    && isset($_POST['pass'])
                    && $_POST['pass'] !== ''
                    && isset($_POST['isAdmin'])
                    ) {
                    $name = htmlspecialchars(trim($_POST['name']));
                    $pass = $_POST['pass'];
                    $isAdmin = (int) $_POST['isAdmin'];
                    $data = saveUserData($name, $pass, $isAdmin);
                    echo $data;
                } else {
                    echo false;
                }
            }
            break;

        case 'update':
            if ($_SESSION['isAdmin'] === 1) {
                if (isset($_POST['name'])
                && isset($_POST['pass'])
                && $_POST['pass'] !== ''
                && isset($_POST['id'])
                && isset($_POST['isAdmin'])
                ) {
                    $id = (int) $_POST['id'];
                    $name = htmlspecialchars(trim($_POST['name']));
                    $pass = $_POST['pass'];
                    $isAdmin = (int) $_POST['isAdmin'];
                    $data = changeUserData($id, $name, $pass, $isAdmin);
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
                    $data = deleteUserData($id);
                    echo $data;
                } else {
                    echo false;
                }
            }
            break;

        case 'logout':
            if ($_SESSION['uid'] !== '') {
                logoutSession();
                echo true;
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

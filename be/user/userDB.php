<?php

/*-------------------------------------------------
	   Login / Logout / Cookie
-------------------------------------------------*/

function getCookieData($identifier)
{
    $db = connect();
    $query = $db->prepare('SELECT * FROM user WHERE identifier = ?');
    $query->bind_param('s', $identifier);
    $query->execute();
    $result = $query->get_result();
    if ($result && $result->num_rows > 0) {
        return $result;
    } else {
        return null;
    }
}


function updateCookieData($name, $token, $timeout)
{
    $db = connect();
    $query = $db->prepare('UPDATE user SET token = ?, timeout = ? WHERE name = ?');
    $query->bind_param('sis', $token, $timeout, $name);
    $result = $query->execute();
    if (!$result) {
        die('Invalid query: ' . mysql_error());
    }
}


function loadUserLoginData($name)
{
    $db = connect();
    $query = $db->prepare('SELECT * FROM user WHERE name = ?');
    $query->bind_param('s', $name);
    $query->execute();
    $result = $query->get_result();
    if ($result && $result->num_rows === 1) {
        return $result;
    } else {
        return null;
    }
}


/*-------------------------------------------------
	   Rooms Management  //  Admin Section
-------------------------------------------------*/

function loadAllUserData()
{
    $db = connect();
    $query = 'SELECT uid, name, isAdmin FROM user';
    $result = $db->query($query);
    if ($result && $result->num_rows > 0) {
        return $result;
    } else {
        return null;
    }
}


function addUserDataToDatabase($name, $hash, $isAdmin, $identifier)
{
    $db = connect();
    $query = $db->prepare('INSERT INTO user (name, pass, isAdmin, identifier) VALUES (?, ?, ?, ?)');
    $query->bind_param('ssis', $name, $hash, $isAdmin, $identifier);
    $result = $query->execute();
    if ($result) {
        return true;
    } else {
        return false;
    }
}


function changeUserDataInDatabase($id, $name, $hash, $isAdmin, $identifier)
{
    $db = connect();
    $query = $db->prepare('UPDATE user SET name = ?, pass = ?, isAdmin = ?, identifier = ? WHERE uid = ?');
    $query->bind_param('ssisi', $name, $hash, $isAdmin, $identifier, $id);
    $result = $query->execute();
    if ($result) {
        return true;
    } else {
        return false;
    }
}


function changeUserDataInDatabaseNoPass($id, $name, $isAdmin, $identifier)
{
    $db = connect();
    $query = $db->prepare('UPDATE user SET name = ?, isAdmin = ?, identifier = ? WHERE uid = ?');
    $query->bind_param('sisi', $name, $isAdmin, $identifier, $id);
    $result = $query->execute();
    if ($result) {
        return true;
    } else {
        return false;
    }
}


function deleteUserDataFromDatabase($id)
{
    $db = connect();
    $query = $db->prepare('DELETE FROM user WHERE uid = ?');
    $query->bind_param('i', $id);
    $result = $query->execute();
    if ($result) {
        return true;
    } else {
        return false;
    }
}


function deleteAdminFromPermissionDatabase($id)
{
   $db = connect();
   $query = $db->prepare('DELETE FROM room_user WHERE uid = ?');
   $query->bind_param('i', $id);
   $result = $query->execute();
   if ($result) {
      return true;
   } else {
      return false;
   }
}

?>

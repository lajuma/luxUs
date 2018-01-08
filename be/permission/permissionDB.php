<?php

/*-----------------------------------------------------
	   Permission Management  //  Admin Section
-----------------------------------------------------*/

function checkIfUserIsAdmin($id)
{
   $db = connect();
   $query = $db->prepare('SELECT * FROM user WHERE uid = ? AND isAdmin = 1');
   $query->bind_param('i', $id);
   $query->execute();
   $result = $query->get_result();
   if ($result && $result->num_rows > 0) {
      return true;
   } else {
      return false;
   }
}


function changeAdminStatus($id, $status)
{
    $db = connect();
    $query = $db->prepare('UPDATE user SET isAdmin = ? WHERE uid = ?');
    $query->bind_param('ii', $status, $id);
    $result = $query->execute();
    if ($result) {
        return true;
    } else {
        return false;
    }
}


function checkIfUserIsInDatabase($rid, $uid)
{
    $db = connect();
    $query = $db->prepare('SELECT * FROM room_user WHERE rid = ? AND uid = ?');
    $query->bind_param('ii', $rid, $uid);
    $query->execute();
    $result = $query->get_result();
    if ($result && $result->num_rows > 0) {
        return true;
    } else {
        return false;
    }
}


function addUserToPermissionDatabase($rid, $uid)
{
    $db = connect();
    $query = $db->prepare('INSERT INTO room_user (rid, uid) VALUES (?, ?)');
    $query->bind_param('ii', $rid, $uid);
    $result = $query->execute();
    if ($result) {
        return true;
    } else {
        return false;
    }
}


function deleteUserFromPermissionDatabase($rid, $uid)
{
    $db = connect();
    $query = $db->prepare('DELETE FROM room_user WHERE rid = ? AND uid = ?');
    $query->bind_param('ii', $rid, $uid);
    $result = $query->execute();
    if ($result) {
        return true;
    } else {
        return false;
    }
}


function loadPermissionDataForUser($id)
{
   $db = connect();
   $query = $db->prepare('SELECT DISTINCT r.rid, r.name FROM room r LEFT JOIN room_user ru ON r.rid = ru.rid LEFT JOIN user u ON ru.uid = u.uid WHERE u.uid = ?');
   $query->bind_param('i', $id);
   $query->execute();
   $result = $query->get_result();
   if ($result && $result->num_rows > 0) {
      return $result;
   } else {
      return null;
   }
}


function loadPermissionDataForUserForChange($id)
{
   $db = connect();
   $query = $db->prepare('SELECT r.rid, r.name, ru.uid AS hasAccess FROM room r LEFT JOIN room_user ru ON r.rid = ru.rid ORDER BY r.rid ASC, ru.uid < ?, ru.uid ASC');
   $query->bind_param('i', $id);
   $query->execute();
   $result = $query->get_result();
   if ($result && $result->num_rows > 0) {
      return $result;
   } else {
      return null;
   }
}


function loadPermissionDataForRoom($id)
{
    $db = connect();
    $query = $db->prepare('SELECT DISTINCT u.name FROM user u LEFT JOIN room_user ru ON u.uid = ru.uid WHERE u.isAdmin = 1 OR ru.rid = ? ORDER BY u.isAdmin DESC');
    $query->bind_param('i', $id);
    $query->execute();
    $result = $query->get_result(); // returns the 'result set'-object
    if ($result && $result->num_rows > 0) {
        return $result;
    } else {
        return null;
    }
}


function loadPermissionDataForRoomForChange($id)
{
    $db = connect();
    $query = $db->prepare('SELECT DISTINCT u.uid, u.name, u.isAdmin, ru.rid FROM user u LEFT JOIN room_user ru ON u.uid = ru.uid ORDER BY u.isAdmin DESC, u.uid ASC, ru.rid < ?, ru.rid ASC');
    $query->bind_param('i', $id);
    $query->execute();
    $result = $query->get_result();
    if ($result && $result->num_rows > 0) {
        return $result;
    } else {
        return null;
    }
}

?>

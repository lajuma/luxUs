<?php

/*-------------------------------------------------
	   Rooms Overview  //  User Section
-------------------------------------------------*/

function loadAllRoomData()
{
    $db = connect();
    $query = 'SELECT r.rid, r.name, count(l.lid) AS lights, t.name AS type FROM room r LEFT JOIN light l ON l.rid = r.rid LEFT JOIN roomtype t ON r.tid = t.tid GROUP BY r.rid';
    $result = $db->query($query);
    if ($result && $result->num_rows > 0) {
        return $result;
    } else {
        return null;
    }
}


function loadAllRoomDataOnPermission($id)
{
   $db = connect();
   $query = $db->prepare('SELECT r.rid, r.name, t.name AS type FROM room r LEFT JOIN roomtype t ON r.tid = t.tid JOIN room_user ru ON r.rid = ru.rid WHERE ru.uid = ?');
   $query->bind_param('i', $id);
   $query->execute();
   $result = $query->get_result();
   if ($result && $result->num_rows > 0) {
      return $result;
   } else {
      return null;
   }
}


function loadAllRoomTypesData()
{
   $db = connect();
   $query = 'SELECT * FROM roomtype';
   $result = $db->query($query);
   if ($result && $result->num_rows > 0) {
      return $result;
   } else {
      return null;
   }
}


function getRoomTypeId($type)
{
   $db = connect();
   $query = $db->prepare('SELECT tid FROM roomtype WHERE name = ?');
   $query->bind_param('s', $type);
   $query->execute();
   $result = $query->get_result();
   if ($result && $result->num_rows == 1) {
      return $result;
   } else {
      return null;
   }
}


/*-------------------------------------------------
	   Rooms Management  //  Admin Section
-------------------------------------------------*/

function addRoomDataToDatabase($name, $tid)
{
    $db = connect();
    $query = $db->prepare('INSERT INTO room (name, tid) VALUES (?, ?)');
    $query->bind_param('si', $name, $tid);
    $result = $query->execute();
    if ($result) {
        return true;
    } else {
        return false;
    }
}


function changeRoomDataInDatabase($id, $name, $tid)
{
    $db = connect();
    $query = $db->prepare('UPDATE room SET name = ?, tid = ? WHERE rid = ?');
    $query->bind_param('sii', $name, $tid, $id);
    $result = $query->execute();
    if ($result) {
        return true;
    } else {
        return false;
    }
}


function deleteRoomDataFromDatabase($id)
{
    $db = connect();
    $query = $db->prepare('DELETE FROM room WHERE rid = ?');
    $query->bind_param('i', $id);
    $result = $query->execute();
    if ($result) {
        return true;
    } else {
        return false;
    }
}

?>

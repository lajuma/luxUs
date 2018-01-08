<?php

/*-------------------------------------------------
	   Lights Overview  //  User Section
-------------------------------------------------*/

function loadAllLightData($id)
{
   $db = connect();
   $query = $db->prepare('SELECT lid, name, status FROM light WHERE rid = ?');
   $query->bind_param('i', $id);
   $query->execute();
   $result = $query->get_result();
   if ($result && $result->num_rows > 0) {
      return $result;
   } else {
      return null;
   }
}


function loadSingleLightStatus($id)
{
   $db = connect();
   $query = $db->prepare('SELECT status FROM light WHERE lid = ?');
   $query->bind_param('i', $id);
   $query->execute();
   $result = $query->get_result();
   if ($result) {
      return $result;
   } else {
      return null;
   }
}


function changeLightStatusInDatabase($id, $status)
{
   $db = connect();
   $query = $db->prepare('UPDATE light SET status = ? WHERE lid = ?');
   $query->bind_param('ii', $status, $id);
   $result = $query->execute();
   if ($result) {
      return true;
   } else {
      return false;
   }
}


/*-------------------------------------------------
	   Lights Management  //  Admin Section
-------------------------------------------------*/

function addLightDataToDatabase($name, $rid)
{
    $db = connect();
    $query = $db->prepare('INSERT INTO light (name, status, rid) VALUES (?, 0, ?)');
    $query->bind_param('si', $name, $rid);
    $result = $query->execute();
    if ($result) {
        return true;
    } else {
        return false;
    }
}


function changeLightDataInDatabase($id, $name)
{
    $db = connect();
    $query = $db->prepare('UPDATE light SET name = ? WHERE lid = ?');
    $query->bind_param('si', $name, $id);
    $result = $query->execute();
    if ($result) {
        return true;
    } else {
        return false;
    }
}


function deleteLightDataFromDatabase($id)
{
    $db = connect();
    $query = $db->prepare('DELETE FROM light WHERE lid = ?');
    $query->bind_param('i', $id);
    $result = $query->execute();
    if ($result) {
        return true;
    } else {
        return false;
    }
}

?>

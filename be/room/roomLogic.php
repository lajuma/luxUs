<?php

/*-------------------------------------------------
	   Rooms Overview  //  User Section
-------------------------------------------------*/

function readAllRoomData()
{
    $result = loadAllRoomData();
    if ($result == null) {
        return null;
    } else {
        $data = $result->fetch_all(MYSQLI_ASSOC);
        return $data;
    }
}


function readAllRoomDataOnPermission($id)
{
   $result = loadAllRoomDataOnPermission($id);
   if ($result == null) {
      return null;
   } else {
      $data = $result->fetch_all(MYSQLI_ASSOC);
      return $data;
   }
}


function readAllRoomTypesData()
{
   $result = loadAllRoomTypesData();
   if ($result == null) {
      return null;
   } else {
      $data = $result->fetch_all(MYSQLI_ASSOC);
      return $data;
   }
}


/*-------------------------------------------------
	   Rooms Management  //  Admin Section
-------------------------------------------------*/

function saveRoomData($name, $type)
{
   $result = getRoomTypeId($type);

   if ($result == null) {
      $tid = 0;
   } else {
      $data = $result->fetch_assoc();
      $tid = $data['tid'];
   }
   $result = addRoomDataToDatabase($name, $tid);
    if (!$result) {
        return false;
    } else {
        return true;
    }
}


function changeRoomData($id, $name, $type)
{
   $result = getRoomTypeId($type);
   if ($result == null) {
      $tid = 0;
   } else {
      $data = $result->fetch_assoc();
      $tid = $data['tid'];
   }
    $result = changeRoomDataInDatabase($id, $name, $tid);
    if (!$result) {
        return false;
    } else {
        return true;
    }
}


function deleteRoomData($id)
{
    if ($id !== 0) {
                $result = deleteRoomDataFromDatabase($id);
            if (!$result) {
                return false;
            } else {
                return true;
            }
    }
    return false;
}

?>

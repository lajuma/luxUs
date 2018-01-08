<?php

/*-----------------------------------------------------
	   Permissions @ User Management  //  Admin Section
-----------------------------------------------------*/

function readPermissionForUser($id)
{
   $result = loadPermissionDataForUser($id);
   if ($result == null) {
      return null;
   } else {
      $data = $result->fetch_all(MYSQLI_ASSOC);
      return $data;
   }
}


function readPermissionForUserForChange($id)
{
   $isAdmin = checkIfUserIsAdmin($id);
   if ($isAdmin) {
      changeAdminStatus($id, 0);
   }
   $result = loadPermissionDataForUserForChange($id);

   if ($result == null) {
      return null;
   } else {
      $data = $result->fetch_all(MYSQLI_ASSOC);

      // changes hasAccess to 0 or 1
      for ($i = 0; $i < count($data); $i++) {
         if ($data[$i]['hasAccess'] == $id) {
            $data[$i]['hasAccess'] = 1;
         } else {
            $data[$i]['hasAccess'] = 0;
         }
         if ($isAdmin) {
            $data[$i]['hasAccess'] = 0;   // if isAdmin, rooms have to be newly selected
         }
      }

      // sorts out double values
      $temp = 0;
      $array = [];

      for ($i = 0; $i < count($data); $i++) {
         if ($data[$i]['rid'] !== $temp) {
            array_push($array, $data[$i]);
            $temp = $data[$i]['rid'];
         }
      }
      return $array;
   }
}


function changePermissionForUser($id, $permissions)
{
   $result = true;   // will be changed to false if any db-call fails

    for ($i = 0; $i < count($permissions); $i++) {

         $rid = $permissions[$i]['rid'];
         $permission = $permissions[$i]['permission'];

         $isInDB = checkIfUserIsInDatabase($rid, $id);

         if ($isInDB && $permission === 0) { // if user is in db but should NOT be!
             $result = deleteUserFromPermissionDatabase($rid, $id);
             if ($result == false) {
                break;
             }
         }
         if (!$isInDB && $permission === 1) {  // if user is NOT in db but should be!
            $result = addUserToPermissionDatabase($rid, $id);
            if ($result == false) {
               break;
            }
         }
     }
    return $result;
}


/*-----------------------------------------------------
	   Permissions @ Room Management  //  Admin Section
-----------------------------------------------------*/

function readPermissionForRoom($id)
{
    $result = loadPermissionDataForRoom($id);
    if ($result == null) {
        return null;
    } else {
        $data = $result->fetch_all(MYSQLI_ASSOC);
        return $data;
    }
}


function readPermissionForRoomForChange($id)
{
    $result = loadPermissionDataForRoomForChange($id);
    if ($result == null) {
        return null;
    } else {
        $data = $result->fetch_all(MYSQLI_ASSOC);

        // sorts out double values
        $temp = 0;
        $array = [];

        for ($i = 0; $i < count($data); $i++) {
           if ($data[$i]['uid'] !== $temp) {
             array_push($array, $data[$i]);
             $temp = $data[$i]['uid'];
           }
        }
        return $array;
    }
}


function changePermissionForRoom($rid, $permissions)
{
   $result = true;   // will be changed to false if any db-call fails

    for ($i = 0; $i < count($permissions); $i++) {

         $id = $permissions[$i]['uid'];
         $permission = $permissions[$i]['permission'];

         $isInDB = checkIfUserIsInDatabase($rid, $id);

         if ($isInDB && $permission === 0) { // if user is in db but should NOT be!
             $result = deleteUserFromPermissionDatabase($rid, $id);
             if ($result == false) {
                break;
             }
         }
         if (!$isInDB && $permission === 1) {  // if user is NOT in db but should be!
            $result = addUserToPermissionDatabase($rid, $id);
            if ($result == false) {
               break;
            }
         }
     }
    return $result;
}

?>

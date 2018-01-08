<?php

/*-------------------------------------------------
	   Lights Overview  //  User Section
-------------------------------------------------*/

   function getAllLightData($id) {
          $result = loadAllLightData($id);
          if ($result == null) {
              return null;
          } else {
              $data = $result->fetch_all(MYSQLI_ASSOC);
              return $data;
          }
   }


   function changeLightStatus($id) {
      $status = loadSingleLightStatus($id);
      $currentStatus = $status->fetch_row();
      if ($currentStatus[0] === 1) {
         $newStatus = 0;
      } else {
         $newStatus = 1;
      }
      $result = changeLightStatusInDatabase($id, $newStatus);
      if ($result) {
         return true;
      } else {
         return false;
      }
   }


/*-------------------------------------------------
	   Lights Management  //  Admin Section
-------------------------------------------------*/

function saveLightData($name, $rid)
{
    $result = addLightDataToDatabase($name, $rid);
    if (!$result) {
        return false;
    } else {
        return true;
    }
}


function changeLightData($id, $name)
{
    $result = changeLightDataInDatabase($id, $name);
    if (!$result) {
        return false;
    } else {
        return true;
    }
}


function deleteLightData($id)
{
    if ($id !== 0) {
                $result = deleteLightDataFromDatabase($id);
            if (!$result) {
                return false;
            } else {
                return true;
            }
    }
    return false;
}

?>

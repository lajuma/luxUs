<?php

/*-------------------------------------------------
	  Database Connection
     database = luxus
     tables: user, room, room_user, roomtype, light
-------------------------------------------------*/

function connect()
{
    $db_host = 'localhost';
    $db_user = 'beb';
    $db_pass = 'beb';
    $db_name = 'luxus';
    $db = new mysqli($db_host, $db_user, $db_pass, $db_name);
    if ($db->connect_error) {
        die("Connection failed: " . $db->connect_error);
    }
    return $db;
}

?>

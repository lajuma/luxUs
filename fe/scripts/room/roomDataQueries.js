"use strict";

let roomUrl = 'http://127.0.0.1/luxus/be/room/';

/*-------------------------------------------------
	   Room Overview  //  User Section
-------------------------------------------------*/

function loadAllRoomData(onSuccess) {
    $.ajax({
        url: roomUrl + 'roomApi.php',
        method: 'post',
        dataType: 'json',
        data: {
            method: 'readAll'
        },
        cache: false,
        success: onSuccess,
        error: function (xhr, status, error) {
            alert("Could not get all room data!\nreadyState: " + xhr.readyState +
                "\nstatus: " + xhr.status + " - " + xhr.statusText +
                "\n" + error);
        }
    });
}


 function loadRoomTypesData(onSuccess) {
     $.ajax({
         url: roomUrl + 'roomApi.php',
         method: 'post',
         dataType: 'json',
         data: {
             method: 'readTypes'
         },
         cache: false,
         success: onSuccess,
         error: function (xhr, status, error) {
             alert("Could not load room types!\nreadyState: " + xhr.readyState +
                 "\nstatus: " + xhr.status + " - " + xhr.statusText +
                 "\n" + error);
         }
     });
 }


 /*-------------------------------------------------
     Room Management  //  Admin Section
 -------------------------------------------------*/

 function loadSingleRoomData(name, onSuccess) {
     $.ajax({
         url: roomUrl + 'roomApi.php',
         method: 'post',
         dataType: 'json',
         data: {
             method: 'read',
             name: name
         },
         cache: false,
         success: onSuccess,
         error: function (xhr, status, error) {
             alert("Could not get this rooms data!\nreadyState: " + xhr.readyState +
                 "\nstatus: " + xhr.status + " - " + xhr.statusText +
                 "\n" + error);
         }
     });
 }


 function saveRoomData(name, type, onSuccess) {
     $.ajax({
         url: roomUrl + 'roomApi.php',
         method: 'post',
         data: {
             method: 'create',
             name: name,
             type: type
         },
         cache: false,
         success: onSuccess,
         error: function (xhr, status, error) {
             alert("Could not save new room!\nreadyState: " + xhr.readyState +
                 "\nstatus: " + xhr.status + " - " + xhr.statusText +
                 "\n" + error);
         }
     });
 }


 function changeRoomData(id, name, type, onSuccess) {
     $.ajax({
         url: roomUrl + 'roomApi.php',
         method: 'post',
         data: {
             method: 'update',
             id: id,
             name: name,
             type: type
         },
         cache: false,
         success: onSuccess,
         error: function (xhr, status, error) {
             alert("Could not change this rooms data!\nreadyState: " + xhr.readyState +
                 "\nstatus: " + xhr.status + " - " + xhr.statusText +
                 "\n" + error);
         }
     });
 }


function deleteRoomData(id, onSuccess) {
    $.ajax({
        url: roomUrl + 'roomApi.php',
        method: 'post',
        data: {
            method: 'delete',
            id: id
        },
        success: onSuccess,
        error: function (xhr, status, error) {
            alert("Could not delete this room!\nreadyState: " + xhr.readyState +
                "\nstatus: " + xhr.status + " - " + xhr.statusText +
                "\n" + error);
        }
    });
}

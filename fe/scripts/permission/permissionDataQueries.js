"use strict";

let permUrl = 'http://127.0.0.1/luxus/be/permission/';

/*-----------------------------------------------------
	   Permissions @ User Management  //  Admin Section
-----------------------------------------------------*/

function loadPermissionDataForUser(id, onSuccess) {
   $.ajax({
      url: permUrl + 'permissionApi.php',
      method: 'post',
      dataType: 'json',
      data: {
           method: 'readForUser',
           id: id
      },
      cache: false,
      success: onSuccess,
      error: function (xhr, status, error) {
           alert("Could not get this users access data!\nreadyState: " + xhr.readyState +
               "\nstatus: " + xhr.status + " - " + xhr.statusText +
               "\n" + error);
      }
   });
}


function loadPermissionDataForUserForChange(id, onSuccess) {
   $.ajax({
      url: permUrl + 'permissionApi.php',
      method: 'post',
      dataType: 'json',
      data: {
           method: 'readForUserForChange',
           id: id
      },
      cache: false,
      success: onSuccess,
      error: function (xhr, status, error) {
           alert("Could not get this users access data for change!\nreadyState: " + xhr.readyState +
               "\nstatus: " + xhr.status + " - " + xhr.statusText +
               "\n" + error);
      }
   });
}


function changePermissionDataForUser(id, permissions, onSuccess) {
   $.ajax({
      url: permUrl + 'permissionApi.php',
      method: 'post',
      dataType: 'json',
      data: {
           method: 'changeForUser',
           id: id,
           permissions: permissions
      },
      cache: false,
      success: onSuccess,
      error: function (xhr, status, error) {
           alert("Could not change this users access data!\nreadyState: " + xhr.readyState +
               "\nstatus: " + xhr.status + " - " + xhr.statusText +
               "\n" + error);
      }
   });
}


/*-----------------------------------------------------
	   Permissions @ Room Management  //  Admin Section
-----------------------------------------------------*/

function loadPermissionDataForRoom(id, onSuccess) {
    $.ajax({
        url: permUrl + 'permissionApi.php',
        method: 'post',
        dataType: 'json',
        data: {
            method: 'readForRoom',
            id: id
        },
        cache: false,
        success: onSuccess,
        error: function (xhr, status, error) {
            alert("Could not get this rooms permissions!\nreadyState: " + xhr.readyState +
                "\nstatus: " + xhr.status + " - " + xhr.statusText +
                "\n" + error);
        }
    });
}

function loadPermissionDataForRoomForChange(id, onSuccess) {
    $.ajax({
        url: permUrl + 'permissionApi.php',
        method: 'post',
        dataType: 'json',
        data: {
            method: 'readForRoomForChange',
            id: id
        },
        cache: false,
        success: onSuccess,
        error: function (xhr, status, error) {
            alert("Could not get this rooms permission data for change!\nreadyState: " + xhr.readyState +
                "\nstatus: " + xhr.status + " - " + xhr.statusText +
                "\n" + error);
        }
    });
}


function changePermissionDataForRoom(id, permissions, onSuccess) {
    $.ajax({
        url: permUrl + 'permissionApi.php',
        method: 'post',
        dataType: 'json',
        data: {
            method: 'changeForRoom',
            id: id,
            permissions: permissions
        },
        cache: false,
        success: onSuccess,
        error: function (xhr, status, error) {
            alert("Could not change this rooms permissions!\nreadyState: " + xhr.readyState +
                "\nstatus: " + xhr.status + " - " + xhr.statusText +
                "\n" + error);
        }
    });
}

"use strict";

/*--------------------------------------------------------------
	   Permissions @ User Management Section  //  Admin Section
--------------------------------------------------------------*/

function getPermissionDataForUser(uid) {
   loadPermissionDataForUser(uid, onLoadPermissionDataForUserSuccess);
}


function onLoadPermissionDataForUserSuccess(data) {
   if (data == null) {
      $('#permittedRoomsList').empty();
   } else {
      $('#permittedRoomsList').empty();
      data.forEach(function (val) {
           $('#permittedRoomsList').append('<li><button type="button" class="btn btn-xs btn-basic">' + val.name + '</button></li>');
      }, this);
   }
}


function openManagePermissionForUserModal() {
   // save already changed data temporarily
   uid = $('#changeUserId').val();
   name = $('#newUserName').val();
   pass = $('#newUserPass').val();
   isAdmin = 0;

   $('#roomAccessModal input').val('');
   $('#userDataModal').modal('hide');
   $('#roomAccessModalUserName').text(name);
   loadPermissionDataForUserForChange(uid, onLoadPermissionDataForUserForChangeSuccess);
   alertModalMessage('Select rooms to give access to this user.');
   $('#roomAccessModal').modal('show');
}


function onLoadPermissionDataForUserForChangeSuccess(data) {
   if (data == null) {
      $('#roomAccessList').empty();
   } else {
      $('#roomAccessList').empty();
      data.forEach(function (val) {
         if (val.hasAccess == 1) {
             $('#roomAccessList').append('<tr class="success"><td><input type="checkbox" checked></td><td>' + val.rid + '</td><td>' + val.name + '</td></tr>');
         } else {
             $('#roomAccessList').append('<tr><td><input type="checkbox"></td><td>' + val.rid + '</td><td>' + val.name + '</td></tr>');
         }
      }, this);
   }
}


function savePermissionDataForUser() {
   let list = [];
   let JSONList;
   let obj;
   let rid;
   let permission;

   $('#roomAccessList tr').each(function () {
      if ($(this).find('td:first input').prop("checked")) {
           permission = 1;
      } else {
           permission = 0;
      }

      rid = $(this).find('td:nth-child(2)').text();

      if (permission !== null) {
           obj = {
               rid: rid,
               permission: permission
           };
           list.push(obj);
      }
   });
   JSONList = JSON.stringify(list);
   changePermissionDataForUser(uid, JSONList, onChangePermissionDataForUserSuccess);
}


function onChangePermissionDataForUserSuccess(data) {
    $('#roomAccessModal').modal('hide');
    openUserDataModalForChange(uid, name, isAdmin);
    if (data) {
        alertModalMessage('Successfully changed room access for this user.', 'success');
    } else {
        alertModalMessage('Could not change room access data. Please try again!', 'error');
    }
}


/*-------------------------------------------------------------
	   Permission @ Room Management Section  //  Admin Section
-------------------------------------------------------------*/

function getPermissionDataForRoom(rid) {
   loadPermissionDataForRoom(rid, onLoadPermissionDataForRoomSuccess);
}


function onLoadPermissionDataForRoomSuccess(data) {
    if (data == null) {
        $('#permittedUsersList').empty();
    } else {
        $('#permittedUsersList').empty();
        data.forEach(function (val) {
            $('#permittedUsersList').append('<li><button type="button" class="btn btn-xs btn-basic">' + val.name + '</button></li>');
        }, this);
    }
}


function openManagePermissionForRoomModal() {
    $('#userPermissionsModal input').val('');
    $('#userPermissionsModalRoomName').text(rname);
    loadPermissionDataForRoomForChange(rid, onLoadPermissionDataForRoomForChangeSuccess);
    alertModalMessage('Select users to allow access to this room. Admins automatically have access to all rooms and do not need to be selected.');
    $('#userPermissionsModal').modal('show');
}


function onLoadPermissionDataForRoomForChangeSuccess(data) {
    if (data == null) {
        $('#userPermissionsList').empty();
    } else {
        $('#userPermissionsList').empty();
        data.forEach(function (val) {
            if (val.isAdmin == 1) {
                $('#userPermissionsList').append('<tr class="info"><td><input type="checkbox" checked disabled></td><td>' + val.uid + '</td><td>' + val.name + '</td></tr>');
            } else {
                if (val.rid == rid) {
                    $('#userPermissionsList').append('<tr class="success clickable"><td><input type="checkbox" checked></td><td>' + val.uid + '</td><td>' + val.name + '</td></tr>');
                } else {
                    $('#userPermissionsList').append('<tr class="clickable"><td><input type="checkbox"></td><td>' + val.uid + '</td><td>' + val.name + '</td></tr>');
                }
            }
        }, this);
    }
}


function savePermissionDataForRoom() {
    let list = [];
    let JSONList;
    let obj;
    let uid;
    let permission;

    $('#userPermissionsList tr').each(function () {
        if ($(this).find('td:first input').prop("checked")) {
            permission = 1;
            if ($(this).find('td:first input').prop("disabled")) { // only admins have property disabled
                permission = null;
            }
        } else {
            permission = 0;
        }

        uid = $(this).find('td:nth-child(2)').text();

        if (permission !== null) {
            obj = {
                uid: uid,
                permission: permission
            };
            list.push(obj);
        }
    });
    JSONList = JSON.stringify(list);
    changePermissionDataForRoom(rid, JSONList, onChangePermissionDataForRoomSuccess);
}


function onChangePermissionDataForRoomSuccess(data) {
    $('#userPermissionsModal').modal('hide');
    manageLights(rid, rname);
    if (data) {
        alertMessage('Successfully changed permissions for this room.', 'success');
    } else {
        alertMessage('Could not save permission data. Please try again!', 'error');
    }
}

"use strict";

/*-------------------------------------------------
	   Room Overview  //  User Section
-------------------------------------------------*/

function getRoomListForOverview() {
   loadAllRoomData(onLoadAllRoomDataForOverviewSuccess);
   switchView('roomsOverview');
}


 function onLoadAllRoomDataForOverviewSuccess(data) {
    if (data == null) {
       $('#roomsOverviewList').empty().html('<p>No room permissions yet. Please ask your Admin.</p>');
    } else {
       $('#roomsOverviewList').empty();
       data.forEach(function (val) {
          if (val.type == null) {
             rtype = 'default';
          } else {
             rtype = val.type;
          }
          $('#roomsOverviewList').append('<div class="col-xs-12 col-md-6 room-div"><button type="button" class="' + rtype + ' btn btn-default"><img class="' + rtype + '-icon" src="images/' + rtype + '-color.png"><p>' + val.name + '</p></button><input type="hidden" value="' + val.rid + '"></div>');
       }, this);
    }
 }


 /*-------------------------------------------------
 	   Room Management  //  Admin Section
 -------------------------------------------------*/

function getRoomList() {
    loadAllRoomData(onLoadAllRoomDataSuccess);
}


function onLoadAllRoomDataSuccess(data) {
    if (data == null) {
        $('#manageRoomsList').empty();
    } else {
        $('#manageRoomsList').empty();
        data.forEach(function (val) {
           if (val.type == null) {
             val.type = 'other';
          }
            $('#manageRoomsList').append('<tr><td>' + val.rid + '</td><td>' + val.name + '</td><td>' + val.lights + '</td><td>' + val.type + '</td><td><button type="button" class="close delete-button" aria-label="Delete"><span aria-hidden="true">&times;</span></button></td></tr>');
        }, this);
    }
}


function getRoomTypesList() {
    loadRoomTypesData(onLoadRoomTypesSuccess);
}


function onLoadRoomTypesSuccess(data) {
   if (data == null) {
      $('#selectRoomType').empty();
   } else {
      $('#selectRoomType').empty();
      if (rtype == null) {
         $('#selectRoomType').append('<option>Select roomtype ...</option>');
      } else {
         $('#selectRoomType').append('<option>' + rtype + '</option>');
      }
      data.forEach(function (val) {
         if (val.name != rtype) {
            $('#selectRoomType').append('<option>' + val.name + '</option>');
         }
      }, this);
      if (rtype != 'other') {
         $('#selectRoomType').append('<option>other</option>');
      }
   }
}


function openManageRoomsModal() {
    rid = null;
    rtype = null;
    $('#manageRoomsModal input').val('');
    getRoomTypesList();
    alertModalMessage('Please enter name and type (optional) to create a new room.');
    $('#manageRoomsModal').modal('show');
}


function createRoom() {
    rid = $('#changeRoomId').val();
    rname = $('#newRoomName').val();
    rtype = $('#selectRoomType option:selected').text();

    if (rtype == 'other') {
      rtype = null;
   }

    if (rname != '') { // checks if name has been entered
        if (rid != '') { // checks via id if room needs to be created or updated
            changeRoomData(rid, rname, rtype, onChangeRoomDataSuccess);
        } else {
            saveRoomData(rname, rtype, onSaveRoomDataSuccess);
        }
    } else {
      alertModalMessage('Please enter name and type (optional) for this room.', 'error');
    }
}


function onSaveRoomDataSuccess(data) {
    $('#manageRoomsModal').modal('hide');
    switchView('manageRoomsView');
    getRoomList();
    if (data) {
      alertMessage('Successfully saved new room.', 'success');
    } else {
      alertMessage('Could not save new room. Please try again!', 'error');
    }
}


function openChangeRoomNameModal() {
    $('#changeRoomId').val(rid);
    $('#newRoomName').val(rname);
    getRoomTypesList();
    alertModalMessage('Please change name and/or type for this room.');
    $('#manageRoomsModal').modal('show');
}


function onChangeRoomDataSuccess(data) {
    $('#manageRoomsModal').modal('hide');
    switchView('manageLightsView');
    getRoomList();
    if (data) {
      alertMessage('Successfully changed room data.', 'success');
    } else {
      alertMessage('Could not change room data. Please try again!', 'error');
    }
}


function deleteRoom(rid) {
    deleteRoomData(rid, onDeleteRoomDataSuccess);
}


function onDeleteRoomDataSuccess(data) {
    switchView('manageRoomsView');
    getRoomList();
    if (data) {
      alertMessage('Successfully deleted room data.', 'success');
    } else {
      alertMessage('Could not delete room data. Please try again!', 'error');
    }
}

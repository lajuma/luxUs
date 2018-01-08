"use strict";

/*-------------------------------------------------
	   Lights Overview  //  User Section
-------------------------------------------------*/

function getLightListForOverview(rid, rname, rtype) {
    $('#lightsOverviewRoomName').text(rname).removeClass().addClass(rtype);
    loadAllLightData(rid, onLoadAllLightDataForOverviewSuccess);
    switchView('lightsOverview');
}


function onLoadAllLightDataForOverviewSuccess(data) {
    if (data == null) {
        $('#lightsOverviewList').empty();
    } else {
        $('#lightsOverviewList').empty();
        data.forEach(function (val) {
            if (val.status == 1) {
                $('#lightsOverviewList').append('<div class="col-xs-12 col-sm-8 light-div"><button type="button" class="btn btn-default"><img alt="on" src="images/lightbulb-on.png">' + val.name + '</button><input type="hidden" value="' + val.lid + '"></div>');
            } else {
                $('#lightsOverviewList').append('<div class="col-xs-12 col-sm-8 light-div"><button type="button" class="btn btn-default"><img alt="on" src="images/lightbulb-off.png">' + val.name + '</button><input type="hidden" value="' + val.lid + '"></div>');
            }
        }, this);
    }
}


function changeLightStatus(lid) {
    changeLightStatusData(lid, onChangeLightStatusDataSuccess);

}


function onChangeLightStatusDataSuccess(data) {
   alertMessage('Successfully changed light status.', 'success')
   getLightListForOverview(rid, rname, rtype);
}


/*-------------------------------------------------
	   Lights Management  //  Admin Section
-------------------------------------------------*/

function manageLights(rid, rname, rtype) {
    $('#manageLightsRoomName').text(rname).removeClass().addClass(rtype);
    getPermissionDataForRoom(rid);
    switchView('manageLightsView');
    getLightList(rid);
}


function getLightList(rid) {
    loadAllLightData(rid, onLoadAllLightDataForManageLightsSuccess);
}


function onLoadAllLightDataForManageLightsSuccess(data) {
    if (data == null) {
        $('#manageLightsList').empty();
    } else {
        $('#manageLightsList').empty();
        data.forEach(function (val) {
            $('#manageLightsList').append('<tr><td>' + val.lid + '</td><td>' + val.name + '</td><td>' + val.status + '</td><td><button type="button" class="close delete-button" aria-label="Delete"><span aria-hidden="true">&times;</span></button></td></tr>');
        }, this);
    }
}


function openManageLightsModal() {
    lid = null;
    $('#manageLightsModal input').val('');
    alertModalMessage('Please enter a name to create a new light.');
    $('#manageLightsModal').modal('show');
}


function createLight(rid) {
    lid = $('#changeLightId').val();
    lname = $('#newLightName').val();
    if (lname != '') { // checks if name has been entered
        if (lid != '') { // checks via id if light needs to be created or updated
            changeLightData(lid, lname, onChangeLightDataSuccess);
        } else {
            saveLightData(lname, rid, onSaveLightDataSuccess);
        }
    } else {
        alertModalMessage('Please enter a name for this light.', 'error');
    }
}


function onSaveLightDataSuccess(data) {
    $('#manageLightsModal').modal('hide');
    getLightList(rid);
    if (data) {
        alertMessage('Successfully saved new light.', 'success');
    } else {
        alertMessage('Could not save new light. Please try again!', 'error');
    }
}


function changeLight(lid, lname) {
    $('#changeLightId').val(lid);
    $('#newLightName').val(lname);
    alertModalMessage('Please change the name for this light.');
    $('#manageLightsModal').modal('show');
}


function onChangeLightDataSuccess(data) {
    $('#manageLightsModal').modal('hide');
    getLightList(rid);
    if (data) {
        alertMessage('Successfully changed light data.', 'success');
    } else {
        alertMessage('Could not change light data. Please try again!', 'error');
    }
}


function deleteLight(lid) {
    deleteLightData(lid, onDeleteLightDataSuccess);
}


function onDeleteLightDataSuccess(data) {
    getLightList(rid);
    if (data) {
        alertMessage('Successfully deleted light data.', 'success');
    } else {
        alertMessage('Could not delete light data. Please try again!', 'error');
    }
}

"use strict";

// USER VARIABLES
let uid;
let name;
let pass;
let isAdmin;

// ROOM VARIABLES
let rid;
let rname;
let rtype;

// LIGHT VARIABLES
let lid;
let lname;

// VIEWS
let views = ['empty', 'login', 'roomsOverview', 'lightsOverview', 'manageUsersView', 'manageRoomsView', 'manageLightsView'];


$(document).ready(function () {


    // INIT
    switchView('empty');
    checkLoginStatus();


    // LOGIN - BUTTONS
    $('#login-button').click(login);


    // SIDEBAR - BUTTONS
    $('#logo').click(getRoomListForOverview);
    $('#home-button').click(getRoomListForOverview);
    $('#manageUsers-button').click(function () {
        switchView('manageUsersView');
        getUserList();
    });
    $('#manageRooms-button').click(function () {
        switchView('manageRoomsView');
        getRoomList();
    });
    $('#logout-button').click(logout);


    // HAMBURGER MENU - BUTTONS
    $('.collapse').click(function () {
        $('.collapse').collapse('hide');
        $('#sidebar').addClass('border-bottom');
    });
    $('.toggle-btn').click(function () {
        $('#sidebar').toggleClass('border-bottom');
    });


    // ROOMS OVERVIEW
    $('#roomsOverviewList').on('mouseenter', 'button', function () {
        rtype = $(this).prop('class').split(' ')[0];
        $(this).find('img').attr('src', 'images/' + rtype + '-white.png');
    });
    $('#roomsOverviewList').on('mouseleave', 'button', function () {
        $(this).find('img').attr('src', 'images/' + rtype + '-color.png');
    });
    $('#roomsOverviewList').on('click', 'div', function () {
        rname = $(this).find('button').text();
        rid = $(this).find('input:nth-child(2)').val();
        getLightListForOverview(rid, rname, rtype);
    });


    // LIGHTS OVERVIEW
    $('#lightsOverviewBack-button').click(function () {
        getRoomListForOverview();
    });

    $('#lightsOverviewList').on('click', 'div', function () {
        lid = $(this).find('input:first').val();
        changeLightStatus(lid);
    });


    // USER MANAGEMENT - BUTTONS
    $('#new-button').click(openUserDataModal);
    $('#save-button').click(createUser);
    $('#userList').on('click', 'tr', function () {
        uid = $(this).find('td:first').text();
        name = $(this).find('td:nth-child(2)').text();
        isAdmin = $(this).find('td:nth-child(3)').text();
        openUserDataModalForChange(uid, name, isAdmin);
    });
    $('#userList').on('click', '.delete-button', function (event) {
        event.stopPropagation();
        uid = $(this).closest('tr').find('td:first').text();
        deleteUser(uid);
    });
    $('#manageUsersBack-button').click(function () {
        getRoomListForOverview();
    });


    // USER MANAGEMENT - PERMISSIONS - BUTTONS
    $('#manageUsersManageUserPermissions-button').click(openManagePermissionForUserModal);
    $('#roomAccessClose-button').click(function () {
        $('#roomAccessModal').modal('hide');
        openUserDataModalForChange(uid, name, isAdmin);
    });
    $('#newUserisAdmin').change(function () {
        if (uid !== null) {
            $('#changeAccessSection').toggle(!this.checked);
        }
    });
    $('#roomAccessSave-button').click(savePermissionDataForUser);
    $('#roomAccessList').on('click', 'tr', function () {
        $(this).toggleClass("success");
        if ($(this).hasClass("success")) {
            $(this).find('td:first input').prop("checked", true);
        } else {
            $(this).find('td:first input').prop("checked", false);
        }
    });


    // ROOM MANAGEMENT - BUTTONS
    $('#manageRoomsCreate-button').click(openManageRoomsModal);
    $('#manageRoomsBack-button').click(function () {
        getRoomListForOverview();
    });
    $('#manageRoomsModalSave-button').click(createRoom);
    $('#manageRoomsList').on('click', 'tr', function () {
        rid = $(this).find('td:first').text();
        rname = $(this).find('td:nth-child(2)').text();
        rtype = $(this).find('td:nth-child(4)').text();
        manageLights(rid, rname, rtype);
    });
    $('#manageRoomsList').on('click', '.delete-button', function (event) {
        event.stopPropagation();
        rid = $(this).closest('tr').find('td:first').text();
        deleteRoom(rid);
    });


    // ROOM MANAGEMENT - PERMISSIONS - BUTTONS
    $('#userPermissionsSave-button').click(savePermissionDataForRoom);
    $('#userPermissionsList').on('click', '.clickable', function () {
        $(this).toggleClass("success");
        if ($(this).hasClass("success")) {
            $(this).find('td:first input').prop("checked", true);
        } else {
            $(this).find('td:first input').prop("checked", false);
        }
    });


    // LIGHT MANAGEMENT - BUTTONS
    $('#manageLightsChangeRoomName-button').click(openChangeRoomNameModal);
    $('#manageLightsAddNewLight-button').click(openManageLightsModal);
    $('#manageLightsModalSave-button').click(function () {
        createLight(rid);
    });
    $('#manageLightsList').on('click', 'tr', function () {
        lid = $(this).find('td:first').text();
        lname = $(this).find('td:nth-child(2)').text();
        changeLight(lid, lname);
    });
    $('#manageLightsList').on('click', '.delete-button', function (event) {
        event.stopPropagation();
        lid = $(this).closest('tr').find('td:first').text();
        deleteLight(lid);
    });
    $('#manageLightsBack-button').click(function () {
        switchView('manageRoomsView');
        getRoomList();
    });
    $('#manageLightsManageUserPermissions-button').click(openManagePermissionForRoomModal);

});


// SWITCH VIEW
function switchView(view) {
    for (var i = 0; i < views.length; i++) {
        if (views[i] == view) {
            $('#' + view).show();
            if (view == 'login') {
                $('#header').hide();
                $('#sidebar').hide();
                $('.main-content').hide();
                $('.footer').hide();
            } else {
                $('#header').show();
                $('#sidebar').show();
                $('.main-content').show();
                $('.footer').show();
            }
        } else {
            $('#' + views[i]).hide();
        }
    }
}

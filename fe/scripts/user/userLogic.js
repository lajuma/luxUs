"use strict";


/*-------------------------------------------------
	   Login / Logout / Cookie
-------------------------------------------------*/

function checkLoginStatus() {
    let cookie = getCookie('auth');
    if (cookie != null) {
        loadLoginStatus(onCheckLoginStatusSuccess);
    } else {
        alertMessage('Please enter username and password.');
        switchView('login');
    }
}


function onCheckLoginStatusSuccess(data) {
    if (data != null) {
        getRoomListForOverview();
        alertMessage('Successfully logged in. Have fun!', 'success');
      //   $('#currentUser').text('User: ' + data.name);
        if (data.isAdmin === 1) {
            $('#manageUsers-button').show();
            $('#manageRooms-button').show();
            $('#currentUser').text('Admin: ' + data.name);
        } else {
            $('#manageUsers-button').hide();
            $('#manageRooms-button').hide();
            $('#currentUser').text('User: ' + data.name);
        }
    } else {
        alertMessage('Please enter username and password.');
        switchView('login');
    }
}


function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


function login() {
    name = $('#loginName').val();
    pass = $('#loginPass').val();
    if (name != '' && pass != '') {
        loadSingleUserData(name, pass, onLoadLoginDataSuccess);
    } else {
        alertMessage('Login not possible. Please enter username and password.', 'error');
    }
}


function onLoadLoginDataSuccess(data) {
    if (data != null) {
        getRoomListForOverview();
        alertMessage('Successfully logged in. Have fun!', 'success');
        if (data.isAdmin === 1) {
            $('#manageUsers-button').show();
            $('#manageRooms-button').show();
            $('#currentUser').text('Admin: ' + data.name);
        } else {
            $('#manageUsers-button').hide();
            $('#manageRooms-button').hide();
            $('#currentUser').text('User: ' + data.name);
        }
    } else {
        alertMessage('Login not possible. Please check username and password!', 'error');
    }
}


function logout() {
    logoutSession(onLogoutSessionSuccess);
}


function onLogoutSessionSuccess(data) {
    if (data) {
        $('#login').find('input').val('');
        switchView('login');
        alertMessage('Successfully logged out. Goodbye!');
    } else {
        alertMessage('Could not log you out. You have to stay with us forever!', 'error');
    }
}


/*-------------------------------------------------
	   User Management  //  Admin Section
-------------------------------------------------*/

function getUserList() {
    loadAllUserData(onLoadAllUserDataSuccess);
}


function onLoadAllUserDataSuccess(data) {
    if (data == null) {
        $('#userList').empty();
    } else {
        $('#userList').empty();
        for (let i = 0; i < data.length; i++) {
            $('#userList').append('<tr><td>' + data[i].uid + '</td><td>' + data[i].name + '</td><td>' + data[i].isAdmin + '</td><td><button type="button" class="close delete-button" aria-label="Delete"><span aria-hidden="true">&times;</span></button></td></tr>');
        }
    }
}


function openUserDataModal() {
    uid = null;
    $('#userDataModal input').val('');
    $('#newUserisAdmin').prop("checked", false);
    $('#changeAccessSection').hide();  // user needs to be saved first (because room access management needs uid)
    alertModalMessage('Please enter username and password.');
    $('#userDataModal').modal('show');
}


function openUserDataModalForChange(uid, name, isAdmin) {
    $('#changeUserId').val(uid);
    $('#newUserName').val(name);
    $('#newUserPass').val('**********');
    getPermissionDataForUser(uid);
    if (isAdmin == 1) {
        $('#newUserisAdmin').prop("checked", true);
        $('#changeAccessSection').hide();
    } else {
        $('#newUserisAdmin').prop("checked", false);
        $('#changeAccessSection').show();
    }
    alertModalMessage('Please change name, password, admin status and/or room access for this user.');
    $('#userDataModal').modal('show');
}


function createUser() {
    uid = $('#changeUserId').val();
    name = $('#newUserName').val();
    pass = $('#newUserPass').val();

    if ($('#newUserisAdmin').prop("checked")) {
        isAdmin = 1;
    } else {
        isAdmin = 0;
    }

    if (name != '' && pass != '') {
      if (uid != '') { // checks via id if user needs to be created or updated
          changeUserData(uid, name, pass, isAdmin, onChangeUserDataSuccess);
      } else {
          saveUserData(name, pass, isAdmin, onSaveUserDataSuccess);
      }
   } else {
      alertModalMessage('Please enter username and password.', 'error');
   }
}


function onSaveUserDataSuccess(data) {
    $('#userDataModal').modal('hide');
    switchView('manageUsersView');
    getUserList();
    if (data) {
        alertMessage('Successfully saved new user.', 'success');
    } else {
        alertMessage('Could not save new user. Please try again!', 'error');
    }
}


function onChangeUserDataSuccess(data) {
    $('#userDataModal').modal('hide');
    switchView('manageUsersView');
    getUserList();
    if (data) {
        alertMessage('Successfully changed user data.', 'success');
    } else {
        alertMessage('Could not change user data. Please try again!', 'error');
    }
}


function deleteUser(uid) {
    deleteUserData(uid, onDeleteUserDataSuccess);
}


function onDeleteUserDataSuccess(data) {
    switchView('manageUsersView');
    getUserList();
    if (data) {
        alertMessage('Successfully deleted user data.', 'success');
    } else {
        alertMessage('Could not delete user data. Do not delete yourself!', 'error');
    }
}


/*-------------------------------------------------
	   Alert Messages
-------------------------------------------------*/

function alertMessage(message, alert) {
    let classname = 'alert ';
    switch (alert) {
        case 'error':
            classname += 'alError';
            break;
        case 'success':
            classname += 'alSuccess';
            break;
        default:
            classname += 'alDefault';
            break;
    }
    $('.message').text(message).parent().removeClass().addClass(classname);
}


function alertModalMessage(message, alert) {
    let classname = 'alert ';
    switch (alert) {
        case 'error':
            classname += 'alError';
            break;
        case 'success':
            classname += 'alSuccess';
            break;
        default:
            classname += 'alDefault';
            break;
    }
    $('.modalMessage').text(message).parent().removeClass().addClass(classname);
}

"use strict";


let userUrl = 'http://127.0.0.1/luxus/be/user/';

/*-------------------------------------------------
	   Login / Logout / Cookie
-------------------------------------------------*/

function loadLoginStatus(onSuccess) {
    $.ajax({
        url: userUrl + 'userApi.php',
        method: 'post',
        dataType: 'json',
        data: {
            method: 'checkLoginStatus'
        },
        cache: false,
        success: onSuccess,
        error: function (xhr, status, error) {
            alert("Could not get cookie data!\nreadyState: " + xhr.readyState +
                "\nstatus: " + xhr.status + " - " + xhr.statusText +
                "\n" + error);
        }
    });
}


function loadSingleUserData(name, pass, onSuccess) {
    $.ajax({
        url: userUrl + 'userApi.php',
        method: 'post',
        dataType: 'json',
        data: {
            method: 'read',
            name: name,
            pass: pass
        },
        cache: false,
        success: onSuccess,
        error: function (xhr, status, error) {
            alert("Could not get this users data!\nreadyState: " + xhr.readyState +
                "\nstatus: " + xhr.status + " - " + xhr.statusText +
                "\n" + error);
        }
    });
}


function logoutSession(onSuccess) {
    $.ajax({
        url: userUrl + 'userApi.php',
        method: 'post',
        data: {
            method: 'logout',
        },
        success: onSuccess,
        error: function (xhr, status, error) {
            alert("Could not destroy session data!\nreadyState: " + xhr.readyState +
                "\nstatus: " + xhr.status + " - " + xhr.statusText +
                "\n" + error);
        }
    });
}


/*-------------------------------------------------
	   User Management  //  Admin Section
-------------------------------------------------*/

function loadAllUserData(onSuccess) {
    $.ajax({
        url: userUrl + 'userApi.php',
        method: 'post',
        dataType: 'json',
        data: {
            method: 'readAll'
        },
        cache: false,
        success: onSuccess,
        error: function (xhr, status, error) {
            alert("Could not get all user data!\nreadyState: " + xhr.readyState +
                "\nstatus: " + xhr.status + " - " + xhr.statusText +
                "\n" + error);
        }
    });
}


function saveUserData(name, pass, isAdmin, onSuccess) {
    $.ajax({
        url: userUrl + 'userApi.php',
        method: 'post',
        data: {
            method: 'create',
            name: name,
            pass: pass,
            isAdmin: isAdmin
        },
        // no dataType needed when just sending and not receiving
        cache: false,
        success: onSuccess,
        error: function (xhr, status, error) {
            alert("Could not save new user!\nreadyState: " + xhr.readyState +
                "\nstatus: " + xhr.status + " - " + xhr.statusText +
                "\n" + error);
        }
    });
}


function changeUserData(id, name, pass, isAdmin, onSuccess) {
    $.ajax({
        url: userUrl + 'userApi.php',
        method: 'post',
        data: {
            method: 'update',
            id: id,
            name: name,
            pass: pass,
            isAdmin: isAdmin
        },
        cache: false,
        success: onSuccess,
        error: function (xhr, status, error) {
            alert("Could not change this users data!\nreadyState: " + xhr.readyState +
                "\nstatus: " + xhr.status + " - " + xhr.statusText +
                "\n" + error);
        }
    });
}


function deleteUserData(id, onSuccess) {
    $.ajax({
        url: userUrl + 'userApi.php',
        method: 'post',
        data: {
            method: 'delete',
            id: id
        },
        success: onSuccess,
        error: function (xhr, status, error) {
            alert("Could not delete user!\nreadyState: " + xhr.readyState +
                "\nstatus: " + xhr.status + " - " + xhr.statusText +
                "\n" + error);
        }
    });
}

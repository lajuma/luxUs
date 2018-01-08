"use strict";

let lightUrl = 'http://127.0.0.1/luxus/be/light/';

/*-------------------------------------------------
	   Lights Overview  //  User Section
-------------------------------------------------*/

function loadAllLightData(id, onSuccess) {
   $.ajax({
      url: lightUrl + 'lightApi.php',
      method: 'post',
      dataType: 'json',
      data: {
         method: 'readAll',
         id: id
      },
      cache: false,
      success: onSuccess,
      error: function (xhr, status, error) {
         alert("Could not get this rooms light data!\nreadyState: " + xhr.readyState + "\nstatus: " + xhr.status + " - " + xhr.statusText + "\n" + error);
      }
   });
}


function changeLightStatusData(id, onSuccess) {
   $.ajax({
      url: lightUrl + 'lightApi.php',
      method: 'post',
      dataType: 'json',
      data: {
         method: 'change',
         id: id
      },
      cache: false,
      success: onSuccess,
      error: function (xhr, status, error) {
         alert("Could not change this lights status!\nreadyState: " + xhr.readyState + "\nstatus: " + xhr.status + " - " + xhr.statusText + "\n" + error);
      }
   });
}


/*-------------------------------------------------
	   Lights Management  //  Admin Section
-------------------------------------------------*/

function saveLightData(name, rid, onSuccess) {
    $.ajax({
        url: lightUrl + 'lightApi.php',
        method: 'post',
        data: {
            method: 'create',
            name: name,
            rid: rid
        },
        cache: false,
        success: onSuccess,
        error: function (xhr, status, error) {
            alert("Could not save new light!\nreadyState: " + xhr.readyState +
                "\nstatus: " + xhr.status + " - " + xhr.statusText +
                "\n" + error);
        }
    });
}


function changeLightData(id, name, onSuccess) {
    $.ajax({
        url: lightUrl + 'lightApi.php',
        method: 'post',
        data: {
            method: 'update',
            id: id,
            name: name
        },
        cache: false,
        success: onSuccess,
        error: function (xhr, status, error) {
            alert("Could not change this lights data!\nreadyState: " + xhr.readyState +
                "\nstatus: " + xhr.status + " - " + xhr.statusText +
                "\n" + error);
        }
    });
}


function deleteLightData(id, onSuccess) {
    $.ajax({
        url: lightUrl + 'lightApi.php',
        method: 'post',
        data: {
            method: 'delete',
            id: id
        },
        success: onSuccess,
        error: function (xhr, status, error) {
            alert("Could not delete this light!\nreadyState: " + xhr.readyState +
                "\nstatus: " + xhr.status + " - " + xhr.statusText +
                "\n" + error);
        }
    });
}

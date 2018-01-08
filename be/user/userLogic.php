<?php

/*-------------------------------------------------
	   Login / Logout / Cookie
-------------------------------------------------*/

// SALT is used as constant for the auth cookie's identifier hash
define('SALT', '1A2b3C4d');

function checkLoginStatus()
{
    list($identifier, $token) = explode(':', $_COOKIE['auth']);
    $now = time();

    if (ctype_alnum($identifier) && ctype_alnum($token)) {
        $result = getCookieData($identifier);
        $data = $result->fetch_assoc();

        if ($token != $data['token']) {
            // fail because the tokens do not match
            return null;
        } elseif ($now > $data['timeout']) {
            // fail because the cookie has expired
            return null;
        } elseif ($identifier != md5(SALT . md5($data['name'] . SALT))) {
            // fail because the identifiers do not match
            return null;
        } else {
            /*
          Success: login functions are processed.
          Token is re-generated for the next login.
          Timeout is not increased to ensure that the user must log in
          once the time period has passed.
           */
            $_SESSION['uid'] = $data['uid'];
            $_SESSION['name'] = $data['name'];
            $_SESSION['isAdmin'] = $data['isAdmin'];

            $renewedToken = md5(uniqid(rand(), true));
            setcookie('auth', $identifier.':'.$renewedToken, $data['timeout'], '/');
            updateCookieData($data['name'], $renewedToken, $data['timeout']);

            $dataObj = (object) array('uid' => $data['uid'], 'name' => $data['name'], 'isAdmin' => $data['isAdmin']);
            return $dataObj;
        }
    } else {
        /* failed because the information is not in the correct format in the cookie */
        return null;
    }
}


function readUserLoginData($name, $pass)
{
    $result = loadUserLoginData($name);
    if ($result === null) {
        return null;
    } else {
        $data = $result->fetch_assoc();
        if (password_verify($pass, $data['pass'])) {
            $_SESSION['uid'] = $data['uid'];
            $_SESSION['name'] = $data['name'];
            $_SESSION['isAdmin'] = $data['isAdmin'];

            $identifier = $data['identifier'];
            $token = md5(uniqid(rand(), true));
            $timeout = time() + 60 * 60; // one hour
            setcookie('auth', $identifier.':'.$token, $timeout, '/');
            updateCookieData($name, $token, $timeout);

            $dataObj = (object) array('uid' => $data['uid'], 'name' => $data['name'], 'isAdmin' => $data['isAdmin']);
            return $dataObj;
        } else {
            return null;
        }
    }
}


// deletes auth-cookie, session-id-cookie, all session-variables and the session itself
function logoutSession()
{
    setcookie('auth', '', time()-100, '/');
    setcookie('PHPSESSID', '', time()-100, '/');
    $_SESSION = array();
    session_destroy();
}


/*-------------------------------------------------
	   Rooms Management  //  Admin Section
-------------------------------------------------*/

function readAllUserData()
{
    $result = loadAllUserData();
    if ($result == null) {
        return null;
    } else {
        $data = $result->fetch_all(MYSQLI_ASSOC);
        return $data;
    }
}


function saveUserData($name, $pass, $isAdmin)
{
    // creates hash from username and salt
    $identifier = md5(SALT . md5($name . SALT));
    $hash = password_hash($pass, PASSWORD_BCRYPT);
    $result = addUserDataToDatabase($name, $hash, $isAdmin, $identifier);
    if (!$result) {
        return false;
    } else {
        return true;
    }
}


function changeUserData($id, $name, $pass, $isAdmin)
{
    $identifier = md5(SALT . md5($name . SALT));
    if ($pass === '**********') {
        $result = changeUserDataInDatabaseNoPass($id, $name, $isAdmin, $identifier);
        if ($isAdmin == 1) {
           $result = deleteAdminFromPermissionDatabase($id);  // Admins have access to all rooms --> deleting keeps room_user table clean
        }
    } else {
        $hash = password_hash($pass, PASSWORD_BCRYPT);
        $result = changeUserDataInDatabase($id, $name, $hash, $isAdmin, $identifier);
    }
    if (!$result) {
        return false;
    } else {
        return true;
    }
}


function deleteUserData($id)
{
    if ($id !== 0) {
        if (isset($_SESSION['uid']) && $_SESSION['uid'] != $id) {
                $result = deleteUserDataFromDatabase($id);
            if (!$result) {
                return false;
            } else {
                return true;
            }
        }
    }
    return false;
}

?>

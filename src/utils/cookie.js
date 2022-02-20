// 操作cookie

export function getCookie(key) {
    var cookies = document.cookie.replace(/[ ]/g, "");
    var arrCookie = cookies.split(";");
    var tips;
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (key == arr[0]) {
            tips = arr[1];
            // token值格式 Bearer xxxxx
            // 给token值Bearer后加空格
            tips = tips.slice(0, 6) + " " + tips.slice(6)
            break;
        }
    }
    return tips;
}

export function setCookie(key, val, time) {
    let expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + time); // 单位天
    document.cookie = `${key}=${val};expires=${expireDate.toGMTString()}`;
}

export function delCookie(key) {
    let cookies = getCookie(key);
    (cookies);
    if (cookies) {
        setCookie(key, null, -99);
    } else {
        return false;
    }
}

//  What is a cookie?
//  A "Cookie" is 
//  A "Stringy Cookie" is "[cookiename], [cookiedata]"


function updateCookie(id, content, exhours = 28800){
    // Takes an id and content for a cookie (and an expiry date in hours. if not, 1200 days will be set.) and adds it or updates it.


    let d = new Date();

    // this magic number is 24*60*60*1000. it's for turning the day number into a millisecond number.
    d.setTime(d.getTime() + exhours * 3600000);
    let expiredate = d.toUTCString();


    let combinedcookie = id + "=" + content + "; expires=" + expiredate + "; domain=crazu.co.nz";

    console.log("Updated cookie:" + combinedcookie);

    document.cookie = combinedcookie;
};

function deleteCookie(cookieid){
    // Takes a cookie id and deletes it
    console.log("Deleted Cookie '" + cookieid + "'")
    document.cookie = cookieid + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
}

function stringifyCookie(cookie){
    cookie = cookie.trim()
    return cookie.split('=')  
}

function getCookie(targetid){
    // takes a cookie id, returns that cookie's value
    let targetcookie = [undefined, undefined]
    let cookielist = document.cookie.split(';');

    cookielist.forEach((cookie) => {
        let stringifiedcookie = stringifyCookie(cookie)
        if (stringifiedcookie[0] == targetid){
            
            targetcookie = stringifiedcookie;
        };
        return;
    })
    
    return targetcookie[1];
}


function deleteAllCookies(){
    let cookielist = document.cookie.split(';');

    cookielist.forEach((cookie) => {
        cookie = cookie.trim()
        let cookiename = cookie.split('=')[0]
        document.cookie = cookiename + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
    })
}
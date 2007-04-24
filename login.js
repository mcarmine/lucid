//***********Login Form***********\\

var scriptTags = document.getElementsByTagName("script");
for(var i=0;i<scriptTags.length;i++) {
  if(scriptTags[i].src && scriptTags[i].src.match(/login\.js$/)) {
    var psychdesktop_path = scriptTags[i].src.replace(/login\.js$/,'');
  }
}

var psychdesktop_http;
if (window.XMLHttpRequest) { // Mozilla, Safari, ...
    psychdesktop_http = new XMLHttpRequest();
    psychdesktop_http.overrideMimeType('text/plain');
} else if (window.ActiveXObject) { // IE
    psychdesktop_http = new ActiveXObject("Microsoft.XMLHTTP");
}
var psychdesktop_registration;
url = psychdesktop_path+"/backend/register.php";
psychdesktop_http.onreadystatechange = function(){
    if (psychdesktop_http.readyState == 4) {
        if(psychdesktop_http.status == 200){
            psychdesktop_registration = psychdesktop_http.responseText;
            var readcook = psychdesktop_readCookie("psychdesktop_remember");
            if(readcook == null)
            {
                psychdesktop_home();
            }
            else
            {
                psychdesktop_continue();
            }            
        }
        else
        {
            psychdesktop_cannotconnect();
        }
    }
    else
    {
        psychdesktop_cannotconnect();
    }        
};
psychdesktop_http.open("GET", url, true);
psychdesktop_http.send(null);

function psychdesktop_cannotconnect()
{
    login = "<br /><br /><span style='font-size: 20px; color: red; align: center;'>Cannot connect to server.</span><br /><br />";
    try{ document.getElementById("psychdesktop_login").innerHTML = login; }
    catch(error) { alert("Error: "+error); }    
}

function psychdesktop_resetpass()
{
	username = document.getElementById("psychdesktop_resetpass_username").value;
	email = document.getElementById("psychdesktop_resetpass_email").value;
    if((!username && !email) || (!username || !email))
    {
        psychdestkop_error("Please complete all fields.");
    }
    else if ((email.indexOf('@') < 0) || ((email.charAt(email.length-5) != '.') && (email.charAt(email.length-4) != '.') && (email.charAt(email.length-3) != '.')))
    {
        psychdestkop_error("Please enter a valid email address.");
    }
    else
    {
        url = psychdesktop_path+"/backend/forgotpass.php";
        psychdesktop_http.onreadystatechange = function(){
            if (psychdesktop_http.readyState == 4) {
                if(psychdesktop_http.status == 200){
                    if(psychdesktop_http.responseText == "0")
                    {
                        psychdesktop_home();
                        psychdestkop_error("Reset Successfull. Check your email for your new password.");
                    }
                    else if(psychdesktop_http.responseText == "1")
                    {
                        psychdestkop_error("No such user");
                    }
                    else
                    {
                        psychdestkop_error("Email address provided is different then the address on file");
                    }
                }
            }        
        };
        psychdesktop_http.open("POST", url, true);
        psychdesktop_http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        psychdesktop_http.send("noop=zzz&user="+username+"&email="+email);        
    }
}


function psychdesktop_doregister()
{
	username = document.getElementById("psychdesktop_register_username").value;
	email = document.getElementById("psychdesktop_register_email").value;
	password = document.getElementById("psychdesktop_register_password").value;
	password2 = document.getElementById("psychdesktop_register_password2").value;
	if(email && password && username)
	{
        if(password2 == password)
        {
            if ((email.indexOf('@') < 0) || ((email.charAt(email.length-5) != '.') && (email.charAt(email.length-4) != '.') && (email.charAt(email.length-3) != '.')))
            {
                psychdestkop_error("Please enter a valid email address");
            }
            else
            {        
                url = psychdesktop_path+"/backend/register.php";
                psychdesktop_http.onreadystatechange = function(){
                    if (psychdesktop_http.readyState == 4) {
                        if(psychdesktop_http.status == 200){
                            if(psychdesktop_http.responseText == "0")
                            {
                                psychdesktop_home();
                                psychdestkop_error("Registration Successfull. You may now log in.");
                            }
                            else
                            {
                                psychdestkop_error("Username allready taken");
                            }                            
                        }
                    }        
                };
                psychdesktop_http.open("POST", url, true);
                psychdesktop_http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                psychdesktop_http.send("noop=zzz&user="+username+"&pass="+password+"&email="+email);
            }
        }
        else { psychdestkop_error("Two passwords don't match"); }		
	}
	else
    {
        psychdestkop_error("Please fill out all fields");
    }
}

function psychdesktop_continue()
{
	login = "<div style='text-align: center; font-size: 14px;'><br /><b>You are allready logged in.</b><br /><br />";
    login += "<a href='javascript:psychdesktop_login(1)'>Continue to desktop</a><br /><br />";
    login += "<a href='javascript:psychdesktop_eraseCookie(\"psychdesktop_remember\"); psychdesktop_home();'>Log me out</a><br /><br />";
	login += "</div>";
    try{ document.getElementById("psychdesktop_login").innerHTML = login; }
    catch(error) { alert("Error: "+error); }	    
}

function psychdesktop_login(auto)
{
    if(document.getElementById("psychdesktop_loading"))
    {
        document.getElementById("psychdesktop_loading").style.display = "inline";
    }
    if(auto == 0)
    {
        username = document.getElementById("psychdesktop_username").value;
        password = document.getElementById("psychdesktop_password").value;
        remember = document.getElementById("psychdesktop_remember").checked;
        encrypted = "false";
    }
    else
    {
        encrypted = "true";
        cookie = psychdesktop_readCookie("psychdesktop_remember");
        cookie = cookie.split("%2C");
        username = cookie[0];
        password = cookie[1];
        remember = "false";
    }
    url = psychdesktop_path+"/backend/login.php";
    psychdesktop_http.onreadystatechange = function(){
        if (psychdesktop_http.readyState == 4) {
            if(psychdesktop_http.status == 200){
                if(psychdesktop_http.responseText == "0")
                {
                    psychdesktop_popUp();
                    psychdesktop_continue();
                }
                else
                {
                    psychdestkop_error("Incorrect username or password");
                }
            }
        }        
    };
    psychdesktop_http.open("POST", url, true);
    psychdesktop_http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    psychdesktop_http.send("username="+username+"&password="+password+"&remember="+remember+"&encrypted="+encrypted);
}

function psychdesktop_register()
{
    if(psychdesktop_registration == "yes")
    {
        login  = "<table style='width: auto; height: auto; border: 0px;'><tr><td colspan='2' style='text-align: center; font-weight: bold;'>Register</td></tr>\n";
        login += "<tr><td style='font-size: 14px; font-weight: bold;'>Username:</td><td><input type='text' id='psychdesktop_register_username' /></td></tr>\n";
        login += "<tr><td style='font-size: 14px; font-weight: bold;'>Email:</td><td><input type='text' id='psychdesktop_register_email' /></td></tr>\n";
        login += "<tr><td style='font-size: 14px; font-weight: bold;'>Password:</td><td><input type='password' id='psychdesktop_register_password' /></td></tr>\n";
        login += "<tr><td style='font-size: 14px; font-weight: bold;'>Confirm Password:</td><td><input type='password' id='psychdesktop_register_password2' /></td></tr>\n";
        login += "<tr><td colspan='2' style='text-align: center; color: red; font-size: 14px; font-weight: bold;' id='psychdesktop_errorbox'></td></tr>";	
        login += "<tr><td colspan='2'><span style='float: right'><span id='psychdesktop_loading' style='display: none;'><img src='"+psychdesktop_path+"/images/UI/loading.gif' alt='' /></span><input type='button' value='Cancel' onClick='psychdesktop_home();' /><input type='button' value='Submit' onClick='psychdestkop_error(\"\"); psychdesktop_doregister();' /></span></td></tr>";	
        login += "</table>";
        try{ document.getElementById("psychdesktop_login").innerHTML = login; }
        catch(error) { alert("Error: "+error); }
    }
}

function psychdestkop_error(msg)
{
	document.getElementById("psychdesktop_errorbox").innerHTML = msg;
    if(document.getElementById("psychdesktop_loading"))
    {
        document.getElementById("psychdesktop_loading").style.display = "none";
    }
}

function psychdesktop_popUp() {
    if(document.getElementById("psychdesktop_loading"))
    {
        document.getElementById("psychdesktop_loading").style.display = "none";
    }    
	URL = psychdesktop_path+"/desktop/";
	day = new Date();
	id = day.getTime();
	eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=1000000,height=1000000,left = 0,top = 0,fullscreen=1');");
}

function psychdesktop_home()
{
	login  = "<table style='width: auto; height: auto; border: 0px;'><tr><td colspan='2' style='text-align: center; font-weight: bold;'>Sign in to desktop</td></tr>\n";
	login += "<tr><td style='font-size: 14px; font-weight: bold;'>Username:</td><td><input type='text' id='psychdesktop_username' /></td></tr>\n";
	login += "<tr><td style='font-size: 14px; font-weight: bold;'>Password:</td><td><input type='password' id='psychdesktop_password' /></td></tr>\n";
	login += "<tr><td colspan='2' style='font-size: 14px; font-weight: bold;'><span style='float: right'><span id='psychdesktop_loading' style='display: none;'><img src='"+psychdesktop_path+"/images/UI/loading.gif' alt='' /></span><input type='button' value='Login' onClick='psychdestkop_error(\"\"); psychdesktop_login(0);' /></span>";
	login += "<b>Remember me:</b><input type='checkbox' id='psychdesktop_remember' /></td></tr>";
	login += "<tr><td colspan='2' style='text-align: center; color: red; font-size: 14px; font-weight: bold;' id='psychdesktop_errorbox'></td></tr>";
	login += "<tr><td colspan='2' style='font-size: 14px; text-align: center;'><a href='javascript:psychdesktop_forgotpass();'>Forgot Password?</a></td></tr>";
    if(psychdesktop_registration == "yes") {	
	login += "<tr><td colspan='2' style='font-size: 14px; text-align: center;'><a href='javascript:psychdesktop_register();'>Don't have an account?</a></td></tr>";
	}
	login += "</table>";
	
	try{ document.getElementById("psychdesktop_login").innerHTML = login; }
	catch(error) { alert("Error: "+error); }	
}
function psychdesktop_forgotpass()
{
	login  = "<table style='width: auto; height: auto; border: 0px;'><tr><td colspan='2' style='text-align: center; font-weight: bold;'>Reset your password</td></tr>\n";
	login += "<tr><td style='font-size: 14px; font-weight: bold;'>Username:</td><td><input type='text' id='psychdesktop_resetpass_username' /></td></tr>\n";
	login += "<tr><td style='font-size: 14px; font-weight: bold;'>Email:</td><td><input type='text' id='psychdesktop_resetpass_email' /></td></tr>\n";
	login += "<tr><td colspan='2'><span style='float: right'><span id='psychdesktop_loading' style='display: none;'><img src='"+psychdesktop_path+"/images/UI/loading.gif' alt='' /></span><input type='button' value='Cancel' onClick='psychdesktop_home();' /><input type='button' value='Submit' onClick='psychdestkop_error(\"\"); psychdesktop_resetpass();' /></span></td></tr>";	
	login += "<tr><td colspan='2' style='text-align: center; color: red; font-size: 14px; font-weight: bold;' id='psychdesktop_errorbox'></td></tr>";	
	login += "</table>";
	try{ document.getElementById("psychdesktop_login").innerHTML = login; }
	catch(error) { alert("Error: "+error); }	
}

function psychdesktop_createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function psychdesktop_readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function psychdesktop_eraseCookie(name) {
	psychdesktop_createCookie(name,"",-1);
}

<?php
if($_COOKIE['logged'] == "yes")
{
echo "<script type='text/javascript'>window.location='./index2.php'</script>";
}
?>
<html>
<head>
<title>Psych Desktop Administration - Log In</title>
</head>
<body>
<table border= "0" width="100%" cellpadding= "0" cellspacing= "0" style="background-image: url('../images/header.gif'); position: absolute; top: 0px; left: 0px;">
<tr>
<td>
<img src="../images/logo.gif">
</td>
</tr>
</table>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<center>
Please Log In.<br><br>
<form action="./dologin.php" method="post">
<b>Username: </b><input type="text" name="user" ><br>
<b>Password: </b><input type="password" name="pass" ><br>
<input type="submit" value="Log In">
</form>

</center>

</body>
</html>
<?php

require ("../backend/config.php");
require ("./login_check.php");


if($_GET['backend'])
{
if($_GET['backend'] == "users")
{ $backendname = "User Manager"; }


$page_title = "Psych Desktop Administration - ${backendname}";
}
else
{
$page_title = "Psych Desktop Administration";
}

?>
<html>
<head>
<title><?php echo $page_title; ?></title>
</head>
<body>
<table border= "0" width="100%" cellpadding= "0" cellspacing= "0" style="background-image: url('../images/header.gif'); position: absolute; top: 0px; left: 0px;">
<tr>
<td>
<img src="../images/logo.gif">
</td>
</tr>
</table>
<table width="100%" cellpadding= "0" cellspacing= "0" style="position: absolute; left: 0px; top: 90px; background: #DBDBDB; border: 0px; height: 25px;">
<tr>
<td>
<center>
<a href="./index2.php">Home</a> | <a href="./index2.php?backend=users">User Management</a> | <a href="./index2.php?backend=app">Manage Apps</a> | <a href="./logout.php">Logout</a>
</center>
</td>
</tr>
</table>
<table width="100%" border="0" height="110"><tr><td></td></tr></table>
<?php

if($_GET['opmessage'])
{
echo "<center><h4>${_GET['opmessage']}</h4></center>";
}

if($_GET['backend'])
{
$backend = $_GET['backend'];
}
else
{
$backend = "index";
}
if($_GET['option'])
{
global $option;
$option = $_GET['option'];
}
if($_GET['id'])
{
global $id;
$id = $_GET['id'];
}


require("./backends/${backend}.php");
?>
</body>
</html>
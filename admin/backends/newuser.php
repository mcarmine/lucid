<?php
require("../backend/config.php");
?>
<center>
 <FORM action="./index2.php?backend=createnewuser" method="post">
    <P>
    <LABEL for="user">Username: </LABEL>
              <INPUT type="text" name="user" id="user"><BR>
    <LABEL for="pass">Password: </LABEL>
              <INPUT type="password" name="pass" id="pass"><BR>
    <LABEL for="conf">Confirm: </LABEL>
              <INPUT type="password" name="conf" id="conf"><BR>
    <LABEL for="email">Email: </LABEL>
              <INPUT type="text" name="email" id="email"><BR>
    <LABEL for="level">Level: </LABEL>
              <INPUT type="text" name="level" id="level">
<b>MUST BE 'user' OR 'admin' !!!</b><BR>
    <INPUT type="submit" value="Submit">
    </P>
 </FORM>
</center>
<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    header("Location: http://localhost/Rhythm_Realm/login.php");
    exit();
}

$servername = "localhost";
$username_db = "root";
$password_db = "";
$dbname = "Music_Database";

$conn = new mysqli($servername, $username_db, $password_db, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = "SELECT * FROM singer";
$result = $conn->query($query);

$singers = [];
while ($row = $result->fetch_assoc()) {
    $singers[] = $row;
}

$conn->close();
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Home</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tilt+Prism&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles/styleabout.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Acme&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <div class="topback">
            <h1>- - - - - - - - - &nbsp;&nbsp;&nbsp;Rhytm Realm&nbsp;&nbsp;&nbsp; - - - - - - - - -</h1>
        </div>
    </header>
    <nav>
        <a href="http://localhost/Rhythm_Realm/home.php">Home</a>
        <a href="http://localhost/Rhythm_Realm/songs.php">Songs</a>
        <a href="http://localhost/Rhythm_Realm/albums.php">Albums</a>
        <a href="http://localhost/Rhythm_Realm/about.php">About</a>
        <a href="#"></a>
        <a href="http://localhost/Rhythm_Realm/logout.php">Logout</a>
        <?php if(isset($_SESSION["user_id"])): ?>
            <a href="http://localhost/Rhythm_Realm/profile.php"><?php echo $_SESSION["user_name"]; ?></a>
        <?php endif; ?>
 
        
    </nav>
    <main>
        <div class="container" >

            
            <div class="imagebox">
                <img src="Assets/shoebmahfuz.jpg" style="border:2px solid black; border-radius:2%;" width="90%" height="75%" alt="">
            </div>
    
            <div class="imagebox">
                <img src="Assets/mithila.jpg" style="border:2px solid black; border-radius:2%;" width="70%" height="75%" alt="">
            </div>
            
            <div class="imagebox">
                <img src="Assets/emon.jpg" style="border:2px solid black; border-radius:2%;" width="70%" height="75%" alt="image">
            </div>
            

        </div>
    </main>
    <footer>
        <hr>
        <div>
            <a href="#">ABOUT RR</a>
            <a href="#">FEEDBACK</a>
            <a href="#">CONTACT US</a>
            <a href="#">BRAND T&C</a>
            <a href="#">FAQ</a>
            <a href="#">OFFERS T&C</a>
            <a href="#">FIND A SHOP</a>
            <a href="#">SUPPORT</a>
        </div>
        <hr>
    </footer>


</body>
</html>
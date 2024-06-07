<?php
session_start();

if (!isset($_SESSION["user_id"])) {
    header("Location: login.php");
    exit();
}


$servername = "localhost";
$username_db = "root";
$password_db = "";
$dbname = "Music_database";

$conn = new mysqli($servername, $username_db, $password_db, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$user_id = $_SESSION["user_id"];

$query = "SELECT name, phone, email, usertype FROM user WHERE email = '$user_id'";
$result = $conn->query($query);

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();
    $name = $row["name"];
    $phone = $row["phone"];
    $email = $row["email"];
    $usertype = $row["usertype"];
} else {
    echo "User not found.";
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile</title>
    <link rel="stylesheet" href="Styles/styleprofile.css">
</head>
    <header>
        <div class="topback">
            <h1>- - - - - - - - - &nbsp;&nbsp;&nbsp;Rhytm Realm&nbsp;&nbsp;&nbsp; - - - - - - - - -</h1>
    </header>
<nav>
        <a href="http://localhost/Rhythm_Realm/home.php">Home</a>
        <a href="http://localhost/Rhythm_Realm/songs.php">Songs</a>
        <a href="http://localhost/Rhythm_Realm/albums.php">Albums</a>
        <a href="http://localhost/Rhythm_Realm/about.php">About</a>
        <a href="#"></a>
        <?php if(isset($_SESSION["user_id"])): ?>
            <a href="http://localhost/Rhythm_Realm/profile.php"><?php echo $_SESSION["user_name"]; ?></a>
        <?php endif; ?>
 
        
    </nav>
<body>
    <div class="profile-section">
        <h2>User Profile</h2>
        <a style="text-decoration:none;" href="http://localhost/Rhythm_Realm/playlist.php"><h3>Playlists</h3></a>
    <div class="profile-info">
        <p>Name: <?php echo $name; ?></p>
        <p>Phone: 0<?php echo $phone; ?></p>
        <p>Email: <?php echo $email; ?></p>
        <p>User Type: <?php echo $usertype; ?></p>
    </div>
    
    <a class="back-to-home" href="home.php">Back to Home</a>
    </div>
    
</body>
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
</html>

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
    <link rel="stylesheet" href="styles/stylehome.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Acme&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <div class="topback">
            <h1>- - - - - - - - - &nbsp;&nbsp;&nbsp;Rhytm Realm&nbsp;&nbsp;&nbsp; - - - - - - - - -</h1>
        </div>

        <div class="slideshow-container">
            <img id="slide1" src="Assets/cover2.jpg" width="100%" height="50%" alt="slide1"> 
            <img id="slide1" src="Assets/cover3.jpg" width="100%" height="50%" alt="slide1">
            <img id="slide1" src="Assets/cover2.jpg" width="100%" height="50%" alt="slide1">
            <img id="slide1" src="Assets/cover1.jpg" width="100%" height="50%" alt="slide1">
        </div>
        <script src="Scripts/slideshow.js"></script>
    </header>
    <nav>
        <a href="http://localhost/Rhythm_Realm/index.php">Home</a>
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
        <div class="container">
            <div class="popularc">
                <div class="populartitle">Popular !!</div>
                <div class="popularimage1"><img src="assets/songs/1.jpg"  alt=""></div>
                <div class="popularimage2"><img src="assets/songs/2.jpg"  alt=""></div>
                <div class="popularimage3"><img src="assets/songs/3.jpg"  alt=""></div>
            </div>
            <div class="popularnamec">
                <div class="popularname1">Ami Akash Pathabo </div>
                <div class="popularname2">Sondha Tara</div>
                <div class="popularname3">Faded</div>
            </div>
            <div class="albumc">
                <div class="albumimage1"><img src="assets/songs/4.jpg" width="300px" alt=""></div>
                <div class="albumimage2"><img src="assets/songs/5.jpg" width="300px" alt=""></div>
                <div class="albumimage3"><img src="assets/songs/6.jpg" width="300px" alt=""></div>
                <div class="albumtitle">Albums !!</div>
            </div>
            <div class="albumnamec">
                <div class="albumname1">English </div>
                <div class="albumname2">Party</div>
                <div class="albumname3">Romantic</div>
            </div>
            <div class="singerstitle">Singers</div>
            <div class="singersc">
                <div class="singersimage1"><img src="assets/songs/8.jpeg" width="200px" alt=""></div>
                <div class="singersimage2"><img src="assets/songs/9.jpg" width="200px" alt=""></div>
                <div class="singersimage3"><img src="assets/songs/10.jpg" width="200px" alt=""></div>
                <div class="singersimage4"><img src="assets/songs/11.jpg" width="200px" alt=""></div>
            </div>
            <table class="stable" >
            <tr>
                
                <th style="color:black; " >Singer Name</th>
                
                
            </tr>
            <?php foreach ($singers as $singer): ?>
                <tr>
                    <td><a class="x" style="text-decoration:none;"; href="songs.php?search=<?php echo urlencode($singer['name']); ?>"><?php echo $singer['name']; ?></a></td>
                </tr>
            <?php endforeach; ?>
        </table>
            
            

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

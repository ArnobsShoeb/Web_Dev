<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    header("Location: http://localhost/Rhythm_Realm/login.php");
    exit();
}
if ($_SERVER["REQUEST_METHOD"] == "POST" && $_SESSION["usertype"] === "Singer") {
    $album_name = $_POST["album_name"];
    $num_of_songs = $_POST["num_of_songs"];
    $type = $_POST["type"];
    $release_date = $_POST["release_date"];
}

$servername = "localhost";
$username_db = "root";
$password_db = "";
$dbname = "Music_Database";

$conn = new mysqli($servername, $username_db, $password_db, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$insert_album_sql = "INSERT INTO album (album_name, no_of_songs, type, release_date) VALUES ('$album_name', '$num_of_songs', '$type', '$release_date')";

    if ($conn->query($insert_album_sql) === TRUE) {
        header("Location: http://localhost/Rhythm_Realm/albums.php");
        exit();
    } else {
        echo "" ;
        
        
    }

$query = "SELECT * FROM album";
$result = $conn->query($query);

$albums = [];
while ($row = $result->fetch_assoc()) {
    $albums[] = $row;
}
$searchTerm = isset($_GET['search']) ? $_GET['search'] : '';
$query = "SELECT id, name, singer, genre, audio_url FROM songs
          WHERE name LIKE '%$searchTerm%' OR singer LIKE '%$searchTerm%'";
$result = $conn->query($query);

$conn->close();
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Albums</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tilt+Prism&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles/stylealbums.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Acme&display=swap" rel="stylesheet">
    <style>
        .container a{
            background-color: lightskyblue;
            font-size: xx-large;
            padding: 10px 10px 10px 10px;
            border: 2px solid lightblue;
            border-radius: 5%;
        }
    </style>
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
        <a href="http://localhost/Rhythm_Realm/home.php">Home</a>
        <a href="http://localhost/Rhythm_Realm/songs.php">Songs</a>
        <a href="http://localhost/Rhythm_Realm/albums.php">Albums</a>
        <a href="http://localhost/Rhythm_Realm/about.php">About</a>
        <a href="#"></a>
        <a href="#"></a>
        <?php if(isset($_SESSION["user_id"])): ?>
        <?php if($_SESSION["usertype"] === "Singer"): ?>
            <a href="http://localhost/Rhythm_Realm/album.php">Add Album</a>
        <?php endif; ?>
        <a href="http://localhost/Rhythm_Realm/profile.php"><?php echo $_SESSION["user_name"]; ?></a>
    <?php endif; ?>
 
        
    </nav>
    <main>
    <?php if (isset($_SESSION["user_id"]) && $_SESSION["usertype"] === "Singer"): ?>
    <h2>Add Album</h2>
    <div class="fcontainer">
        <form action="albums.php" method="post">
            <label for="album_name">Album Name:</label>
            <input type="text" name="album_name" required><br>
            <label for="num_of_songs">Number of Songs:</label>
            <input type="number" name="num_of_songs" required><br>
            <label for="type">Type:</label>
            <input type="text" name="type" required><br>
            <label for="release_date">Release Date:</label>
            <input type="date" name="release_date" required><br>
            <button type="submit">Add Album</button>
        </form>
        
    </div>
    <?php endif; ?>
        <h2>Albums</h2>
        <div class="grid-container">
            <div class="box">Albums</div>
            <div class="box">Type</div>
            <div class="box">Release Date</div>
        </div>
        <?php foreach ($albums as $album): ?>
        <div class="ll">
            <div class="llm">
            <a href="songs.php?search=<?php echo urlencode($album['album_name']); ?>" style="text-decoration:none;"><?php echo $album['album_name']; ?></a>
            </div>
            <div class="llm">
                <p><?php echo $album['type']; ?></p>
            </div>
            <div class="llm">
                <p> <?php echo $album['release_date']; ?></p>
            </div>
        </div>
    <?php endforeach; ?>
        <div class="container">
            <div class="leftportion">
                    <div class="leftrow1">
                        <div class="leftrow1left">
                            <div class="albumimage picclass"><img src="assets/songs/4.jpg" width="300px" alt=""></div>
                        </div>
                        <div class="leftrow1right">
                            <div class="albumimage picclass"><img src="assets/songs/5.jpg" width="300px" alt=""></div>
                        </div>
                    </div>
                    <div class="leftrow1">
                        <div class="leftrow1left">
                            <a href="" style="text-decoration:none;">English</a>
                        </div>
                        <div class="leftrow1right">
                        <a href="" style="text-decoration:none;">Party</a>
                        </div>

                    </div>
                    <div class="leftrow1">
                        <div class="leftrow1left">
                            <div class="albumimage picclass"><img src="assets/songs/6.jpg" width="300px" alt=""></div>
                        </div>
                        <div class="leftrow1right">
                        <div class="albumimage picclass"><img src="assets/songs/13.jpg" width="300px" alt=""></div>
                        </div>

                    </div>
                    <div class="leftrow1">
                        <div class="leftrow1left">
                        <a href="" style="text-decoration:none;">Romantic</a>
                        </div>
                        <div class="leftrow1right">
                        <a href="" style="text-decoration:none;">Chill Hits</a>
                        </div>

                    </div>
                
                    
            </div>
            <div class="rightportion">
            <div class="leftrow1">
                        <div class="leftrow1left">
                            <div class="albumimage picclass"><img src="assets/songs/14.jpg" width="300px" alt=""></div>
                        </div>
                        <div class="leftrow1right">
                            <div class="albumimage picclass"><img src="assets/songs/15.jpg" width="300px" alt=""></div>
                        </div>
                    </div>
                    <div class="leftrow1">
                        <div class="leftrow1left">
                        <a href="" style="text-decoration:none;">One Direction</a>
                        </div>
                        <div class="leftrow1right">
                        <a href="" style="text-decoration:none;">Kureghor</a>
                        </div>

                    </div>
                    <div class="leftrow1">
                        <div class="leftrow1left">
                            <div class="albumimage picclass"><img src="assets/songs/16.jpg" width="300px" alt=""></div>
                        </div>
                        <div class="leftrow1right">
                        <div class="albumimage picclass"><img src="assets/songs/17.jpg" width="300px" alt=""></div>
                        </div>

                    </div>
                    <div class="leftrow1">
                        <div class="leftrow1left">
                        <a href="" style="text-decoration:none;">Onno Somoy</a>
                        </div>
                        <div class="leftrow1right">
                        <a href="" style="text-decoration:none;">Artcell</a>
                        </div>

                    </div>
                    
            </div>
        </div>
    
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
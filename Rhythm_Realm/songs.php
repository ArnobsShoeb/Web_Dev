<?php
session_start();
$servername = "localhost";
$username_db = "root";
$password_db = "";
$dbname = "Music_database";

$conn = new mysqli($servername, $username_db, $password_db, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$searchTerm = isset($_GET['search']) ? $_GET['search'] : '';
$query = "SELECT id, name, singer, genre, audio_url FROM songs
          WHERE name LIKE '%$searchTerm%' OR singer LIKE '%$searchTerm%'";
$result = $conn->query($query);

$songs = [];
while ($row = $result->fetch_assoc()) {
    $songs[] = $row;
}


$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Songs</title>
    <link rel="stylesheet" href="Styles/stylesongs.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Acme&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <div class="topback">
            <h1>- - - - - - - - - &nbsp;&nbsp;&nbsp;Rhythm Realm&nbsp;&nbsp;&nbsp; - - - - - - - - -</h1>
        </div> 
    </header>
    <nav>
        <a href="http://localhost/Rhythm_Realm/home.php">Home</a>
        <a href="http://localhost/Rhythm_Realm/songs.php">Songs</a>
        <a href="http://localhost/Rhythm_Realm/albums.php">Albums</a>
        <a href="http://localhost/Rhythm_Realm/about.php">About</a>
        <a href="#">
            <div class="search-container">
                <form action="songs.php" method="GET">
                    <input type="text" placeholder="Search for a song..." name="search">
                    <button class="searchbtn" type="submit">Search</button>
                </form>
            </div>
        </a>
        <?php if(isset($_SESSION["user_id"])): ?>
            <a href="http://localhost/Rhythm_Realm/profile.php"><?php echo $_SESSION["user_name"]; ?></a>
        <?php endif; ?>
    </nav>
    <main>
        <h2>Songs</h2>
        <?php if ($result->num_rows > 0): ?>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Singer/Album</th>
                    <th>Genre</th>
                    <th>Audio</th>
                </tr>
                <?php foreach ($songs as $song): ?>
                    <tr>
                        <td><?php echo $song['id']; ?></td>
                        <td><?php echo $song['name']; ?></td>
                        <td><?php echo $song['singer']; ?></td>
                        <td><?php echo $song['genre']; ?></td>
                        <td width="500px">
                        <audio class="song-audio" controls data-src="<?php echo $song['audio_url']; ?>">
                            <source src="<?php echo $song['audio_url']; ?>" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </table>
        <?php else: ?>
            <p>No results found for '<?php echo $searchTerm; ?>'</p>
        <?php endif; ?>
        <?php if (isset($_SESSION["user_id"]) && $_SESSION["usertype"] === "Singer"): ?>
        <div class="container">
        <form action="add_song.php" method="post">
            <label for="song_name">Song Name:</label>
            <input type="text" name="song_name" required><br>
            <label for="singer">Singer/Album:</label>
            <input type="text" name="singer" required><br>
            <label for="genre">Genre:</label>
            <input type="text" name="genre" required><br>
            <label for="audio_url">Audio URL:</label>
            <input type="text" name="audio_url" required><br>
            <button type="submit">Add Song</button>
        </form>
        </div>
        <?php endif; ?>
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
    <script>
        const audioElements = document.querySelectorAll('.song-audio');
        let currentAudio = null;

        audioElements.forEach(audio => {
            audio.addEventListener('play', () => {
                if (currentAudio && currentAudio !== audio) {
                    currentAudio.pause();
                }
                currentAudio = audio;
            });

            audio.addEventListener('ended', () => {
                currentAudio = null;
            });
        });
    </script>
</body>
</html>

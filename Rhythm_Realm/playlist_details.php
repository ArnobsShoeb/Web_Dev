<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Playlist Details</title>
    <link rel="stylesheet" href="Styles/styleplaylist.css">
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
        <a href="#">About</a>
        <a href="#"></a>
    </nav>
    <div class="profile-section">
        <h2>Playlist Details</h2>
        <?php
        
        $servername = "localhost";
        $username_db = "root";
        $password_db = "";
        $dbname = "Music_database";
        
        $conn = new mysqli($servername, $username_db, $password_db, $dbname);
        
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        if (isset($_GET['playlist_id'])) {
            $playlistId = $_GET['playlist_id'];
            
            // Retrieve playlist name
            $playlistNameQuery = "SELECT name FROM playlists WHERE id = ?";
            $stmt = $conn->prepare($playlistNameQuery);
            $stmt->bind_param("i", $playlistId);
            $stmt->execute();
            $stmt->bind_result($playlistName);
            $stmt->fetch();
            $stmt->close();
            
            echo "<h3>Songs in Playlist: $playlistName</h3>";
            
            // Retrieve songs in the playlist
            $songsQuery = "SELECT s.id, s.name FROM songs s
                           JOIN playlist_songs ps ON s.id = ps.song_id
                           WHERE ps.playlist_id = ?";
            $stmt = $conn->prepare($songsQuery);
            $stmt->bind_param("i", $playlistId);
            $stmt->execute();
            
            $songs = [];
            $stmt->bind_result($songId, $songName);
            while ($stmt->fetch()) {
                $songs[] = ['id' => $songId, 'name' => $songName];
            }
            $stmt->close();
            
            echo "<ul>";
            foreach ($songs as $song) {
                echo "<li>{$song['name']}</li>";
            }
            echo "</ul>";
        } else {
            echo "Playlist ID not provided.";
        }
        
        $conn->close();
        ?>
    </div>
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

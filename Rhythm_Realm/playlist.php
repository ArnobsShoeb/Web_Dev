<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Playlists</title>
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
        <h2>Playlists</h2>
        <form method="post" action="create_playlist.php">
            <label for="playlistName">Playlist Name:</label>
            <input type="text" id="playlistName" name="playlistName" required>
            <button type="submit">Create Playlist</button>
        </form>
        <h3 class="yourpl">Your Playlists:</h3>
        <ul>
            <?php
            // Replace with your database connection details
            $servername = "localhost";
            $username_db = "root";
            $password_db = "";
            $dbname = "Music_database";
            
            $conn = new mysqli($servername, $username_db, $password_db, $dbname);
            
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
            
            $query = "SELECT id, name, num_songs FROM playlists";
            $result = $conn->query($query);
            
            $playlists = [];
            while ($row = $result->fetch_assoc()) {
                $playlists[] = $row;
            }
            
            $conn->close();
            
            foreach ($playlists as $playlist) {
                echo "<li><strong class='playlist-name'><a href='playlist_details.php?playlist_id={$playlist['id']}'>{$playlist['name']}</a></strong> ({$playlist['num_songs']} songs)
                      <form method='post' action='delete_playlist.php' onsubmit='return confirm(\"Are you sure you want to delete this playlist?\")'>
                          <input type='hidden' name='playlist_id' value='{$playlist['id']}'>
                          <button type='submit'>Delete</button>
                      </form></li>";
                echo "<div class='playlist-details' style='display: none;'>Extra details for {$playlist['name']}</div>";
            }
            ?>
        </ul>
        <h3 class="yourpl">Add Songs to Playlists:</h3>
        <form method="post" action="add_to_playlist.php">
            <label for="playlistId">Select Playlist:</label>
            <select id="playlistId" name="playlistId" required>
                <?php foreach ($playlists as $playlist): ?>
                    <option value="<?php echo $playlist['id']; ?>"><?php echo $playlist['name']; ?></option>
                <?php endforeach; ?>
            </select>
            <label for="songId">Select Song:</label>
            <select id="songId" name="songId" required>
                <?php
                
                $conn = new mysqli($servername, $username_db, $password_db, $dbname);
            
                if ($conn->connect_error) {
                    die("Connection failed: " . $conn->connect_error);
                }
                
                $songQuery = "SELECT id, name FROM songs"; 
                $songResult = $conn->query($songQuery);
                
                while ($song = $songResult->fetch_assoc()) {
                    echo "<option value='{$song['id']}'>{$song['name']}</option>";
                }
                
                $conn->close();
                ?>
            </select>
            <button type="submit">Add Song to Playlist</button>
        </form>
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
    <script>
        const playlistNames = document.querySelectorAll('.playlist-name');
        playlistNames.forEach(playlistName => {
            playlistName.addEventListener('click', () => {
                const playlistDetails = playlistName.nextElementSibling;
                if (playlistDetails.style.display === 'none') {
                    playlistDetails.style.display = 'block';
                } else {
                    playlistDetails.style.display = 'none';
                }
            });
        });
    </script>
</body>
</html>

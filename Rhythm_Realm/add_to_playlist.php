<?php

$servername = "localhost";
$username_db = "root";
$password_db = "";
$dbname = "Music_database";

$conn = new mysqli($servername, $username_db, $password_db, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST["playlistId"]) && isset($_POST["songId"])) {
        $playlistId = $_POST["playlistId"];
        $songId = $_POST["songId"];

        $checkQuery = "SELECT * FROM playlist_songs WHERE playlist_id = ? AND song_id = ?";
        $stmt = $conn->prepare($checkQuery);
        $stmt->bind_param("ii", $playlistId, $songId);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            echo "Song is already in the playlist.";
            header("Location:http://localhost/Rhythm_Realm/playlist.php");
        } else {
            $addQuery = "INSERT INTO playlist_songs (playlist_id, song_id) VALUES (?, ?)";
            $stmt = $conn->prepare($addQuery);
            $stmt->bind_param("ii", $playlistId, $songId);

            if ($stmt->execute()) {
                // Update the num_songs field in the playlists table
                $updateNumSongsQuery = "UPDATE playlists SET num_songs = num_songs + 1 WHERE id = ?";
                $updateStmt = $conn->prepare($updateNumSongsQuery);
                $updateStmt->bind_param("i", $playlistId);
                $updateStmt->execute();

                echo "Song added to the playlist successfully.";
                header("Location:http://localhost/Rhythm_Realm/playlist.php");
            } else {
                echo "Error adding song to the playlist: " . $stmt->error;
            }
        }

        $stmt->close();
        $updateStmt->close();
    } else {
        echo "Invalid data.";
    }
}

$conn->close();
?>

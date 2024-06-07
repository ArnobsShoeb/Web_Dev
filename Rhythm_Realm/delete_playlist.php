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
    if (isset($_POST["playlist_id"])) {
        $playlistId = $_POST["playlist_id"];
        
        // Delete related records from playlist_songs table
        $deletePlaylistSongsQuery = "DELETE FROM playlist_songs WHERE playlist_id = ?";
        $stmt = $conn->prepare($deletePlaylistSongsQuery);
        $stmt->bind_param("i", $playlistId);
        $stmt->execute();
        $stmt->close();
        
        // Delete playlist from playlists table
        $deletePlaylistQuery = "DELETE FROM playlists WHERE id = ?";
        $stmt = $conn->prepare($deletePlaylistQuery);
        $stmt->bind_param("i", $playlistId);
        $stmt->execute();
        $stmt->close();
        
        // Redirect back to the playlists page or display a success message
        header("Location: playlist.php");
        exit();
    }
}
?>

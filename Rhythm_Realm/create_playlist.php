<?php

$servername = "localhost";
$username_db = "root";
$password_db = "";
$dbname = "Music_database";

$conn = new mysqli($servername, $username_db, $password_db, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $playlistName = $_POST["playlistName"];

    $insertQuery = "INSERT INTO playlists (name) VALUES ('$playlistName')";
    
    if ($conn->query($insertQuery) === TRUE) {
        header("Location: http://localhost/Rhythm_Realm/playlist.php");
        exit;
    } else {
        echo "Error creating playlist: " . $conn->error;
    }
}

$conn->close();
?>

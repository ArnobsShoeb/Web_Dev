<?php
session_start();
if (!isset($_SESSION["user_id"])) {
    header("Location: http://localhost/Rhythm_Realm/login.php");
    exit();
}

if ($_SESSION["usertype"] === "Singer" && $_SERVER["REQUEST_METHOD"] === "POST") {
    $songName = $_POST["song_name"];
    $singer = $_POST["singer"];
    $genre = $_POST["genre"];
    $audioUrl = $_POST["audio_url"];

    // Replace with your database connection details
    $servername = "localhost";
    $username_db = "root";
    $password_db = "";
    $dbname = "Music_database";

    $conn = new mysqli($servername, $username_db, $password_db, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $insertSongSQL = "INSERT INTO songs (name, singer, genre, audio_url) VALUES ('$songName', '$singer', '$genre', '$audioUrl')";
    if ($conn->query($insertSongSQL) === TRUE) {
        echo "Song added successfully!";
    } else {
        echo "Error adding song: " . $conn->error;
    }

    $conn->close();
}
?>

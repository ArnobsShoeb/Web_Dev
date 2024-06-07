<?php

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["Email"];
    $password = $_POST["Password"];

    
    $servername = "localhost"; 
    $username_db = "root"; 
    $password_db = ""; 
    $dbname = "Music_database"; 

    
    $conn = new mysqli($servername, $username_db, $password_db, $dbname);

    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    
    $query = "SELECT * FROM user WHERE email='$email' AND password='$password'";
    $result = $conn->query($query);

    if ($result->num_rows == 1) {
        $row = $result->fetch_assoc();
        $_SESSION["user_id"] = $row["email"];
        $_SESSION["user_name"] = $row["name"];
        $_SESSION["usertype"] = $row["usertype"];
        header("Location: http://localhost/Rhythm_Realm/home.php");
        exit();
    } else {
        
        echo "Invalid login credentials.";
    }

    
    $conn->close();
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tilt+Prism&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles/stylelogin.css">
</head>
<body>
    <header>
        <div class="topback">
            <h1>- - - - - - - - - &nbsp;&nbsp;&nbsp;Rhytm Realm&nbsp;&nbsp;&nbsp; - - - - - - - - -</h1>
        </div>

        
        
    </header>
    <nav>
        <a href="http://localhost/Rhythm_Realm/home.php"></a>
        <a href="#"></a>
        <a href="#"></a>
        <a href="#"></a>
        <a href="#">Dont have account ??? Sign Up here Now !! ==> </a>
        <a href="http://localhost/Rhythm_Realm/signup.php">Sign Up</a>
    </nav>
    <main>
        <div class="lgn">
            <h2>Login Form</h2>
        </div>
        <div class="container">
            <div class="leftportion">
                <form action="login.php" method="post">


                    <div class="left-portion">
                        <p></p>
                        <p></p>
                        <p></p>
                        <p>Email : <input type="text" name="Email" placeholder="Enter your Email :" /></p>
                        <p>Password : <input type="password" name="Password" placeholder="Enter your Password" />
                        </p>
                    </div>
                    <div class="btc">
                        <button class="login_button" type="submit">Login</button>
                        

                    </div>

                </form>
            </div>
            <div class="rightportion">
                <div class="picportion">
                    <img src="Assets/2.jpg" class="picclass" width="80%" alt="">
                    <button class="reset_db_button" type="submit" name="reset">Reset Database</button>
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
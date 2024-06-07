<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["Name"];
    $phone = $_POST["Phone"];
    $email = $_POST["Email"];
    $usertype = $_POST["Usertype"];
    $password = $_POST["Password"];
    $confirmPassword = $_POST["ConfirmPassword"]; 

    if ($password !== $confirmPassword) {
        $error_message = "Passwords do not match.";
    } else {
        $servername = "localhost";
        $username_db = "root";
        $password_db = "";
        $dbname = "Music_database";

        $conn = new mysqli($servername, $username_db, $password_db, $dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } else {
            $insert_user_sql = "INSERT INTO user (name, phone, email, usertype, password) VALUES ('$name', '$phone', '$email', '$usertype', '$password')";

            if ($conn->query($insert_user_sql) === TRUE) {
                if ($usertype === "Singer") {
                    $insert_singer_sql = "INSERT INTO singer (name, phone) VALUES ('$name', '$phone')";
                    if ($conn->query($insert_singer_sql) !== TRUE) {
                        echo "Error inserting singer info: " . $conn->error;
                    }
                }
                header("Location: http://localhost/Rhythm_Realm/login.php");
                exit();
            } else {
                echo "Error inserting user info: " . $conn->error;
            }
        }
        $conn->close();
    }
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sign Up</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Tilt+Prism&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="Styles/stylesignup.css">
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
        <style>
            #typebtn{
                width: 300px;
                background-color: white;
                text-align: center;
                height: 40px;
            }
            #dob{
                width: 300px;
                text-align: center;
                height: 40px;
            }
        </style>
    </header>
    <nav>
        <a href="http://localhost/Rhythm_Realm/home.php"></a>
        <a href="#"></a>
        <a href="#"></a>
        <a href="#"></a>
        <a href="#"></a>
        <a href="http://localhost/Rhythm_Realm/login.php">Login</a>
    </nav>
    <main>
        <div class="sgnup">
            <h2>SignUp Form</h2>
        </div>
        <div class="container">
            <div class="leftportion">
            <form action="signup.php" method="post">
                    <div class="left-portion">
                        <p>Name : <input type="text" name="Name"  placeholder="Enter your First Name" /></p>
                        <p>Phone : <input type="text" name="Phone" placeholder="Enter your Phone Number" /></p>
                        <p>Email :&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp <input type="text" name="Email"
                                placeholder="Enter your Email" /></p>
                        <p>Password : <input type="password" name="Password" placeholder="Enter a Strong Password" />
                        </p>
                        <p>Confirm Password : <input type="password" name="ConfirmPassword" placeholder="Confirm Password" />
                        </p>
                        <p> User Type :
                            <select name="Usertype" id="typebtn">
                                <option value="">-----select a option------</option>
                                <option value="Singer">Singer</option>
                                <option value="User">User</option>
                            </select>
                        </p>
                    </div>
                    <div class="btc">
                        <?php
                        if (isset($error_message)) {
                            echo '<p style="color: red;">' . $error_message . '</p>';
                        }
                        ?>
                        <button class="submit_button" type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
            <div class="rightportion">
                <div class="picportion">
                    <img src="Assets/1.jpg" class="picclass" width="80%" alt="">
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
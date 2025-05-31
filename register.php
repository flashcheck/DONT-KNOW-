
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BPay Registration</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', sans-serif; background: #f4f6fa; color: #333; }
        .login-container { max-width: 400px; margin: 50px auto; padding: 20px; background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-radius: 12px; }
        .logo img { width: 150px; display: block; margin: 0 auto; }
        .input-group { display: flex; align-items: center; margin-bottom: 20px; background: #f9f9f9; padding: 10px; border-radius: 8px; }
        .input-group img { width: 20px; margin-right: 10px; }
        .input-group input { flex: 1; border: none; padding: 10px; background: transparent; font-size: 16px; }
        .btn-login { width: 100%; padding: 15px; background-color: #4D8FFF; color: white; font-size: 16px; border: none; border-radius: 8px; cursor: pointer; }
        .btn-login:hover { background-color: #2d6fa7; }
        .error-message { color: red; font-size: 14px; margin-bottom: 15px; }
        .success-message { color: green; font-size: 14px; margin-bottom: 15px; }
        .login-link { text-align: center; margin-top: 15px; font-size: 14px; }
        .login-link a { color: #4D8FFF; text-decoration: none; }
        .login-link a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="logo">
            <img src="images/logo.png" alt="BPay Logo">
        </div>
        <form method="POST" action="register.php" class="login-form">
            <div class="input-group">
                <img src="assets/icons/phone-icon.png" class="input-icon" alt="Phone">
                <input type="text" name="phone" placeholder="Phone" required>
            </div>
            <div class="input-group">
                <img src="assets/icons/password-icon.png" class="input-icon" alt="Password">
                <input type="password" name="password" placeholder="Password" required>
            </div>
            <div class="input-group">
                <img src="assets/icons/password-icon.png" class="input-icon" alt="Confirm Password">
                <input type="password" name="confirm_password" placeholder="Confirm Password" required>
            </div>

            <!-- Referral Code Input (Optional) -->
            <div class="input-group">
                <img src="assets/icons/referral-icon.png" class="input-icon" alt="Referral Code">
                <input type="text" name="referral_code" placeholder="Referral Code (Optional)" value="">
            </div>
            
            
            <button type="submit" class="btn-login">REGISTER</button>
            <div class="login-link">
                <p>Already have an account? <a href="login.php">Login</a></p>
            </div>
        </form>
    </div>
</body>
</html>

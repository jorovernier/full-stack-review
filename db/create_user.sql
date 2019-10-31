INSERT INTO users (username, password, email)
VALUES ($1, $2, $3);

SELECT email, username FROM users 
WHERE email = $3;
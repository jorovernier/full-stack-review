DROP TABLE IF EXISTS purchase_history;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

INSERT INTO users (username, password, email)
VALUES
('i-love-bananas', '$2b$12$2JdS/tcQ22w/avqR9qC1ZudQS4P0e2puCsra5LpnwfOxT56VbEyre', 'monkeyboy@bananas.com'),
('somebody1toldme', '$2b$12$aHbgmTGCNDqzhdfip81ioumC.U.mIoVzmutLV4ShFWtJE5Wocg6y2', 'shrek4life@gmail.com'),
('pirates-4-lyfe', '$2b$12$lJ.iGoKRl05lTXsJamOGh.7D0hDoD87AJQiCYUlQqOeP3l8J5VcPi', 'seashanty@pirate.arg');

CREATE TABLE inventory (
    part_id SERIAL PRIMARY KEY,
    part_name VARCHAR(64) NOT NULL,
    part_price INTEGER NOT NULL,
    part_quality TEXT NOT NULL,
    part_image TEXT NOT NULL
);

INSERT INTO inventory (part_name, part_price, part_quality, part_image)
VALUES
('Pancreas', 7, 'D', 'http://pancreatic.org/wp-content/uploads/2015/06/Head_Body_Tail-02.jpg'),
('Heart', 400, 'A', 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Heart_anterior_exterior_view.jpg'),
('Small Intestine', 1500, 'S', 'https://d2jmvrsizmvf4x.cloudfront.net/qX6mV4NCQmKH3FMA15M9_small-intestine.jpg');

CREATE TABLE purchase_history (
    purchase_id SERIAL PRIMARY KEY,
    purchase_date DATE DEFAULT NOW(),
    user_id INTEGER REFERENCES users(user_id),
    part_id INTEGER REFERENCES inventory(part_id)
);

INSERT INTO purchase_history (user_id, part_id)
VALUES
(1, 1);

SELECT users.user_id, username, password, email, purchase_date, part_name, inventory.part_id, part_price, part_quality, part_image FROM users 
JOIN purchase_history ON (users.user_id = purchase_history.user_id)
JOIN inventory ON (purchase_history.part_id = inventory.part_id);
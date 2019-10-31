# Body Parts eBay

#
## Front-End (React)

**Dependencies**
- axios
- redux
- react-redux
- react-router-dom
- http-proxy-middleware
- redux-promise-middleware
- node-sass

**Routes**
- Login/Register => '/' => AuthComponent.js
- Store => '/body_parts' => AvailableBodyParts.js
- Profile => '/profile' => Profile.js

**File Structure**
- src/
    - components/
        - AuthComponent.js
        - AvailableBodyParts.js
        - Profile.js
    - App.js
    - index.js
    - index.css => reset.css
    - setupProxy.js
    - ducks/
        - store.js
        - reducer.js

#
## Back-End (Express)

**Dependencies**
- express
- massive
- dotenv
- express-session
- bcrypt

**Server File Structure**
- db/
- server/
    - index.js
    - controllers/
        - userController.js
    - middleware/
        - sessionsCheck.js

**Endpoints**
- User Auth
    - userSession: => get => /auth/session
    - register: => /auth/register
    - logout: => /auth/logout
    - login: => /auth/login

- addToCart => post => /api/add_to_cart
- getInventory => get => /api/get_cart
- deleteFromCart: => delete => /api/delete_from_cart/:id
- updateEmail: => put => /api/update_email
- getPurchaseHistory: => get => /api/purchase_history/:id

- Inventory
    - showInventory: => get => /api/inventory

**Secrets**
```text
CONNECTION_STRING = 
SESSION_SECRET = 
SERVER_PORT =
```

#
## Database (postgresql)

**Tables**
- User
```sql
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);
```
- Body Parts Inventory
```sql
CREATE TABLE inventory (
    part_id SERIAL PRIMARY KEY,
    part_name VARCHAR(64) NOT NULL,
    part_price INTEGER NOT NULL,
    part_quality TEXT NOT NULL,
    part_image TEXT NOT NULL
);
```
- Purchase History
```sql
CREATE TABLE purchase_history (
    purchase_id SERIAL PRIMARY KEY,
    purchase_date DATE DEFAULT NOW(),
    user_id INTEGER REFERENCES users(user_id),
    part_id INTEGER REFERENCES inventory(part_id)
);
```
- Admin(icebox)

#
const bcrypt = require('bcrypt');

module.exports = {
    register: async (req,res,next) => {
        const {username, password, email} = req.body;
        const db = req.app.get('db');
        const foundUser = await db.find_user_by_email(email);
        if(foundUser.length) {
            return res.status(400).send('User already exists.')
        } else {
            const saltRounds = 12;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            const [newUser] = await db.create_user([username, hashedPassword, email]);
            req.session.user = newUser;
            res.status(200).send(req.session.user);
        }
    },
    login: (req,res,next) => {
        const {password, email} = req.body;
        const db = req.app.get('db');
        db.find_user_by_email(email).then(([foundUser]) => {
            if(!foundUser) {
                res.status(400).send('User not found, please register and try again.')
            } else {
                bcrypt.compare(password, foundUser.password).then(isAuthenticated => {
                    if(isAuthenticated){
                        req.session.user = {
                            user_id: foundUser.user_id,
                            username: foundUser.username,
                            email: foundUser.email
                        }
                        res.status(200).send(req.session.user)
                    } else {
                        res.status(400).send('Incorrect password.')
                    }
                })
            }
        });
    },
    logout: (req,res,next) => {
        req.session.destroy();
        res.status(200).send('Enjoy your body parts!');
    },
    userSession: (req,res,next) => {
        res.status(200).send(req.session.user);
    }
}
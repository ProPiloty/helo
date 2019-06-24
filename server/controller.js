const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');
        const {session} = req;
        const userFound = await db.check_username({username});
        if (userFound[0]) return res.status(409).send('Username already exists');
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const createdUser = await db.register_user({
            username,
            password: hash,
            profile_pic: `https://robohash.org/${username}`
        });
        session.user = {
            username: createdUser[0].username,
            profile_pic: createdUser[0].profile_pic
        };
        res.status(200).send(session.user);
    },
    login: async (req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');
        const {session} = req;
        const userFound = await db.check_username({username});
        if (!userFound[0]) return res.status(401).send('User not found');
        const authenticated = bcrypt.compareSync(password, userFound[0].password);
        if (authenticated) {
            session.user = {
                username: userFound[0].username,
                profile_pic: userFound[0].profile_pic
            }
            res.status(200).send(session.user);
        } else {
            return res.status(401).send('Incorrect username or password');
        }
    }
}
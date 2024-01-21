const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', function (req, res)  {
   // console.log(req.headers);
    const header = req.headers["authorization"];
    const token = header && header.split(' ')[1];

   // console.log(header);
    if (!token) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    jwt.verify(token, 'secretOrPrivateKey', (err, user) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        //console.log(user);
        return res.status(200).json({ user: user.username, role: user.role });
    });
});

module.exports = router;
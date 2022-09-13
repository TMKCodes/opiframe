import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const router = express.Router();

let registeredUsers = [];
let registeredUsersID = 0;

let sessions = [];
let sessionsID = 0;

const ttl_to_live_diff = 3600000;

const createToken = () => {
    let token = crypto.randomBytes(64);
    return token.toString('hex');
}

const isUserLogged = (req, res, next) => {
    if(!req.headers.token) {
        return res.status(403).json({ error: "No token provided" });
    }
    for(let i = 0; i < sessions.length; i++) {
        if(req.headers.token === sessions[i].token) {
            let now = Date.now();
            if(now > sessions[i].ttl) {
                sessions.splice(i, 1);
                return res.status(403).json({ error: "Token expired" });
            }
            sessions[i].ttl = now + ttl_to_live_diff;
            req.session = {}
            req.session.user = loggedSessions[i].user;
            return next();
        }
    }
    return res.status(403).json({ error: "Invalid token" });
}

router.post('/authentication/register', (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message : "No body in request" });
    } else if(!req.body.username) {
        return res.status(400).send({ message : "No username in request" });
    } else if(!req.body.password) {
        return res.status(400).send({ message : "No password in request" });
    } else if(req.body.password.length < 8) {
        return res.status(400).send({ message : "Password must be at least 8 characters long" });
    }
    for(let i = 0; i < registeredUsers.length; i++) {
        if(registeredUsers[i].username === req.body.username) {
            return res.status(400).json({ message: "Username already exists" })
        }
    }

    bcrypt.hash(req.body.password, 14, (err, hash) => {
        if(err) {
            return res.status(500).json({ error: err });
        } else {
            let user = {
                id: registeredUsersID++,
                username: req.body.username,
                password: hash
            }
            registeredUsers.push(user);
            return res.status(200).json({ message : "success" });
        }
    });
});

router.post("/authentication/login", (req, res) => {
    if(!req.body) {
        return res.status(400).json({ message: "No body in request" });
    } else if(!req.body.username) {
        return res.status(400).json({ message: "No username in request" });
    } else if(!req.body.password) {
        return res.status(400).json({ message: "No password in request" });
    } else if(req.body.password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    } else if(req.body.username.length < 4) {
        return res.status(400).json({ message: "Username must be at least 4 characters long" });
    }
    for(let i = 0; i < registeredUsers.length; i++) {
        if(registeredUsers[i].username === req.body.username) {
            bcrypt.compare(req.body.password, registeredUsers[i].password, (err, result) => {
                if(err) {
                    return res.status(500).json({ error: err });
                } else if(result) {
                    let token = createToken();
                    let session = {
                        id: sessionsID++,
                        token: token,
                        ttl: Date.now() + ttl_to_live_diff,
                        user: registeredUsers[i].id
                    }
                    sessions.push(session);
                    return res.status(200).json({ token: token });
                } else {
                    return res.status(401).json({ message: "Incorrect password" });
                }
            });
        }
    }
});


export default {
    router,
    isUserLogged
};
const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
// request for signup page
router.post('/', async(req, res) =>{
    const{USERNAME, EMAIL, PASSWORD, FIRSTNAME, LASTNAME, TELEPHONE} = req.body;
    bcrypt.hash(PASSWORD, 10), async (hash) => {
    const user = await db.USERS.create({
        USERNAME: USERNAME,
        EMAIL: EMAIL,
        HASH_PASSWORD: hash,
        FIRST_NAME: FIRSTNAME,
        LAST_NAME: LASTNAME,
        TELEPHONE: TELEPHONE,
        STATUS: 1
    });
    res.json(user);
    }
});

//sign in request
router.post('/signin', async(req, res) => {
    const{USERNAME, PASSWORD} = req.body;
    const user = await db.USERS.findOne({
        where: {
            USERNAME: USERNAME
        }
    });
    if(!user) {
        res.status(401).json({error: 'Incorrect username or password'});
    } else {
        bcrypt.compare(PASSWORD, user.HASH_PASSWORD).then((result) => {
            if(result) {
                res.json(user);
            } else {
                res.status(401).json({error: 'Incorrect username or password'});
            }
        });
    res.json("Logged in successfully");
    }
});




module.exports=router;


const authRouter = require('express').Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { checkUsernameAndEmail }  = require("../db/users")

//path ---> /auth/register
authRouter.post('/register', async (req, res) => {
    //get user data from the req. body 
    const user = req.body;
    console.log("req.body", user);
    //check that username and email are not taken in our database
    const hasUsernameOrEmail = await checkUsernameAndEmail(user.username, user.email
        );
    //if they are taken --> send error response
    if (hasUsernameOrEmail) {
        return res.status(409).send({ message: "Username or Email aready taken." });
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(user.password, parseInt(process.env.SALT || 5 )
    );
    //1st add users to database
    const newUser = await createUser(user)
    //make JWT
    const token = jwt.sign({ id: newUser.user_id }, process.env.JWT || "Ilovecoffe")
    //send a response---> message: "mission complete", JWT
    res.status(201).send({message: "mission complete", token});
});

//login

module.exports = authRouter;
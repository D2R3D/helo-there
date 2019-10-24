const bcrypt = require('bcryptjs')

    
   const register = async(req,res) => {
       const db = req.app.get('db')
       const {username, password, profile_pic} = req.body

       const foundUser = await db.find_user([username])
       if (foundUser[0])  {
       return res.status(409).send('sorry username already taken')
       }

       const salt = bcrypt.genSaltSync(10)
       const hashPass = bcrypt.hashSync(password, salt)
       const newUser = await db.register_user([username, hashPass, profile_pic])

       const user = newUser[0]
       delete newUser[0].password
       req.session.user = {username: user.username, id: user.id, profile_pic: user.profile_pic}
       res
       .status(201)
       .send({ message: 'Logged in', user: req.session.user, loggedIn: true })
   }

    const login = async (req, res) => {
        const { username, password } = req.body; 
        const db = req.app.get('db'); 
        const foundUser = await db.find_user([username]);
    
        if(!foundUser[0]) {
            return res.status(403).send('Username or Password incorrect, please try again.')
        }; 
    
        const authedPassword = bcrypt.compareSync(password, foundUser[0].password); 
    
        if(authedPassword) {
            delete foundUser[0].password;
            req.session.userid = foundUser[0].id;
            const user = foundUser[0]
            req.session.user = {user}
            res.status(200).send({message: 'Welcome Back', user: req.session.user, loggedIn: true}); 
        }
        else {
            res.status(401).send('Username or Password incorrect, please try again.'); 
        };
    };
    
    const logout = (req, res) => {
        req.session.destroy();
        res.send('user logged out')
    }
module.exports ={
    register,
    login,
    logout
}
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.NODE_JWT || "ThisIsMySecretJWT";

const fetchuser=(req,res,next)=>{

    const token= req.header("auth-token");
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

    try {
        const data =jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        console.log(data.user)

        next();
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
}

module.exports = fetchuser;
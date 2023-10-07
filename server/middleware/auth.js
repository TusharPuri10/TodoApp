const jwt = require('jsonwebtoken');

//secret key for jsonwebtoken
const SECRET = 'fisufasfasggaewgfjasbew241qr';

//Authorization
function authorization(req,res,next)
{
  const authHeader = req.headers.authorization;
  if(authHeader)
  {
    const token = authHeader.split(' ')[1];
    jwt.verify(token,SECRET,(err,user)=>{
      if(err)
      {
        res.sendStatus(403);
      }
      else
      {
        req.userId = user.id;
        next();
      }
    })
  }
  else
  {
    res.sendStatus(401)
  }
}

module.exports = {
    authorization,
    SECRET
}
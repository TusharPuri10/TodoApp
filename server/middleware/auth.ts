import jwt from 'jsonwebtoken';
import {Request ,Response ,NextFunction} from 'express';
import {Secret} from 'jsonwebtoken';

//secret key for jsonwebtoken
export const SECRET = 'fisufasfasggaewgfjasbew241qr';

//Authorization
function authorization(req: Request ,res: Response ,next: NextFunction)
{
  const authHeader = req.headers.authorization;
  if(authHeader)
  {
    const token = authHeader.split(' ')[1];
    jwt.verify(token ,SECRET,(err ,payload)=>{
      if(err)
      {
        return res.sendStatus(403);
      }
      if(!payload)
      {
        return res.sendStatus(403);
      }
      if(typeof payload === 'string')
      {
        return res.sendStatus(403);
      }
      req.headers["userId"] = payload.id;
      // req.userId = user.id; // this is not working because Request interface does not have userId property
      next();
    })
  }
  else
  {
    res.sendStatus(401)
  }
}

export default authorization;
// user controller
import users from '../data/users';

const getAllUsers = (req, res) => {
   res.status(201).send({
      status:201,
      data:users
   })
}

export default  {
   getAllUsers
};
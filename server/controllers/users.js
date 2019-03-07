// user controller
import users from '../data/users';

const getAllUsers = (req, res) => {
   res.status(200).send({
      status:200,
      data:users
   })
}

export default  {
   getAllUsers
};
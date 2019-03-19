/* eslint linebreak-style: ["error", "windows"] */
// validator
import Joi from "joi";
import jwt from "jsonwebtoken";
// encryption
import bcrypt from "bcrypt";
// Status code
import ST from "../../config/status";
import pool from "../../config/db";

class Users {
  static me(req, res) {
    pool
    .query(`SELECT * from users where id = $1`, [jwt.decode(req.token, {complete: true}).payload.user])
    .then(response => {  
      if(response.rowCount === 0 ) return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error: 'This account is not longer active '});
      return res.status(ST.OK).send({status: ST.OK, data: response.rows });

    })
    .catch(e => res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: e }));
  }
  static all(req, res) {
    return console.log("i love me")
  }
  static updateProfile(req, res) {
    return console.log("i love me")
  }
}

export default Users;

// const getAllUsers = (req, res) => {
//     const query = "SELECT * FROM users";
//     pool
//       .query(query)
//       .then(data => {
//         if(data.rowCount === 0){ 
//           res.status(204).send({
//             status: ST.NO_CONTENT,
//             error: "No users registered yet!" 
//           });
//           return;
//         }
//         // data.rows.filter((res))
//         data.rows.filter(user => {
//           user.password = "******";
//             return user;
//         }); 
//         res.status(ST.OK).send({
//           status: ST.OK,
//           data: data.rows
//         });
//       })
//       .catch(e => {
//         if(e.routine === 'parserOpenTable') return res.status(ST.NO_CONTENT).send({status: "No database table found!" });
//         if (e.routine === "scanner_yyerror")
//           return res
//             .status(ST.BAD_REQUEST)
//             .send({
//               status: ST.BAD_REQUEST,
//               error: "Error in your query occured"
//             });
//         if (e)
//           return res
//             .status(ST.BAD_REQUEST)
//             .send({ status: ST.BAD_REQUEST, error: "Something went wrong!" });
//       });
// }

// export default  {
//    getAllUsers
// };
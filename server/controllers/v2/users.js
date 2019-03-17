/* eslint linebreak-style: ["error", "windows"] */
import pool from "../../config/db";
import ST from "../../config/status";
import dotenv from "dotenv";
dotenv.config();

const getAllUsers = (req, res) => {
    const query = "SELECT * FROM users";
    pool
      .query(query)
      .then(data => {
        if(data.rowCount === 0){ 
          res.status(204).send({
            status: ST.NO_CONTENT,
            error: "No users registered yet!" 
          });
          return;
        }
        // data.rows.filter((res))
        data.rows.filter(user => {
          user.password = "******";
            return user;
        }); 
        res.status(ST.OK).send({
          status: ST.OK,
          data: data.rows
        });
      })
      .catch(e => {
        if(e.routine === 'parserOpenTable') return res.status(ST.NO_CONTENT).send({status: "No database table found!" });
        if (e.routine === "scanner_yyerror")
          return res
            .status(ST.BAD_REQUEST)
            .send({
              status: ST.BAD_REQUEST,
              error: "Error in your query occured"
            });
        if (e)
          return res
            .status(ST.BAD_REQUEST)
            .send({ status: ST.BAD_REQUEST, error: "Something went wrong!" });
      });
}

export default  {
   getAllUsers
};
// user controller

class Contacts {
   static all(req, res) {
     pool
     .query(`SELECT id, firstname, lastname, email, phone, profile, createdon from users`)
     .then(response => {  
       if(response.rowCount === 0 ) return res.status(ST.NOT_FOUNT).send({status: ST.NOT_FOUNT, error: 'This account is not longer active '});
       return res.status(ST.OK).send({status: ST.OK, data: response.rows });
 
     })
     .catch(e => res.status(ST.BAD_REQUEST).send({status: ST.BAD_REQUEST, error: "Whooops, Error occured. Try again" }));
   }
 }

export default Contacts;
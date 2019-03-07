// user controller
import contacts from '../data/contacts';

const getAllContacts = (req, res) => {
   res.status(200).send({
      status:200,
      data:contacts
   })
}

export default  {
   getAllContacts
};
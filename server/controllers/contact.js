// user controller
import contacts from '../data/contacts';

const getAllContacts = (req, res) => {
   res.status(201).send({
      status:201,
      data:contacts
   })
}

export default  {
   getAllContacts
};
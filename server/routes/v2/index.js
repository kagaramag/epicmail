import { Router } from "express";

// user controller
import Users from "./../../controllers/v2/users";
import Auth from "./../../controllers/v2/auth";

// contact controller
import Contact from "./../../controllers/v2/contact";

// group controller
import Group from "./../../controllers/v2/groups";

// email controller
import Message from "./../../controllers/v2/messages";
// check authethication
import authethicate from "./../../middleware/authethicate";
import isAdmin from './../../middleware/isAdmin'


// Register Swagger
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger/v2/swagger.json";

// register routes
const router = Router();

// users routes
router.get("/users", authethicate, isAdmin, Users.all); //OK
router.post("/auth/signup", Auth.signup); //OK
router.post("/auth/login", Auth.login); //OK
router.post("/auth/reset", Auth.reset);
router.post("/auth/verify", Auth.verify);
router.put("/auth/new-passowrd", Auth.newPassword);
router.put("/profile", authethicate, Users.updateProfile);
router.get("/profile", authethicate, Users.me);

// contact routes
router.get("/contacts", authethicate, Contact.getAllContacts);

// group routes
router.post("/groups", authethicate, isAdmin, Group.createGroup); //OK
router.get("/groups", authethicate, isAdmin, Group.getAllGroup); //OK
router.post("/groups/:id/users", authethicate, isAdmin, Group.assignUserGroup); //OK
router.patch("/groups/:id/name", authethicate, isAdmin, Group.editGroup); //OK
router.delete("/groups/:id", authethicate, isAdmin, Group.deleteGroup);
router.delete("/groups/:id/users/:id", authethicate, isAdmin, Group.deleteUserFromGroup);
router.post("/groups/:id/messages", authethicate, isAdmin, Message.sendEmailGroup);

// email routes
router.post("/messages", authethicate, Message.compose); //OK
router.post("/messages/draft", authethicate, Message.draft); //OK
router.get("/messages", authethicate, Message.receivedEmails); //OK
router.get("/messages/unread", authethicate, Message.unreadEmails);
router.get("/messages/read", authethicate, Message.readEmails); 
router.get("/messages/sent", authethicate, Message.sentEmails); //OK
router.delete("/messages/:id", authethicate, Message.deleteEmail);
router.get("/messages/:id", authethicate, Message.specificEmail);

// Swagger documentation
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(swaggerDocument));

export default router;

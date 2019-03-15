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

// Register Swagger
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger/v2/swagger.json";

// register routes
const router = Router();

// users routes
router.get("/users", Users.getAllUsers);
router.post("/auth/signup", Auth.signup);
router.post("/auth/login", Auth.login);

// contact routes
router.get("/contacts", Contact.getAllContacts);

// group routes
router.post("/groups", Group.createGroup);
router.get("/groups", Group.getAllGroup);

// email routes
router.post("/messages", Message.compose);
router.get("/messages", Message.receivedEmails);
router.get("/messages/unread", Message.unreadEmails);
router.get("/messages/read", Message.readEmails);
router.get("/messages/sent", Message.sentEmails);
router.delete("/messages/:id", Message.deleteEmail);
router.get("/messages/:id", Message.specificEmail);

// Swagger documentation
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(swaggerDocument));

export default router;

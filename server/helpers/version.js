
import dotenv from 'dotenv';

// Update environment variables with config settings.
dotenv.config();
const version = process.env.API_VERSION;

export default version;
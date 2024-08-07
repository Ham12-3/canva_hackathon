import { app } from "./app";

import { connectDb } from "./utils/db";

require("dotenv").config();

// Create server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
  connectDb();
});

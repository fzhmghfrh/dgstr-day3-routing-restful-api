const express = require('express');
const userRouter = require('./routers/userRoutes.js'); // Import user routes

const port = 3000;
const app = express();

app.use(express.json());
app.use('/users', userRouter); // Use the user routes

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

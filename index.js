const express = require('express'); 
const testDbConnection = require('./lib/db');
const User = require('./models/user.model.js');
const router = require('./routes/index');
const globalErrorHandler = require('./middlewares/global.error')

const app = express();
const user = new User();

const PORT = 3000;

app.use(express.json());

testDbConnection();

app.use('/',router);

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

app.use(globalErrorHandler);


app.listen(PORT, () => {
    console.log(`server is running on http://127.0.0.1:${PORT}`);
});
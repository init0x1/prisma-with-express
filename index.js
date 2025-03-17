const express = require('express'); 

const app = express();


const PORT = 3000;

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

app.listen(PORT, () => {
    console.log(`server is running on http://127.0.0.1:${PORT}`);
});
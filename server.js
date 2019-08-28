const express = require('express');

const app = express();

app.get('/', (req,res) => {

    res.send('This is working');
})

app.listen(3005, () => {
    console.log('app is running on port 3005');
})
const express = require('express');
const app = express();

app.get('*', (req, res, next) => {
    console.log(`${process.env.SERVICE} > \t Hit hard on port ${process.env.PORT}`);
    res.send({ status: Date.now() });
});

console.log(`Service ${process.env.SERVICE} listening on port ${process.env.PORT}`);

app.listen(process.env.PORT);

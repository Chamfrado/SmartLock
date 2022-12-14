const express =  require('express');
const app = express();
const routes = require('./routes/routes');

const port = 3333;

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Server running! -> port ${port}`);
});



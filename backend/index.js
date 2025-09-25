let express = require('express');
let cors = require('cors'); 

let app = express();
app.use(cors());




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
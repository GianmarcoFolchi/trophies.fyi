const express = require('express');
const app = express()
var port = 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`))
const express = require('express');
const app = express();



app.listen(process.env.PORT || 8000, () => `listening on port ${process.env.PORT || 8000}`);
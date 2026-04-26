const express = require('express');
const db = require('./db/config');
const cors = require('cors');
const session = require('express-session');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true } 
}));

// ovo MORA na dnu!
app.use('/api', require('./router')); // kad vidi /api onda koristi router. 
                                      // Jer svaka ROUTE pocinje sa /api

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const emailEntry = `${new Date().toISOString()} - ${email}\n`;
    
    fs.appendFile(path.join(__dirname, 'emails.txt'), emailEntry, (err) => {
        if (err) {
            console.error('Failed to write email:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json({ success: true, message: 'Subscibed successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});

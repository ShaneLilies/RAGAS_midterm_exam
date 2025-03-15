const express = require('express'); 

const app = express(); 

const PORT = 3000; 

// GET route at "/test"
app.get('/test', (req, res) => {
    // Send a JSON response 
    res.json({ message: 'Express is working! Felix Ragas Jr.' });
});

// Start the server and listen it to PORT 3000
app.listen(3000, () => {
    // add successful message
    console.log('Server is running on port 3000');
});
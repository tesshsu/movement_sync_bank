const express = require('express');
const bodyParser = require('body-parser');
const { validateData } = require('./validateData');

const app = express();
app.use(bodyParser.json());
// TODO: could add a middleware to check if the user is authenticated
// TODO: could add a notification system to notify the user when the data is valid or not
app.post('/movements/validation', async (req, res) => {
    const { movements, balances } = req.body;
    try {
        const validationResult = await validateData(movements, balances);
        if (validationResult.success === true) {
            res.status(202).json({ message: 'Accepted' });
        } else {
            res.status(418).json({ message: 'I’m a teapot', reasons: validationResult.message, info: validationResult.info });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;
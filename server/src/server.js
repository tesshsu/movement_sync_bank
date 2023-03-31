const express = require('express');
const bodyParser = require('body-parser');
const { validateData } = require('./validateData');

const app = express();
app.use(bodyParser.json());

app.post('/movements/validation', async (req, res) => {
    const { movements, balances } = req.body;
    console.log('movements', movements);
    console.log('balances', balances);
    try {
        const validationResult = await validateData(movements, balances);
        console.log('validationResult', validationResult);
        if (validationResult.success === true) {
            res.status(202).json({ message: 'Accepted' });
        } else {
            res.status(418).json({ message: 'I’m a teapot', reasons: validationResult.message });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

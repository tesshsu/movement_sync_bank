require('dotenv').config(); // Load environment variables from .env file

module.exports = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'banking',
        port: process.env.DB_PORT || 5432,
    },
    movements:  [
        {
            "id": "1",
            "label": "Payment 1",
            "amount": -500,
            "date": "2022-01-01"
        },
        {
            "id": "2",
            "label": "Payment 2",
            "amount": -300,
            "date": "2022-01-02"
        },
        {
            "id": "3",
            "label": "Deposit",
            "amount": 800,
            "date": "2022-01-03"
        },
        {
            "id": "4",
            "label": "Deposit",
            "amount": 800,
            "date": "2022-01-04"
        }
    ],
    balances:[
        {
            "date": "2022-01-01",
            "balance": -500
        },
        {
            "date": "2022-01-02",
            "balance": -800
        },
        {
            "date": "2022-01-03",
            "balance": 0
        },
        {
            "date": "2022-01-04",
            "balance": 800
        }
    ],
};


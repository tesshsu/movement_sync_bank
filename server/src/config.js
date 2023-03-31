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
    movements: [
        { id: 1, date: '2022-02-01', label: 'Salary', amount: 3000 },
        { id: 2, date: '2022-02-02', label: 'Rent', amount: -1000 },
        { id: 3, date: '2022-02-03', label: 'Groceries', amount: -200 },
    ],
    balances: [
        { date: '2022-02-01', balance: 3000 },
        { date: '2022-02-02', balance: 2000 },
        { date: '2022-02-03', balance: 1800 },
    ],
};


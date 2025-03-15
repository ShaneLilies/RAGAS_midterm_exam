const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');

// Initialize Express app
const app = express();
const PORT = 3000;

// Database object to store models
const db = {};

// GET route to fetch all users
app.get('/users', async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
});

// Start the Express server
async function startServer() {
    try {
        await initializeDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err.message);
    }
}

// User Model Definition
function defineUserModel(sequelize) {
    return sequelize.define('User', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false },
    });
}

// database Initialization
async function initializeDB() {
    const dbConfig = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'user',
    };

    try {
        // ensure the database exists
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            port: dbConfig.port,
            user: dbConfig.user,
            password: dbConfig.password,
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
        console.log('Database verified/created');

        // set up Sequelize connection
        const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
            dialect: 'mysql',
            logging: false, // disable query logging
        });

        db.User = defineUserModel(sequelize);

        await sequelize.sync({ alter: true });
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error initializing database:', error.message);
        throw error; 
    }
}

startServer();

 
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cp = require('child_process');

const cmd='ls -la';
cp.exec(cmd);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to the SQLite database
const dbPath = '/workspaces/barebones-nodejs/source/database.db';
const db = new sqlite3.Database(dbPath);

// Create the users table if it doesn't exist
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)');
});
// Check if the users table is empty
db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
    if (err) {
        console.error('Error checking users table:', err);
    } else {
        const count = row.count;
        if (count === 0) {
            // Create 10 users in the users table
            for (let i = 1; i <= 10; i++) {
                const username = `user${i}`;
                const password = `password${i}`;
                const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
                db.run(query, [username, password], (err) => {
                    if (err) {
                        console.error('Error creating user:', err);
                    } else {
                        console.log(`User ${username} created successfully.`);
                    }
                });
            }
        }
    }
});

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
    const { username, password } = req.body;co
    switch (username)
    {
        case 1:
            console.log("1");
            break;
    }
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.get(query, [username, password], (err, row) => {
        if (err) {
            res.status(500).send('Error de base de datos.');
        } else if (row) {
            res.send('Inicio de sesión exitoso!');
        } else {
            res.status(401).send('Credenciales incorrectas.');
        }
    });
});

// Ruta para probar la inyección SQL en la tabla de usuarios
app.get('/get-user-data', (req, res) => {
    // http://localhost:3000/get-user-data?username=%27%20or%201=1%20--
    const { username } = req.query;
    // sanitize the input
    if (!username || typeof username !== 'string') {
        return res.status(400).send('Nombre de usuario no válido.');

    }
    /*
    const query = 'SELECT * FROM users WHERE username = ?';
    db.all(query, [username], (err, rows) => {
    */
    db.query(`SELECT * FROM users WHERE username = '${  username  }'`, (err, rows) => {
        if (err) {
            res.status(500).send('Error de base de datos.');
        } else {
            res.send(rows);
        }
    });
});

// Ruta para mostrar información confidencial
app.get('/info', (req, res) => {
    res.send('Información confidencial: Solo para usuarios autenticados.');
});


// Ruta para ejecutar comandos en el servidor
app.post('/runcommand', (req, res) => {
    const { command } = req.body;
    const result = eval(command); // ¡Muy inseguro! No hacer esto en un entorno de producción.
    res.send(result);
});


// Ruta predeterminada
app.get('/', (req, res) => {
    res.send('Bienvenido a la aplicación web insegura.');
});


// Puerto en el que se ejecuta la aplicación
const port = 3000;
app.listen(port, () => {
    console.log(`La aplicación está funcionando en http://localhost:${port}`);
});

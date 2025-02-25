import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
  user: 'tpl522_11', // replace with your terminal username
  host: 'localhost',
  database: 'mybooks',
  password: '', // replace with your password
  port: 5432,
})

const getBooks = (request, response) => {
  pool.query('SELECT * FROM books ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
export default getBooks;

// import { Client } require ('pg'); //Clientfrom 'pg';
// const Pool = require ('pg')({
//   user: 'nsimmons91', // replace with your PostgreSQL username
//   host: 'localhost',
//   database: 'mybooks',
//   password: 'Snuffer3', // replace with your PostgreSQL password
//   port: 5432,
// });

// client.connect() 
// .then(() => console.log('Connected to PostgreSQL'))
// .catch(err => console.error('Error connecting to PostgreSQL:', err.stack));

//  export default client;

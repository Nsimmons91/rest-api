import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'tpl522_11', // replace with your database username
  host: 'localhost',
  database: 'mybooks',
  password: '', // left blank because there is no assigned pswd
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
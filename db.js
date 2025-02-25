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

const getBooksById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM books WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createBooks = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO books (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Book added with ID: ${results.rows[0].id}`)
  })
}

const updateBooks = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE books SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteBooks = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM books WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Book deleted with ID: ${id}`)
  })
}


export default getBooks;
export { getBooksById, createBooks, updateBooks, deleteBooks };
// module.exports = {
//   getBooks,
//   getBooksById,
//   createBooks,
//   updateBooks,
//   deleteBooks,
// }
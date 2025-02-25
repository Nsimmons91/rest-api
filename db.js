import { Client } require ('pg'); //Clientfrom 'pg';
const client = new Client({
  user: 'nsimmons91', // replace with your PostgreSQL username
  host: 'localhost',
  database: 'mybooks',
  password: 'Snuffer3', // replace with your PostgreSQL password
  port: 5432,
});

client.connect() 
.then(() => console.log('Connected to PostgreSQL'))
.catch(err => console.error('Error connecting to PostgreSQL:', err.stack));

 export default client;
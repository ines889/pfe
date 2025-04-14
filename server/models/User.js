const { Client } = require('pg');

// Créer une instance du client PostgreSQL
const client = new Client({
  user: 'username', // Remplace par ton nom d'utilisateur PostgreSQL
  host: 'localhost',
  database: 'mydatabase', // Remplace par le nom de ta base de données
  password: 'password', // Remplace par ton mot de passe PostgreSQL
  port: 5432,
});

// Se connecter à la base de données
client.connect();

// Fonction pour créer un utilisateur
const createUser = async (email, password) => {
  try {
    const result = await client.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, password]
    );
    return result.rows[0]; // Retourner l'utilisateur créé
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    throw error;
  }
};

// Fonction pour trouver un utilisateur par email
const findUserByEmail = async (email) => {
  try {
    const result = await client.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0]; // Retourner l'utilisateur trouvé
  } catch (error) {
    console.error('Erreur lors de la recherche de l\'utilisateur:', error);
    throw error;
  }
};

module.exports = { createUser, findUserByEmail };

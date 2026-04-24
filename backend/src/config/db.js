// backend/src/config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config(); // Para ler o arquivo .env

// Configuração da conexão
const sequelize = new Sequelize(
    process.env.DB_NAME,     // Nome do banco
    process.env.DB_USER,     // Usuário
    process.env.DB_PASS,     // Senha
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',    // ou 'postgres'
        logging: false,      // Desativa mensagens chatas no console
        define: {
            timestamps: true, // Cria colunas 'createdAt' e 'updatedAt' automaticamente
            underscored: true // Transforma CamelCase em snake_case (ex: userId -> user_id)
        }
    }
);

// Testar a conexão
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('❌ Erro ao conectar no banco de dados:', error);
    }
}

testConnection();

module.exports = sequelize;
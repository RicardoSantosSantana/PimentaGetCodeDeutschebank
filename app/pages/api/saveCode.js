import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ message: 'Code is required' });
    }

    try {
      // Conectando ao MySQL
      const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
      });

      // Salvando o code na tabela
      const [result] = await connection.execute(
        'INSERT INTO codes (code) VALUES (?)',
        [code]
      );

      // Fechando a conexão
      await connection.end();

      // Retornando sucesso
      res.status(200).json({ message: 'Code saved successfully', id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}

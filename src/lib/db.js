import mysql from 'serverless-mysql';

export const db = mysql ({
  config: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  }
});

export async function sql_query (query_string, values = []) {
  try {
    const results = await db.query(query_string, values);
    await db.end();
    return results;

  } catch (error) {
    throw Error(error.message);
  }
}
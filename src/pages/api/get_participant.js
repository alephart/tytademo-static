import { sql_query } from '../../lib/db';

export default async (req, res) => {
  console.log('req body', req.body);
  try {
    const results = await sql_query(`
      SELECT * FROM participants
      WHERE participant_id = '${req.body.id}';
    `);

    return res.status(200).send(results);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
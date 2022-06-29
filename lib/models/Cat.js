const pool = require('../utils/pool');

module.exports = class Cat {
  id;
  name;
  age;
  eyes;
  fur;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.age = row.age;
    this.eyes = row.eyes;
    this.fur = row.fur;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM cats
      `
    );

    if (!rows[0]) return null;

    return rows.map((row) => new Cat(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM cats WHERE id=$1', [id]);
    if (!rows[0]) return null;
    return new Cat(rows[0]);
  }

  static async insert({ name, age, eyes, fur }) {
    const { rows } = await pool.query('INSERT INTO cats (name, age, eyes, fur) VALUES ($1, $2, $3, $4) RETURNING *', [name, age, eyes, fur]);
    return new Cat(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM cats WHERE id = $1 RETURNING *',
      [id]
    );
    return new Cat(rows[0]);
  }
};

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

    return new Cat(rows[0]);
  }

};

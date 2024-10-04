// src/seeds/role.seed.ts
import db from '../config/database';

export const seedRoles = async () => {
  try {
    await db.none('INSERT INTO roles (id, role_name) VALUES ($1, $2)', [1, 'Admin']);
    await db.none('INSERT INTO roles (id, role_name) VALUES ($1, $2)', [2, 'User']);
    await db.none('INSERT INTO roles (id, role_name) VALUES ($1, $2)', [3, 'Manager']);
    console.log('Roles seeding completed!');
  } catch (error) {
    console.error('Error seeding roles:', error);
  }
};

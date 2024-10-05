// src/seeds/user.seed.ts
import db from '../config/database';
import { faker } from '@faker-js/faker'; // Import faker
import * as bcrypt from 'bcrypt';

export const seedUsers = async (numUsers: number) => {
  try {
    for (let i = 0; i < numUsers; i++) {
      const name = faker.person.fullName(); // Generate nama secara otomatis
      const username = faker.internet.userName(); // Generate username otomatis
      const address = faker.location.streetAddress(); // Generate address acak
      const password = await bcrypt.hash('password123', 10); // Default password hash
      const role_id = faker.helpers.arrayElement([1, 2, 3]); // Pilih role_id secara acak antara Admin, User, dan Manager

      await db.none(
        'INSERT INTO users (name, username, password, address, role_id) VALUES ($1, $2, $3, $4, $5)',
        [name, username, password, address, role_id]
      );
    }
    console.log(`${numUsers} users seeded successfully!`);
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

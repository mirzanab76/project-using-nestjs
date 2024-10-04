// src/seeds/index.ts
import { seedRoles } from './role.seed';
import { seedUsers } from './user.seed';

const runSeeders = async () => {
  try {
    await seedRoles(); // Jalankan seeder untuk role
    await seedUsers(50); // Ganti '50' dengan jumlah user yang ingin kamu generate
    console.log('All seeders executed successfully!');
  } catch (error) {
    console.error('Error running seeders:', error);
  }
};

runSeeders();

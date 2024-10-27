// import sequelize from './config/database.js';
import User from './models/userModel.js';
import Task from './models/taskModel.js';

// (async () => {
//   try {
//     await sequelize.sync({ force: true }); // force: true drops and recreates all tables
//     console.log('All models were synchronized successfully!');
//   } catch (error) {
//     console.error('Error syncing models:', error);
//   }
// })();

import sequelize from './config/database.js';
import bcrypt from 'bcrypt';

(async () => {
  try {
    await sequelize.sync({ force: true });

    const passwordHash = await bcrypt.hash('1234', 10);

    await User.bulkCreate([
      { name: 'Admin', email: 'admin@123.com', password: passwordHash, role: 'admin' },
    ]);

    console.log('Database synchronized and initial data created.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();


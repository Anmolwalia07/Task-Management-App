import User from './user.js';
import Task from './task.js';
import Project from './project.js';

// User - Task Relationship (One-to-Many)
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

// Project - Task Relationship (One-to-Many)
Project.hasMany(Task, { foreignKey: 'projectId' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

export { User, Task, Project };

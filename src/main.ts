import mongoose from 'mongoose';
import * as userService from './services/userService.js';
import { OrganizationModel } from './models/organization.js';
import { UserModel } from './models/user.js';
import { config, logger } from './config.js';

/**
 * 1) SETUP DATABASE: Connection & Seeding
 * This mimics an initialization script or a test setup.
 */
async function setupDatabase() {
    try {
        await mongoose.connect(config.mongoUri);
        logger.info('🚀 Connected to MongoDB at %s', config.mongoUri);

        logger.warn('🧹 Cleaning database collections...');
        await UserModel.deleteMany({});
        await OrganizationModel.deleteMany({});

        logger.info('🌱 Seeding initial data...');
        const orgs = await OrganizationModel.insertMany([
            { name: 'Tech Solutions', country: 'Spain' },
            { name: 'Global Corp', country: 'USA' }
        ]);

        const usersData = [
            { name: 'Marc', email: 'm@test.com', role: 'ADMIN', organization: orgs[0]._id },
            { name: 'Anna', email: 'a@test.com', role: 'USER', organization: orgs[0]._id },
            { name: 'John', email: 'j@test.com', role: 'EDITOR', organization: orgs[1]._id }
        ];

        const users = await UserModel.insertMany(usersData);
        logger.info('✅ Database ready with %d users', users.length);
        
        return users; // Return users to use in the demo
    } catch (err) {
        logger.error(err, '❌ Database setup failed');
        throw err;
    }
}

/**
 * 2) RUN SERVICE DEMO: Testing Business Logic
 * This mimics how a controller in Express would call our services.
 */
async function runServiceDemo(seedUsers: any[]) {
    try {
        logger.info('🔍 Starting Service Layer Demo...');

        // Demo CRUD: Find Populated User
        const firstUserId = seedUsers[0]._id.toString();
        const user = await userService.getUserById(firstUserId);
        
        if (user) {
            logger.info({ 
                name: user.name, 
                org: (user.organization as any).name 
            }, 'Populate successful');
        }

        // Demo Aggregation: Statistics
        const stats = await userService.getStatsByCountry();
        logger.info({ stats }, 'Aggregation pipeline results');

    } catch (err) {
        logger.error(err, '❌ Service demo failed');
    }
}

// Orchestration of the two parts
async function start() {
    try {
        const users = await setupDatabase();
        await runServiceDemo(users);
    } catch (err) {
        logger.fatal('Application failed to start');
    } finally {
        await mongoose.disconnect();
        logger.info('👋 Disconnected');
    }
}

start();
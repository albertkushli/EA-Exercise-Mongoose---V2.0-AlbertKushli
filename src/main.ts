import mongoose from 'mongoose';
import * as projectService from './services/projectService.js';
import { OrganizationModel } from './models/organization.js';
import { ProjectModel } from './models/project.js';
import { config, logger } from './config.js';

async function start() {
    try {
        // 1. CONEXIÓN (Usando la config del proyecto)
        await mongoose.connect(config.mongoUri);
        logger.info('🚀 CONNECTED TO MONGODB - PROJECT DEMO');

        // 2. LIMPIEZA
        logger.warn('清理 Cleaning database...');
        await ProjectModel.deleteMany({});
        await OrganizationModel.deleteMany({});

        // 3. SEEDING (Creamos la organización para el proyecto)
        const org = await OrganizationModel.create({ 
            name: 'Laboratorios Acme', 
            country: 'Spain' 
        });

        // 4. DEMO: CREATE
        const newProj = await projectService.createProject({
            name: 'Sistema de Navegación AI',
            description: 'Desarrollo de drones inteligentes',
            organization: org._id as any
        });
        logger.info({ project: newProj.name }, '✅ Project created via Service Layer');

        // 5. DEMO: GET BY ID + POPULATE (REQUISITO DEL SEMINARIO)
        const found = await projectService.getProjectById(newProj._id.toString());
        if (found) {
            logger.info({ 
                projectName: found.name, 
                orgName: (found.organization as any).name 
            }, '🔍 Populate successful: Project linked to Organization');
        }

        // 6. DEMO: UPDATE
        await projectService.updateProject(newProj._id.toString(), { status: 'DONE' });
        logger.info('🆙 Status updated to DONE');

        // 7. DEMO: LIST ALL (.lean)
        const all = await projectService.listAllProjects();
        logger.info({ total: all.length }, '📋 ListAll successful using .lean()');

    } catch (err) {
        logger.error(err, '❌ Demo failed');
    } finally {
        await mongoose.disconnect();
        logger.info('👋 Disconnected');
    }
}

start();
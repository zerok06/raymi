import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma-client';
import { validateData } from '../../middlewares/validationMiddleware';
import { createOrganizationSchema, updateOrganizationSchema, createInteresSchema } from './organizationSchema';

const router: Router = Router();

/* ------------------- ORGANIZACIONES ------------------- */

/* Crear una Organización */
router.post('/organizations', validateData(createOrganizationSchema), async (req: Request, res: Response) => {
    try {
        const { name, description, image, banner } = req.body;

        const newOrganization = await prisma.organizacion.create({
            data: {
                name,
                description,
                image,
                banner,
            },
        });

        res.json({ msg: 'Organization created successfully', organization: newOrganization });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create organization' });
    }
});

/* Obtener todas las Organizaciones */
router.get('/organizations', async (req: Request, res: Response) => {
    try {
        const organizations = await prisma.organizacion.findMany({
            include: { interes: true, event: true }, // Incluir relaciones
        });
        res.json(organizations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch organizations' });
    }
});

/* Actualizar una Organización */
router.put('/organizations/:id', validateData(updateOrganizationSchema), async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, image, banner } = req.body;

    try {
        const updatedOrganization = await prisma.organizacion.update({
            where: { id: parseInt(id, 10) },
            data: { name, description, image, banner },
        });

        res.json({ msg: 'Organization updated successfully', organization: updatedOrganization });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update organization' });
    }
});

/* Eliminar una Organización */
router.delete('/organizations/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.organizacion.delete({ where: { id: parseInt(id, 10) } });
        res.json({ msg: 'Organization deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete organization' });
    }
});

/* ------------------- INTERESES ------------------- */

/* Crear un Interés */
router.post('/interests', validateData(createInteresSchema), async (req: Request, res: Response) => {
    try {
        const { userId, organizacionId } = req.body;

        const newInteres = await prisma.interes.create({
            data: {
                userId,
                organizacionId,
            },
        });

        res.json({ msg: 'Interest created successfully', interes: newInteres });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create interest' });
    }
});

/* Obtener todos los Intereses */
router.get('/interests', async (req: Request, res: Response) => {
    try {
        const interests = await prisma.interes.findMany({
            include: { usuario: true, organizacion: true }, // Incluir relaciones
        });

        res.json(interests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch interests' });
    }
});

/* Eliminar un Interés */
router.delete('/interests/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.interes.delete({ where: { id: parseInt(id, 10) } });
        res.json({ msg: 'Interest deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete interest' });
    }
});

export default router;

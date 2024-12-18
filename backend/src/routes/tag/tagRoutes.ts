import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma-client';
import { validateData } from '../../middlewares/validationMiddleware';
import { createTagSchema, updateTagSchema } from './tagSchema';

const router: Router = Router();

/* ------------------- TAGS ------------------- */

/* Crear un Tag */
router.post('/tags', validateData(createTagSchema), async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;

        const newTag = await prisma.tag.create({
            data: { name, description },
        });

        res.json({ msg: 'Tag created successfully', tag: newTag });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create tag' });
    }
});

/* Obtener todos los Tags */
router.get('/tags', async (req: Request, res: Response) => {
    try {
        const tags = await prisma.tag.findMany();
        res.json(tags);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch tags' });
    }
});

/* Actualizar un Tag */
router.put('/tags/:id', validateData(updateTagSchema), async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const updatedTag = await prisma.tag.update({
            where: { id: parseInt(id, 10) },
            data: { name, description },
        });

        res.json({ msg: 'Tag updated successfully', tag: updatedTag });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update tag' });
    }
});

/* Eliminar un Tag */
router.delete('/tags/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.tag.delete({ where: { id: parseInt(id, 10) } });
        res.json({ msg: 'Tag deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete tag' });
    }
});


export default router;

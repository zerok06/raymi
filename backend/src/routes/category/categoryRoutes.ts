import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma-client';
import { validateData } from '../../middlewares/validationMiddleware';
import { createCategorySchema, updateCategorySchema } from './categorySchema';

const router: Router = Router();

/* ------------------- CATEGORÍAS ------------------- */

/* Crear una Categoría */
router.post('/categories', validateData(createCategorySchema), async (req: Request, res: Response) => {
    try {
        const { name, description, image } = req.body;

        const newCategory = await prisma.category.create({
            data: { name, description, image },
        });

        res.json({ msg: 'Category created successfully', category: newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create category' });
    }
});

/* Obtener todas las Categorías */
router.get('/categories', async (req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

/* Actualizar una Categoría */
router.put('/categories/:id', validateData(updateCategorySchema), async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, image } = req.body;

    try {
        const updatedCategory = await prisma.category.update({
            where: { id: parseInt(id, 10) },
            data: { name, description, image },
        });

        res.json({ msg: 'Category updated successfully', category: updatedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update category' });
    }
});

/* Eliminar una Categoría */
router.delete('/categories/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.category.delete({ where: { id: parseInt(id, 10) } });
        res.json({ msg: 'Category deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

export default router;

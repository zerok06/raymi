import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma-client';
import type { CreateCommentType, UpdateCommentType } from './commentSchema';
import { updateCommentSchema, createCommentSchema } from './commentSchema';
import { validateData } from '../../middlewares/validationMiddleware';
const router: Router = Router();



router.post('/comments', validateData(createCommentSchema), async (req: Request, res: Response) => {
    try {
        const { message, userId, eventId }: CreateCommentType = req.body;

        const newComment = await prisma.comentarios.create({
            data: {
                comentario: message,
                userId,
                eventId,
            },
        });

        res.status(201).json({ msg: 'message creado con éxito', comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo crear el message', details: error });
    }
});

router.get('/comments/event/:eventId', async (req: Request, res: Response) => {
    const { eventId } = req.params;

    try {
        const comments = await prisma.comentarios.findMany({
            where: { eventId: parseInt(eventId, 10) },
            include: {
                usuario: true, // Incluir detalles del usuario que hizo el message
                event: true,   // Incluir detalles del evento (si es necesario)
            },
            orderBy: {
                createAt: 'desc', // Ordenar por fecha de creación descendente
            },
        });

        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudieron obtener los comentarios' });
    }
});

/* Actualizar un message */
router.put('/comments/:id', validateData(updateCommentSchema), async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Validar datos con Zod
        const { message }: UpdateCommentType = req.body;

        // Actualizar message en la base de datos
        const updatedComment = await prisma.comentarios.update({
            where: { id: parseInt(id, 10) },
            data: { comentario: message },
        });

        res.json({ msg: 'message actualizado con éxito', comment: updatedComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo actualizar el message', details: error });
    }
});

/* Eliminar un message */
router.delete('/comments/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        // Eliminar message de la base de datos
        await prisma.comentarios.delete({
            where: { id: parseInt(id, 10) },
        });

        res.json({ msg: 'message eliminado con éxito', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo eliminar el message', success: false });
    }
});

export default router;

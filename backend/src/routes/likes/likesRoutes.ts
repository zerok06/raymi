import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma-client';
import { validateData } from '../../middlewares/validationMiddleware';
import { likeSchema, LikeType } from './likesSchema';

const router: Router = Router();

router.post('/likes', validateData(likeSchema), async (req: Request, res: Response) => {
    try {
        // Validar datos con Zod
        const { userId, eventId }: LikeType = req.body;

        // Verificar si el usuario ya dio like al evento
        const existingLike = await prisma.likes.findFirst({
            where: { userId, eventId },
        });

        if (existingLike) {
            res.status(400).json({ msg: 'El usuario ya dio like a este evento' });
            return
        }

        // Crear un nuevo like
        const newLike = await prisma.likes.create({
            data: { userId, eventId },
        });

        res.status(201).json({ msg: 'Like agregado con éxito', like: newLike });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo agregar el like', details: error });
    }
});

/* Quitar Like de un Evento */
router.delete('/likes', validateData(likeSchema), async (req: Request, res: Response) => {
    try {
        // Validar datos con Zod
        const { userId, eventId }: LikeType = req.body;

        // Verificar si el like existe
        const existingLike = await prisma.likes.findFirst({
            where: { userId, eventId },
        });

        if (!existingLike) {
            res.status(404).json({ msg: 'El like no existe' });
            return
        }

        // Eliminar el like
        await prisma.likes.delete({
            where: { id: existingLike.id },
        });

        res.json({ msg: 'Like eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo eliminar el like', details: error });
    }
});

/* Obtener el Número de Likes de un Evento */
router.get('/likes/event/:eventId', async (req: Request, res: Response) => {
    const { eventId } = req.params;

    try {
        // Contar el número de likes asociados al evento
        const likeCount = await prisma.likes.count({
            where: { eventId: parseInt(eventId, 10) },
        });

        res.json({ eventId: parseInt(eventId, 10), likeCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo obtener el número de likes' });
    }
});

/* Verificar si un Usuario dio Like a un Evento */
router.get('/likes', async (req: Request, res: Response) => {
    try {
        // Validar datos con Zod
        const { userId, eventId } = likeSchema.parse(req.query);

        // Verificar si el usuario dio like al evento
        const existingLike = await prisma.likes.findFirst({
            where: { userId: Number(userId), eventId: Number(eventId) },
        });

        res.json({ liked: !!existingLike });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se pudo verificar el like', details: error });
    }
});

export default router;

import { Router, Request, Response } from 'express';
import prisma from '../../lib/prisma-client';
import { validateData } from '../../middlewares/validationMiddleware'; // Opcional si quieres validar con un middleware
import { createEventSchema, updateEventSchema } from './eventSchema'; // Define tus esquemas de validación
import type { CreateEventType, UpdateEventType } from './eventSchema'; // Define los tipos correspondientes

const router: Router = Router();

router.post('/event', validateData(createEventSchema), async (req: Request, res: Response) => {
    try {
        const {
            title,
            images,
            description,
            fecha,
            ubicacion,
            userId,
            organizacionId,
            categories,
            tags,
        }: CreateEventType = req.body;

        const newEvent = await prisma.event.create({
            data: {
                title,
                images,
                description,
                fecha: new Date(fecha),
                ubicacion,
                usuario: userId ? { connect: { id: userId } } : undefined,
                organizacion: organizacionId ? { connect: { id: organizacionId } } : undefined,
                event_category: {
                    create: categories?.map((categoryId) => ({
                        category: { connect: { id: categoryId } },
                    })),
                },
                event_tag: {
                    create: tags?.map((tagId) => ({
                        tag: { connect: { id: tagId } },
                    })),
                },
            },
        });

        res.json({ msg: 'Event created successfully', event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create event' });
    }
});

/* Obtener todos los eventos */
router.get('/events', async (req: Request, res: Response) => {
    try {
        const events = await prisma.event.findMany({
            include: {
                event_category: { include: { category: true } },
                event_tag: { include: { tag: true } },
                usuario: true,
                organizacion: true,

            },
        });

        res.json({ events });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

/* Obtener un evento por ID */
router.get('/events/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const event = await prisma.event.findUnique({
            where: { id: parseInt(id, 10) },
            include: {
                event_category: { include: { category: true } },
                event_tag: { include: { tag: true } },
                usuario: true,
                organizacion: true,
                comentarios: {
                    include: {
                        usuario: true,
                    },
                    orderBy: {
                        createAt: 'desc',
                    }
                }
                , likes: {
                    take: 3,

                },
                _count: {
                    select: { likes: true, comentarios: true }
                }
            },

        });

        if (!event) {
            res.status(404).json({ error: 'Event not found' });
        }

        res.json({ event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch event' });
    }
});

/* Actualizar un evento */
router.put('/events/:id', validateData(updateEventSchema), async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const {
            title,
            images,
            description,
            fecha,
            ubicacion,
            userId,
            organizacionId,
            categories,
            tags,
        }: UpdateEventType = req.body;

        // Actualizar el evento
        const updatedEvent = await prisma.event.update({
            where: { id: parseInt(id, 10) },
            data: {
                title,
                images,
                description,
                fecha: fecha ? new Date(fecha) : undefined,
                ubicacion,
                usuario: userId ? { connect: { id: userId } } : undefined,
                organizacion: organizacionId ? { connect: { id: organizacionId } } : undefined,
                event_category: categories
                    ? {
                        deleteMany: {},
                        create: categories.map((categoryId) => ({
                            category: { connect: { id: categoryId } },
                        })),
                    }
                    : undefined,
                event_tag: tags
                    ? {
                        deleteMany: {},
                        create: tags.map((tagId) => ({
                            tag: { connect: { id: tagId } },
                        })),
                    }
                    : undefined,
            },
        });

        res.json({ msg: 'Event updated successfully', event: updatedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update event' });
    }
});

/* Eliminar un evento */
router.delete('/events/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.event.delete({
            where: { id: parseInt(id, 10) },
        });

        res.json({ msg: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

export default router;

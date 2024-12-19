export interface EventType {
    id: number;
    title: string;
    images: string;
    description: string;
    fecha: Date;
    ubicacion: string;
    createAt: Date;
    updateAt: Date;
    event_category: EventCategory[];
    event_tag: EventTag[];
    usuario?: User;
    userId?: number;
    organizacion?: Organizacion;
    organizacionId?: number;
}

export interface Tag {
    id: number;
    name: string;
    description: string;
    event_tag: EventTag[];
}

export interface Category {
    id: number;
    name: string;
    description: string;
    image: string;
    createAt: Date;
    updateAt: Date;
    event_category: EventCategory[];
}

export interface EventCategory {
    id: number;
    event: Event;
    eventId: number;
    category: Category;
    categoryId: number;
}

export interface EventTag {
    id: number;
    event: Event;
    eventId: number;
    tag: Tag;
    tagId: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    events: Event[];
}

export interface Organizacion {
    id: number;
    name: string;
    events: Event[];
}
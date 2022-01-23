import { getRepository } from "typeorm";
import { Event } from "../../entities/Event";

type EventRequest = {
  title: string;
  description?: string;
  label: string;
  day: Date;
  time: Date;
  city?: string;
};

export class CreateEventService {
  async execute({
    title,
    description,
    label,
    day,
    time,
    city
  }: EventRequest): Promise<Event | Error> {
    const repo = getRepository(Event);
    const event = repo.create({ title, description, label, day, time, city });

    if (await repo.findOne({ title })) return new Error("Event already exists");

    await repo.save(event);

    return event;
  }
}

import { getRepository } from "typeorm";
import { Event } from "../../entities/Event";

type EventRequest = {
  title: string;
  description?: string;
  label: string;
  day: Date;
};

export class CreateEventService {
  async execute({
    title,
    description,
    label,
    day
  }: EventRequest): Promise<Event | Error> {
    const repo = getRepository(Event);
    const event = repo.create({ title, description, label, day });

    if (await repo.findOne({ title })) return new Error("Event already exists");

    await repo.save(event);

    return event;
  }
}

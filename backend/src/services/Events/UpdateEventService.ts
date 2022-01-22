import { getRepository } from "typeorm";
import { Event } from "../../entities/Event";

type EventUpdateRequest = {
  id: string;
  title: string;
  description?: string;
  label: string;
};

export class UpdateEventService {
  async execute({ id, title, description, label }: EventUpdateRequest): Promise<Event | Error> {
    const repo = getRepository(Event);

    const event = await repo.findOne(id);

    if (!event) return new Error("Event does not exists");

    event.title = title ? title : event.title;
    event.description = description ? description : event.description;
    event.label = label ? label : event.label;

    await repo.save(event);

    return event;
  }
}

import { getRepository } from "typeorm";
import { Event } from "../../entities/Event";

type EventUpdateRequest = {
  id: string;
  title: string;
  description?: string;
  label: string;
  day: Date;
  time: Date;
  city?: string;
};

export class UpdateEventService {
  async execute({ id, title, description, label, day, time, city }: EventUpdateRequest): Promise<Event | Error> {
    const repo = getRepository(Event);

    const event = await repo.findOne(id);

    if (!event) return new Error("Event does not exists");

    event.title = title ? title : event.title;
    event.description = description ? description : event.description;
    event.label = label ? label : event.label;
    event.day = day ? day : event.day;
    event.time = time ? time : event.time;
    event.city = city ? city : event.city;

    await repo.save(event);

    return event;
  }
}

import { getRepository } from "typeorm";
import { Event } from "../../entities/Event";

export class GetAllEventService {
  async execute(): Promise<Event[]> {
    const repo = getRepository(Event);
    const events = await repo.find();
    
    return events;
  }
}

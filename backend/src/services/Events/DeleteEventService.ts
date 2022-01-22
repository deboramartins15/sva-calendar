import { getRepository } from "typeorm";
import { Event } from "../../entities/Event";

export class DeleteEventService {
  async execute(id: string): Promise<void | Error> {
    const repo = getRepository(Event);

    if (!(await repo.findOne(id))) return new Error("Event does not exists");

    await repo.delete(id);
  }
}

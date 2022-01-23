import { Request, Response } from "express";
import { CreateEventService } from "../../services/Events/CreateEventService";

export class CreateEventController {
  async handle(request: Request, response: Response) {
    const { title, description, label, day, time, city } = request.body;

    const service = new CreateEventService();

    const result = await service.execute({ title, description, label, day, time, city });
    if (result instanceof Error)
      return response.status(400).json(result.message);

    return response.json(result);
  }
}

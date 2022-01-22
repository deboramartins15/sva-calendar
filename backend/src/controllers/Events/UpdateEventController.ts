import { Request, Response } from "express";
import { UpdateEventService } from "../../services/Events/UpdateEventService";

export class UpdateEventController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { title, description, label, day } = request.body;

    const service = new UpdateEventService();

    const result = await service.execute({ id, title, description, label, day });
    if (result instanceof Error)
      return response.status(400).json(result.message);

    return response.json(result);
  }
}

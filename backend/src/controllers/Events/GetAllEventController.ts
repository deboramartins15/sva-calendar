import { Request, Response } from "express";
import { GetAllEventService } from "../../services/Events/GetAllEventService";

export class GetAllEventController {
  async handle(request: Request, response: Response) {
    const service = new GetAllEventService();

    const events = await service.execute();

    return response.json(events);
  }
}

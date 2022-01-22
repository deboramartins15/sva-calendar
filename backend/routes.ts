import { Router } from "express";
import { CreateEventController } from "./src/controllers/Events/CreateEventController";
import { DeleteEventController } from "./src/controllers/Events/DeleteEventController";
import { GetAllEventController } from "./src/controllers/Events/GetAllEventController";
import { UpdateEventController } from "./src/controllers/Events/UpdateEventController";

const routes = Router();

routes.post("/events", new CreateEventController().handle);
routes.get("/events", new GetAllEventController().handle);
routes.delete("/events/:id", new DeleteEventController().handle);
routes.put("/events/:id", new UpdateEventController().handle);

export { routes };

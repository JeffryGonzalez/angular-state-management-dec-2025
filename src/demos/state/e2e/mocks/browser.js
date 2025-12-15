import { setupWorker } from "msw/browser";
import { handlers } from "./handler";

window.worker = setupWorker(...handlers);

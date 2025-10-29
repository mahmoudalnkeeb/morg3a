import notification from "notificationapi-node-server-sdk";
import { config } from "./env";

notification.init(
  config.notification.clientId,
  config.notification.clientSecret,
  {
    baseURL: config.notification.baseURL,
  },
);

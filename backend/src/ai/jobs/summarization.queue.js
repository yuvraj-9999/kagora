import { Queue } from "bullmq";
import { bullmqConnection } from "../../integrations/redis/bullmq.connection.js";

export const summarizationQueue = new Queue("conversation-summarization",{
    connection: bullmqConnection,
});
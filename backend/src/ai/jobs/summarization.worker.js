import { Worker } from "bullmq";
import { bullmqConnection } from "../../integrations/redis/bullmq.connection.js";
import { getConversationById, updateConversationSummary } from "../../modules/conversations/conversation.service.js";
import { selectSummaryBatch } from "../context/context.manager.js";
import { generateSummary } from "../context/summarizer.js";

export const summarizationWorker = new Worker(
    "conversation-summarization",
    async (job) => {
        const { conversationId, userId } = job.data;

        const conversation = await getConversationById(
            conversationId,
            userId
        );

        
        const batch = await selectSummaryBatch(
            conversation.messages,
            conversation.summaryUpToMessageId
        );

    
        if (batch.messages.length === 0) {
            return;
        }

        const summaryMessages = batch.messages.map((message) => {
            if (message.role === "user") {
                return {
                    role: "user",
                    content: message.content,
                };
            }

            return {
                role: "assistant",
                content: message.content,
            };
        });

        

        const summary = await generateSummary(
            conversation.summary,
            summaryMessages
        );

        

        await updateConversationSummary(
            conversationId,
            userId,
            summary,
            batch.lastMessageId,
        );

        

    },
    {
        connection: bullmqConnection,
    }
);
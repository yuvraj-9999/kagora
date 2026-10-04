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

        console.log("Conversation loaded:", conversation._id);

        const batch = await selectSummaryBatch(
            conversation.messages,
            conversation.summaryUpToMessageId
        );

        console.log("Summary batch size:", batch.messages.length);
        console.log("Summary batch tokens:", batch.tokenCount);
        console.log("Summary batch last ID:", batch.lastMessageId);

        if(batch.messages.length === 0){
            console.log("No messages available for summarization");
            return;
        }

        const summaryMessages = batch.messages.map((message) => {
            if(message.role === "user"){
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

        console.log("calling generateSummary");

        const summary = await generateSummary(conversation.summary, summaryMessages);

        console.log("gnereated summary: ", summary);

        await updateConversationSummary(
            conversationId,
            userId,
            summary,
            batch.lastMessageId,
        );

        console.log("Summary updated successfully");
        
    },
    {
        connection: bullmqConnection,
    }
);
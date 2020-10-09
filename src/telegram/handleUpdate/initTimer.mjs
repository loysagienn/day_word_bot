import { DEFAULT_LEFT_TIME, INTERVAL } from '../constants';
import updateChatMessage from './updateChatMessage';

const initTimer = (contexts, message) => {
    const chatId = message.chat.id;
    const messageId = message.message_id;

    const leftTime = DEFAULT_LEFT_TIME;

    const intervalId = setInterval(() => updateChatMessage(contexts, chatId), INTERVAL * 1000);

    contexts.set(chatId, {
        chatId,
        messageId,
        leftTime,
        intervalId,
    });
};

export default initTimer;

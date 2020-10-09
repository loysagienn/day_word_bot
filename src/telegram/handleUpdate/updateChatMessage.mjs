import { sendRequest } from '../utils';
import { INTERVAL } from '../constants';
import getLeftTimeMessage from './getLeftTimeMessage';

const updateChatMessage = async (contexts, chatId) => {
    const context = contexts.get(chatId);

    if (!context) {
        return;
    }

    context.leftTime -= INTERVAL;

    if (context.leftTime <= 0) {
        clearInterval(context.intervalId);

        await sendRequest('editMessageText', {
            method: 'POST',
            body: {
                chat_id: context.chatId,
                message_id: context.messageId,
                text: 'Время вышло',
            },
        });

        contexts.remove(chatId);

        return;
    }

    await sendRequest('editMessageText', {
        method: 'POST',
        body: {
            chat_id: context.chatId,
            message_id: context.messageId,
            text: getLeftTimeMessage(context.leftTime),
        },
    });
};

export default updateChatMessage;

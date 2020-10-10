import { sendRequest, getMessageSender } from '../utils';
import { logMessage } from '../logger';
import { DEFAULT_LEFT_TIME } from '../constants';
import getLeftTimeMessage from '../getLeftTimeMessage';

const sendTimerStartMessge = async (chatId) => {
    const timerStartMessage = {
        chat_id: chatId,
        text: 'Таймер запущен, отправьте текст в ответном сообщении',
        reply_markup: {
            remove_keyboard: true,
        },
    };

    await sendRequest('sendMessage', { body: timerStartMessage, method: 'POST' });
};

const timerStart = async (contexts, message) => {
    const chatId = message.chat.id;

    if (contexts.timerIsActive(chatId)) {
        const sender = getMessageSender(message);

        logMessage(`${sender} как-то попытался запустить таймер когда таймер был уже запущен`);

        return;
    }

    await sendTimerStartMessge(chatId);

    const timerMessage = {
        chat_id: chatId,
        text: getLeftTimeMessage(DEFAULT_LEFT_TIME),
    };

    const { body } = await sendRequest('sendMessage', { body: timerMessage, method: 'POST' });

    if (body.ok) {
        const messageId = body.result.message_id;

        contexts.initTimer(chatId, messageId);
    }
};

export default timerStart;

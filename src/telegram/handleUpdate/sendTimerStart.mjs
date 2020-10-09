import { sendRequest, getMessageSender } from '../utils';
import { logMessage } from '../logger';
import { DEFAULT_LEFT_TIME } from '../constants';
import getLeftTimeMessage from './getLeftTimeMessage';
import initTimer from './initTimer';

const sendTimerStart = async (contexts, message) => {
    const chatId = message.chat.id;

    if (contexts.has(chatId)) {
        const sender = getMessageSender(message);

        logMessage(`${sender} как-то попытался запустить таймер когда таймер был уже запущен`);

        return;
    }

    const timerStart = {
        chat_id: chatId,
        text: 'Таймер запущен, отправьте текст в ответном сообщении',
        reply_markup: {
            remove_keyboard: true,
        },
    };

    await sendRequest('sendMessage', { body: timerStart, method: 'POST' });

    const timer = {
        chat_id: chatId,
        text: getLeftTimeMessage(DEFAULT_LEFT_TIME),
    };
    const { body } = await sendRequest('sendMessage', { body: timer, method: 'POST' });

    if (body.ok) {
        initTimer(contexts, body.result);
    }
};

export default sendTimerStart;

import { getMessageSender } from '../utils';
import { logMessage } from '../logger';
import { SET_TIMER_TEXT, SHOW_WORD_TEXT, SHOW_ANOTHER_WORD_TEXT } from '../constants';

import sendDescription from './sendDescription';
import sendWordOfDay from './sendWordOfDay';
import sendTimerStart from './sendTimerStart';
import handleLetter from './handleLetter';

const handleDefaultMessage = (message) => {
    sendDescription(message);
};

const handleMessage = (contexts, message) => {
    const chatId = message.chat.id;

    const sender = getMessageSender(message);

    if (contexts.has(chatId)) {
        logMessage(`${sender} отправил письмо:\n${message.text}`);

        return handleLetter(contexts, message);
    }

    if (message.text === SHOW_WORD_TEXT) {
        logMessage(`${sender} запросил слово`);

        return sendWordOfDay(message);
    }

    if (message.text === SHOW_ANOTHER_WORD_TEXT) {
        logMessage(`${sender} запросил новое слово`);

        return sendWordOfDay(message);
    }

    if (message.text === SET_TIMER_TEXT) {
        logMessage(`${sender} запустил таймер`);

        return sendTimerStart(contexts, message);
    }

    logMessage(`${sender} отправил сообщение:\n${message.text}`);

    return handleDefaultMessage(message);
};

export default handleMessage;

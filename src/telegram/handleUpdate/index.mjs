import { pluralize } from 'app/utils';
import { sendRequest, getMessageSender } from '../utils';
import { logMessage } from '../logger';

const SET_TIMER_TEXT = 'Запустить таймер';
const SET_TIMER_KEYBOARD = [
    [
        {
            text: SET_TIMER_TEXT,
        },
    ],
];

const DEFAULT_LEFT_TIME = 600;
const INTERVAL = 10;

const contexts = {};

const getTime = (leftTime) => {
    const seconds = leftTime % 60;
    const minutes = Math.round((leftTime - seconds) / 60);

    const secondsStr = seconds === 0 ? null : `${seconds} ${pluralize(['секунда', 'секунды', 'секунд'], seconds)}`;
    const minutesStr = minutes === 0 ? null : `${minutes} ${pluralize(['минута', 'минуты', 'минут'], minutes)}`;

    return [minutesStr, secondsStr].filter(Boolean).join(' ');
};

const updateChatMessage = async (chatId) => {
    const context = contexts[chatId];

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

        delete contexts[chatId];

        return;
    }

    await sendRequest('editMessageText', {
        method: 'POST',
        body: {
            chat_id: context.chatId,
            message_id: context.messageId,
            text: `Осталось ${getTime(context.leftTime)}`,
        },
    });
};

const initTimer = (message) => {
    const chatId = message.chat.id;
    const messageId = message.message_id;

    const leftTime = DEFAULT_LEFT_TIME;

    const intervalId = setInterval(() => updateChatMessage(chatId), INTERVAL * 1000);

    contexts[chatId] = {
        chatId,
        messageId,
        leftTime,
        intervalId,
    };
};

const sendTimerStart = async (message) => {
    const chatId = message.chat.id;

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
        text: `Осталось ${getTime(DEFAULT_LEFT_TIME)}`,
    };
    const { body } = await sendRequest('sendMessage', { body: timer, method: 'POST' });

    if (body.ok) {
        initTimer(body.result);
    }
};

const sendWordOfDay = async (message) => {
    const answerBody = {
        chat_id: message.chat.id,
        text: 'Слово дня "Белочка"',
        reply_markup: {
            keyboard: SET_TIMER_KEYBOARD,
        },
    };

    await sendRequest('sendMessage', { body: answerBody, method: 'POST' });
};

const handleDefaultMessage = (message) => {
    sendWordOfDay(message);
};

const handleLetter = async (message) => {
    const chatId = message.chat.id;
    const context = contexts[chatId];

    clearInterval(context.intervalId);

    await sendRequest('sendMessage', {
        method: 'POST',
        body: {
            chat_id: chatId,
            text: 'Спасибо! Мы типа сохранили ваш текст, что с ним дальше делать хрен знает',
        },
    });

    delete contexts[chatId];
};

const handleMessage = (message) => {
    const chatId = message.chat.id;

    const sender = getMessageSender(message);

    if (contexts[chatId]) {
        logMessage(`${sender} отправил письмо:\n${message.text}`);

        return handleLetter(message);
    }

    if (message.text === SET_TIMER_TEXT) {
        logMessage(`${sender} запустил таймер`);

        return sendTimerStart(message);
    }

    logMessage(`${sender} отправил сообщение:\n${message.text}`);

    return handleDefaultMessage(message);
};

const handleUpdate = async (update) => {
    const { message } = update;

    console.log('update', update);

    if (!message) {
        return null;
    }

    return handleMessage(message);
};

export default handleUpdate;

import { sendRequest } from './utils';

const SET_TIMER_TEXT = 'Запустить таймер';
const SET_TIMER_KEYBOARD = [
    [
        {
            text: SET_TIMER_TEXT,
        },
    ],
];

const sendWordOfDay = async (message) => {
    const answerBody = {
        chat_id: message.chat.id,
        text: 'Слово дня "Белочка"',
        reply_markup: {
            keyboard: SET_TIMER_KEYBOARD,
        },
    };

    const { body } = await sendRequest('sendMessage', { body: answerBody, method: 'POST' });

    console.log('send message', body);
};

const setTimerStart = async (message) => {
    const answerBody = {
        chat_id: message.chat.id,
        text: 'Таймер запущен, у вас есть 10 минут',
        reply_markup: {
            remove_keyboard: true,
        },
    };

    const { body } = await sendRequest('sendMessage', { body: answerBody, method: 'POST' });

    console.log('send message', body);
};

const handleUpdate = async (update) => {
    const { message } = update;

    console.log('update', update);

    if (!message) {
        return null;
    }

    if (message.text === SET_TIMER_TEXT) {
        return setTimerStart(message);
    }

    return sendWordOfDay(message);
};

export default handleUpdate;

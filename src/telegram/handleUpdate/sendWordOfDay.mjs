import { sendRequest } from '../utils';
import { SET_TIMER_KEYBOARD } from '../constants';

const sendWordOfDay = async (message) => {
    const answerBody = {
        chat_id: message.chat.id,
        text: 'Слово "Белочка"',
        reply_markup: {
            keyboard: SET_TIMER_KEYBOARD,
        },
    };

    await sendRequest('sendMessage', { body: answerBody, method: 'POST' });
};

export default sendWordOfDay;

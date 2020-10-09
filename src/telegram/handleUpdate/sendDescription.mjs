import { sendRequest } from '../utils';
import { SHOW_WORD_KEYBOARD } from '../constants';

const sendDescription = async (message) => {
    const answerBody = {
        chat_id: message.chat.id,
        text: 'Этот бот для того чтобы за 10 минут писать рандомный текст про какое-либо слово',
        reply_markup: {
            keyboard: SHOW_WORD_KEYBOARD,
        },
    };

    await sendRequest('sendMessage', { body: answerBody, method: 'POST' });
};

export default sendDescription;

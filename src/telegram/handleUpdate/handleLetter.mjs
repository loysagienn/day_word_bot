import { sendRequest } from '../utils';
import { SHOW_ANOTHER_WORD_KEYBOARD } from '../constants';

const handleLetter = async (contexts, message) => {
    const chatId = message.chat.id;
    const context = contexts.remove(chatId);

    if (!context) {
        return;
    }

    clearInterval(context.intervalId);

    await sendRequest('sendMessage', {
        method: 'POST',
        body: {
            chat_id: chatId,
            text: 'Спасибо! Мы типа сохранили ваш текст, что с ним дальше делать хрен знает',
            reply_markup: {
                keyboard: SHOW_ANOTHER_WORD_KEYBOARD,
            },
        },
    });
};

export default handleLetter;

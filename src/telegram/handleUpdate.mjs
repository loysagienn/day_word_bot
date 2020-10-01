import got from 'got';
import { PRIVATE } from 'config';

const handleUpdate = async (update) => {
    const { message } = update;

    if (!message) {
        return;
    }

    console.log('message', message);

    const answerBody = {
        chat_id: message.chat.id,
        text: 'Слово дня "Белочка"',
    };

    const { body } = await got.post(`https://api.telegram.org/bot${PRIVATE.BOT_TOKEN}/sendMessage`, {
        json: answerBody,
        responseType: 'json',
    });

    console.log('send message', body);
};

export default handleUpdate;

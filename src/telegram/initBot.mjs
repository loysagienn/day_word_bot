import getUpdates from './getUpdates';
import { sendRequest } from './utils';

const initBot = async () => {
    let body;

    try {
        const result = await sendRequest('getMe');

        body = result.body;
    } catch (error) {
        console.log('Init bot request error', error);

        return;
    }

    if (!body.ok) {
        console.error('Init bot error', body);

        throw new Error('Init bot error');
    }

    console.log('Init bot:', body.result);

    console.log('commands', (await sendRequest('getMyCommands')).body);

    getUpdates();
};

export default initBot;

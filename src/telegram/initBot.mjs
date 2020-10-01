import got from 'got';
import { PRIVATE } from 'config';
import { stringifyQueryParams } from 'app/utils';
import handleUpdate from './handleUpdate';

const getUpdates = async (offset) => {
    const queryParams = stringifyQueryParams({
        offset,
        timeout: 5,
    });

    const { body } = await got.get(`https://api.telegram.org/bot${PRIVATE.BOT_TOKEN}/getUpdates?${queryParams}`, {
        responseType: 'json',
    });

    if (!body.ok) {
        console.log('Get updates error', body);

        return;
    }

    const updates = body.result;

    if (updates.length === 0) {
        getUpdates(offset);

        return;
    }

    updates.forEach(handleUpdate);

    const lastUpdate = updates[updates.length - 1];

    const lastUpdateId = lastUpdate.update_id;

    getUpdates(lastUpdateId + 1);
};

const initBot = async () => {
    const { body } = await got.get(`https://api.telegram.org/bot${PRIVATE.BOT_TOKEN}/getMe`, {
        responseType: 'json',
    });

    if (!body.ok) {
        console.error('Init bot error', body);

        throw new Error('Init bot error');
    }

    console.log('Bot:', body.result);

    getUpdates();
};

export default initBot;

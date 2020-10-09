import handleUpdate from './handleUpdate';

import { sendRequest } from './utils';

const getUpdates = async (contexts, offset) => {
    let body;

    try {
        const result = await sendRequest('getUpdates', {
            query: { offset, timeout: 5 },
        });

        body = result.body;
    } catch (error) {
        console.log('Get updates request error', error);

        getUpdates(contexts, offset);

        return;
    }

    if (!body.ok) {
        console.log('Get updates error', body);

        return;
    }

    const updates = body.result;

    if (updates.length === 0) {
        getUpdates(contexts, offset);

        return;
    }

    updates.forEach((update) => handleUpdate(contexts, update));

    const lastUpdate = updates[updates.length - 1];

    const lastUpdateId = lastUpdate.update_id;

    getUpdates(contexts, lastUpdateId + 1);
};

export default getUpdates;

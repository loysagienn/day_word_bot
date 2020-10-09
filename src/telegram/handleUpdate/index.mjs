import handleMessage from './handleMessage';

const handleUpdate = async (contexts, update) => {
    const { message } = update;

    console.log('update', update);

    if (!message) {
        return null;
    }

    return handleMessage(contexts, message);
};

export default handleUpdate;

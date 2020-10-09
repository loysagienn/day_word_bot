class Contexts {
    constructor() {
        this.contexts = {};
    }

    has(chatId) {
        return Boolean(this.contexts[chatId]);
    }

    get(chatId) {
        return this.contexts[chatId] || null;
    }

    set(chatId, context) {
        this.contexts[chatId] = context;

        return context;
    }

    remove(chatId) {
        const context = this.get(chatId);

        delete this.contexts[chatId];

        return context;
    }
}

export const initContexts = async () => new Contexts();

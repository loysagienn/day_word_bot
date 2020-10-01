import { toPairs } from 'ramda';

export default (queryParams) => {
    if (!queryParams) {
        return '';
    }

    const queryParamsArr = toPairs(queryParams).filter(([, value]) => (value !== undefined && value !== null));

    if (queryParamsArr.length === 0) {
        return '';
    }

    return queryParamsArr.map(([key, value]) => `${key}=${value}`).join('&');
};

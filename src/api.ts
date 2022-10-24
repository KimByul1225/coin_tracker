const BASE_URL = `https://api.coinpaprika.com/v1`

export function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then((response) => response.json()
    );
}

export function fetchCoinHistory(id: string) {
    // const endDate = Math.floor(Date.now() / 1000);
    // const startDate = endDate - 60 * 60 * 24 * 7 * 2;
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${id}`).then((response) => response.json()
    );
};






export const handlefetchCoins = async (page: number) => {
    const response = await (await fetch(`${BASE_URL}/tickers?page=${page}`)).json();
    return response?.slice(0, 100);
};

export const handleFetchCoin = async (id: string | undefined) => {
    return await (await fetch(`${BASE_URL}/coins/${id}`)).json();
};

export const handleFetchTicker = async (id: string | undefined) => {
    return await (await fetch(`${BASE_URL}/tickers/${id}`)).json();
};



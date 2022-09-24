const BASE_URL = `https://api.coinpaprika.com/v1`

export function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then((response) => response.json()
    );
}

export const handlefetchCoins = async (page: number) => {
    const response = await (await fetch(`${BASE_URL}/tickers?page=${page}`)).json();
    return response?.slice(0, 100);
};
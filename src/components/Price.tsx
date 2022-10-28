import React from 'react';
import { useQuery } from "react-query";
import { fetchCoinHistory } from '../api';
import ApexChart from "react-apexcharts";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

interface ChartProps{
    coinId: string;
}

interface IHistorycal {
    time_open: string ;
    time_close: any,
    open: number,
    high: number,
    low: number,
    close: number,
    volume: number,
    market_cap: number
}

function Price({ coinId }: ChartProps) {

    const isDark = useRecoilValue(isDarkAtom)
    const{ isLoading, data } = useQuery<IHistorycal[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),{
        refetchInterval: 1000000,
    });
    const mappingData = data?.map((price) => ({ x: price.time_open, y: [price.open, price.high, price.low, price.close] }));

    console.log("priceData", data);
    console.log("Mapping", mappingData);


    return (
        <div>
            Price
        </div>
    );
}

export default Price;
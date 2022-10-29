import React from 'react';
import { useQuery } from "react-query";
import { fetchCoinHistory } from '../api';
import ApexChart from "react-apexcharts";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import Loading from './Loading';

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
    const{ isLoading, data } = useQuery<IHistorycal[]>(["ohlc", "price", coinId], () => fetchCoinHistory(coinId),{
        refetchInterval: 1000000,
    });
    const mappingData = data?.map((price) => ({ x: price.time_open, y: [Number(price.open), Number(price.high),Number(price.low), Number(price.close)] }));


    const sample = [
        {
            x: 1682035200,
            y: [51.98, 56.29, 51.59, 53.85]
        },
        {
            x: 1682121600,
            y: [51.98, 56.29, 51.59, 53.85]
        },
        {
            x: 1682208000,
            y: [51.98, 56.29, 51.59, 53.85]
        }
    ]


    console.log("Mapping", mappingData);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            {
                isLoading? "Loading..." 
                : 
                <>
                    <ApexChart 
                        type="candlestick"
                        series={[{ data: mappingData ? mappingData : sample }]}
                        height={400}
                        options={{
                            chart: {
                                toolbar: { show: true, tools: { download: true, pan: false, reset: false, zoom: false, zoomin: false, zoomout: false } },
                                background: isDark ? "black" : "white",
                            },
                            theme: { mode: isDark ? "dark" : "light" },
                            title: { text: "CandleStick Chart", align: "center", style: { color: isDark ? "white" : "black" } },
                            xaxis: { type: "datetime" },
                            yaxis: {
                                labels: { formatter: (value: number) => `$${value.toFixed(2)}` },
                                axisBorder: { show: false },
                                axisTicks: { show: false },
                                tooltip: { enabled: true },
                            },
                        }}
                        
                    />
                </>
            }
        </div>
    );
}

export default Price;
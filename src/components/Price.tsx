import React, { useEffect } from 'react';
import { useQuery } from "react-query";
import { fetchCoinHistory } from '../api';
import ApexChart from "react-apexcharts";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import Loading from './Loading';
import { IHistorycal } from '../types/common';

interface ChartProps{
    coinId: string;
}


function Price({ coinId }: ChartProps) {

    const isDark = useRecoilValue(isDarkAtom)
    const{ isLoading, data } = useQuery<IHistorycal[]>(["ohlc", "price", coinId], () => fetchCoinHistory(coinId),{
        refetchInterval: 1000000,
    });
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



    const mappingData = data?.map((price) => ({ x: price.time_open, y: [Number(price.open), Number(price.high),Number(price.low), Number(price.close)] }));

    



    console.log("mappingData", mappingData);

    return (
        <div>
            {
                isLoading? <Loading />
                : 
                <>
                    <ApexChart 
                        type="candlestick"
                        series={[{ data: mappingData ? mappingData : sample }]}
                        height={500}
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
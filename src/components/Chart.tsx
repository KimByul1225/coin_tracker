import React from 'react';
import { useQuery } from "react-query";
import { fetchCoinHistory } from '../api';
import ApexChart from "react-apexcharts";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import { IHistorycal } from '../types/common';
import Loading from './Loading';

/**
 * @description 상세페이지 라인차트를 위한 컴포넌트
 */

interface ChartProps{
    coinId: string;
}

function Chart({ coinId }: ChartProps) {
    const isDark = useRecoilValue(isDarkAtom)
    const{ isLoading, data } = useQuery<IHistorycal[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),{
        refetchInterval: 1000000,
    });
    const openData = data?.map((price) => Number(price.open)) as number[];;
    const closeData = data?.map(price => Number(price.close)) as number[];
    const categoryDateData = data?.map(price => new Date(price.time_close * 1000).toUTCString());
    return (
        <div>
            {
                isLoading? <Loading/> 
                : 
                <>
                    <ApexChart 
                        type="line"
                        series={[
                            { name: "Opening Price", data: openData },
                            { name: "Closing Price", data: closeData },
                        ]}
                        height={500}
                        options={{
                            theme:{
                                mode: isDark ? "dark" : "light",
                            },
                            chart: {
                                toolbar: { show: true, tools: { download: true, pan: false, reset: false, zoom: false, zoomin: false, zoomout: false } },
                                background: isDark ? "black" : "white",
                            },
                            title: { text: "History Chart", align: "center", style: { color: isDark ? "white" : "black" } },
                            
                            stroke: {
                                curve: "smooth",
                                width: 5,
                            },
                            grid:{
                                show: true,
                            },
                            // xaxis: {
                            //     tickAmount: 14,
                            //     labels: { show: true, rotate: 0, datetimeFormatter: {month: "mmm 'yy"}},
                            //     type: "datetime",
                            //     categories: categoryDateData,
                            //     axisBorder: { show: false },
                            //     axisTicks: { show: false },
                            // },

                            // yaxis: { labels: { show: true, align: "center", formatter: (value: number) => `$${value.toFixed(2)}` }, axisBorder: { show: false }, axisTicks: { show: false } },
                            yaxis:{
                                show: true,
                            },
                            xaxis:{
                                axisTicks: {
                                    show: true,
                                },
                                axisBorder:{
                                    show: true,
                                },
                                labels:{
                                    show: true,
                                    datetimeFormatter: {month: "mmm 'yy"}
                                },
                                type: "datetime",
                                categories: categoryDateData,
                            },
                            fill: { type: "gradient", gradient: { type: "horizontal", stops: [0, 5] } },

                            colors: ["#0fbcf9", "#b559fc"],
                            tooltip:{
                                y: {
                                    formatter: (value) => `$ ${value.toFixed(3)}` 
                                }
                            }

                        }}
                    />
                </>
            }
        </div>
    );
}

export default Chart;

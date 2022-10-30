import React from 'react';
import { useLocation, useParams, useRouteMatch, Switch, Route } from 'react-router';
import styled from 'styled-components';

import { useQuery } from "react-query";

import { CoinDetailInterface, IHistorycal, TickerDetailInterface } from "../types/common";

import { fetchCoinHistory, handleFetchCoin, handleFetchTicker } from '../api';
import BrowserTitle from '../components/BrowserTitle';

import Icon from '../images/icon/icon_coin.png';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import Chart from '../components/Chart';
import GoHomeButton from '../components/GoHomeButton';
import Price from '../components/Price';


interface RouteParams {
    coinId: string;
} 



interface RouteState {
    state: { name: string; rank: number };
}

export default function Coin() {
    const { coinId } = useParams<RouteParams>();
    const { state } = useLocation() as RouteState;
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");

    console.log("location state", state);
    console.log("params", coinId);

    const { isLoading: coinLoading, data: coinData } = useQuery<CoinDetailInterface>(["coin", coinId], () => handleFetchCoin(coinId));
    // const { isLoading: coinLoading, data: coinData } = useQuery<CoinDetailInterface>(["coin", coinId], () => handleFetchCoin(coinId), { refetchInterval: 10000 });

    const{ isLoading: chartLoading, data: chartData } = useQuery<IHistorycal[]>(["ohlc", "price", coinId], () => fetchCoinHistory(coinId),{
        refetchInterval: 1000000,
    });


    const { isLoading: tickerLoading, data: tickerData } = useQuery<TickerDetailInterface>(["ticker", coinId], () => handleFetchTicker(coinId));
    const loading = coinLoading || tickerLoading;




    return (
        <Container>
            <BrowserTitle title={coinData?.name} />
            <GoHomeButton/>
            <Title>
                <span/>
                    {state?.name ? state.name : loading ? <Loading /> : coinData?.name}
                <span/>
            </Title>

            <PriceTitle isIncrease={!!(tickerData && tickerData.quotes.USD.market_cap_change_24h > 0)}>
                {tickerData && `$${Number(tickerData.quotes.USD.price.toFixed(3)).toLocaleString("ko-KR")}`}
            </PriceTitle>
            

            <OverviewContainer>
                <OverviewContent>
                    <span>Rank</span>
                    <span>{coinData?.rank}</span>
                </OverviewContent>
                <OverviewContent>
                    <span>Symbol</span>
                    <span>{coinData?.symbol}</span>
                </OverviewContent>
                <OverviewContent>
                    <span>Date</span>
                    <span>{coinData?.first_data_at.substring(0, 10)}</span>
                </OverviewContent>
            </OverviewContainer>



            <SummaryContainer>
                <SummaryContent>
                <span>Market Cap</span>
                <span>${Number(tickerData?.quotes.USD.market_cap).toLocaleString("ko-KR")}</span>
                </SummaryContent>
                <SummaryContent>
                <span>ATH</span>
                <span>${Number(tickerData?.quotes.USD.ath_price.toFixed(3)).toLocaleString("ko-KR")}</span>
                </SummaryContent>
                <SummaryContent>
                <span>24h Change</span>
                <span>
                    {tickerData && tickerData.quotes.USD.percent_change_24h > 0 ? `+${tickerData.quotes.USD.percent_change_24h}%` : `${tickerData?.quotes.USD.percent_change_24h}%`}
                </span>
                </SummaryContent>
            </SummaryContainer>


            <Tabs>
                <Tab 
                    isActive={chartMatch !== null}
                >
                    <Link to={`/${coinId}/chart`}>Chart</Link>
                </Tab>
                <Tab 
                    isActive={priceMatch !== null}
                >
                    <Link to={`/${coinId}/price`}>Price</Link>
                </Tab>
            </Tabs>
            <Switch>
                <Route path={`/${coinId}/price`}>
                    <Price coinId={coinId}/>
                </Route>
                <Route path={`/:coinId/chart`}>
                    <Chart coinId={coinId} />
                </Route>
            </Switch>

            
        </Container>
    )
}

const Container = styled.div`
    border-radius: 10px;
    max-width: 640px;
    width: 640px;
    padding: 40px 10px;
    box-sizing: border-box;
    box-shadow: black 5px 5px 20px 0px;
    margin: 100px 0;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
`;

const Title = styled.h2`
    text-transform: uppercase;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
        display: inline-block;
        width: 25px;
        height: 25px;
        margin: 5px 15px 10px 15px;
        background: url(${Icon}) center no-repeat;
        background-size: contain;
    }
`;

const PriceTitle = styled.h1<{ isIncrease: boolean }>`
    font-size: 35px;
    margin: 25px 0;
    font-weight: bold;
    color: ${(props) => (props.isIncrease === true ? props.theme.greenColor : props.theme.redColor)};
`;

const CommonContainer = styled.div`
    display: flex;
    background-color: ${(props) => props.theme.lightBlackColor};
    color: ${(props) => props.theme.textColor};
    border-radius: 5px;
    padding: 15px 0;
    margin: 10px 0;
`;

const CommonContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    span {
        margin: 8px 10px;
        text-transform: uppercase;
        &:first-child {
        font-weight: bold;
        color: ${(props) => props.theme.yellowColor};
        }
        &:nth-child(2) {
        font-weight: bold;
        font-size: 15px;
        }
    }
`;

const OverviewContainer = styled(CommonContainer)``;

const OverviewContent = styled(CommonContent)``;

const SummaryContainer = styled(CommonContainer)``;

const SummaryContent = styled(CommonContent)``;



const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    padding: 7px 0px;
    border-radius: 10px;
    
    a {
        display: block;
        padding: 12px 10px;
        text-transform: uppercase;
        background-color: ${(props) => (props.isActive === true ? props.theme.grayColor : props.theme.lightBlackColor)};
        border-radius: 100px;
        &:hover {
        background-color: ${(props) => props.theme.grayColor};
        }
    }

`;
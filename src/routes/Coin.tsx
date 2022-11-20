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
import noImg from '../images/icon/icon_no_img.png';



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


    const { isLoading: coinLoading, data: coinData } = useQuery<CoinDetailInterface>(["coin", coinId], () => handleFetchCoin(coinId));
    const{ isLoading: chartLoading, data: chartData } = useQuery<any>(["ohlc", "price", coinId], () => fetchCoinHistory(coinId),{
        refetchInterval: 1000000,
    });
    const { isLoading: tickerLoading, data: tickerData } = useQuery<TickerDetailInterface>(["ticker", coinId], () => handleFetchTicker(coinId));
    const loading = coinLoading || tickerLoading;

    const imgUrl = `https://cryptocurrencyliveprices.com/img/${coinId}.png`;

    return (
        <Container>
            <BrowserTitle title={coinData?.name} />
            <GoHomeButton/>
                {
                    loading ? <Loading/> :
                    <>
                        <Title>
                            <span/>
                                {state?.name ? state.name : coinData?.name}
                            <span/>
                        </Title>
                        <IconPriceWrap>
                            <CoinLogo
                                src={imgUrl} alt={coinId}
                                onError={e => e.currentTarget.src = noImg}
                            />
                            <PriceTitle isIncrease={!!(tickerData && tickerData.quotes.USD.market_cap_change_24h > 0)}>
                                {tickerData && `$${Number(tickerData.quotes.USD.price.toFixed(3)).toLocaleString("ko-KR")}`}
                            </PriceTitle>
                        </IconPriceWrap>
                        <BoxWrap>
                            <Box>
                                <h4>Rank</h4>
                                <p>{coinData?.rank}</p>
                            </Box>
                            <Box>
                                <h4>Symbol</h4>
                                <p>{coinData?.symbol}</p>
                            </Box>
                            <Box>
                                <h4>Date</h4>
                                <span>{coinData?.first_data_at.substring(0, 10)}</span>
                            </Box>
                            <Box
                                isIncrease={!!(tickerData && tickerData.quotes.USD.market_cap_change_24h > 0)}
                            >
                                <h4>24h Change</h4>
                                <h5>
                                    {tickerData && tickerData.quotes.USD.percent_change_24h > 0 ? `+${tickerData.quotes.USD.percent_change_24h}%` : `${tickerData?.quotes.USD.percent_change_24h}%`}
                                </h5>
                            </Box>
                            <Box>
                                <h4>Market Cap</h4>
                                <span>${Number(tickerData?.quotes.USD.market_cap).toLocaleString("ko-KR")}</span>
                            </Box>
                            <Box>
                                <h4>ATH</h4>
                                <span>${Number(tickerData?.quotes.USD.ath_price.toFixed(3)).toLocaleString("ko-KR")}</span>
                            </Box>
                        </BoxWrap>
                    </>
                }

            {
                chartLoading ? 
                null
                :
                chartData.length > 0 ? 
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
                :
                <NoData>해당 코인은 차트 데이터가 없습니다.</NoData> 
            }
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
    padding: 40px 30px;
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

const IconPriceWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
`

const CoinLogo = styled.img`
    width: 100px;
    height: 100px;
`


const PriceTitle = styled.h1<{ isIncrease: boolean }>`
    font-size: 35px;
    margin-left: 50px;
    font-weight: bold;
    color: ${(props) => (props.isIncrease === true ? props.theme.greenColor : props.theme.redColor)};
`;
const BoxWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
`
const Box = styled.div<{ isIncrease?: boolean }>`
    width: 48.5%;
    padding: 20px 25px;
    border: 1px solid #bababa;
    border-radius: 10px;
    margin-bottom: 20px;
    h4{
        font-weight: 600;
        color: ${(props) => props.theme.accentColor};
        font-size: 24px;
        margin-bottom: 20px;
    }
    h5{
        font-weight: 900;
        font-size: 30px;
        text-align: right;
        color: ${(props) => (props.isIncrease === true ? props.theme.greenColor : props.theme.redColor)};
    }
    p{
        font-weight: 900;
        font-size: 30px;
        text-align: right;
    }
    span{
        display: block;
        font-weight: 600;
        font-size: 22px;
        text-align: right;
    }

`
const NoData = styled.div`
    text-align: center;
    font-size: 22px;
    font-weight: 400;
    margin-top: 50px;
`

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
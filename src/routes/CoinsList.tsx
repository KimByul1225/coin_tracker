import React from "react";
import { useQuery } from "react-query";
import { useEffect, useState } from 'react';
import { handlefetchCoins } from "../api";
import { TickerInterface } from "../types/common";
import styled from 'styled-components';
import BrowserTitle from '../components/BrowserTitle';
import Row from '../components/Row';
import Icon from '../images/icon/icon_coin.png';
import {  useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import Loading from "../components/Loading";

/**
 * @description 코인 리스트페이지 컴포넌트
 */

interface DarkModeInterface {
    isDark: boolean;
}

export default function CoinsList() {
    const [page, setPage] = useState(1);
    const [allData, setAllData] = useState<TickerInterface[]>([]);
    const darkAtom = useRecoilValue(isDarkAtom);
    const { isLoading, data: allTickersData, refetch: refetchAllTickers } = useQuery<TickerInterface[]>("allTickers", () => handlefetchCoins(page));

    // 아래 주석은 스크롤 시 자동으로 코인리스트가 더보기 되도록 구현
    // const handleInfiniteScroll = useCallback(async () => {
    //     const { offsetHeight, scrollTop } = document.documentElement;
    //     const innerHeight = window.innerHeight;
    //     if (offsetHeight === innerHeight + scrollTop) {
    //     setPage((prevPage) => prevPage + 1);
    //     }
    // }, []);
    // useEffect(() => {
    //     window.addEventListener("scroll", handleInfiniteScroll);
    //     return () => window.removeEventListener("scroll", handleInfiniteScroll);
    // }, [handleInfiniteScroll]);


    // Api 무료 사용량 문제로 아래와 같이 버튼으로 변경 
    const moreViewHandler = () => {
        setPage((prevPage) => prevPage + 1);
    }

    useEffect(() => {
        if (allTickersData) {
        setAllData((prev) => {
            const result = [...prev, ...allTickersData];
            return result;
        });
        }
    }, [allTickersData]);

    useEffect(() => {
        refetchAllTickers();
    }, [page, refetchAllTickers]);

    return (
        <Container>
            <BrowserTitle title="Coin Tracker"/>
            <Title>
                <span/>
                    Coin Tracker
                <span/>
            </Title>
            <Wrap>
                <Table>
                    <TableHeader>
                        <tr>
                            <th>
                                순위
                            </th>
                            <th>
                                심볼
                            </th>
                            <th>
                                시가총액 / 변동폭
                            </th>
                            <th>
                                현재가격 / 변동폭
                            </th>
                        </tr>
                    </TableHeader>
                    {
                        isLoading ? <Loading/> :
                        <TableBody>
                            {
                                allData.length > 0 ?
                                allData?.map((coin, index) => {
                                    const imgUrl = `https://cryptocurrencyliveprices.com/img/${coin.id}.png`;
                                    return(
                                        <Row
                                            key={`${coin.id}${index}`}
                                            id={coin.id}
                                            rank={coin.rank}
                                            symbol={coin.symbol}
                                            name={coin.name}
                                            price={coin.quotes.USD.price}
                                            priceChange={coin.quotes.USD.percent_change_24h}
                                            volume={coin.quotes.USD.volume_24h}
                                            volumeChange={coin.quotes.USD.volume_24h_change_24h}
                                            image={imgUrl}
                                        />
                                )})
                                :
                                <tr>
                                    <NoData colSpan={4}>
                                        현재 Api 이상으로 데이터를 불러 올 수 없습니다.
                                    </NoData>
                                </tr>
                            }
                        </TableBody>
                    }
                </Table>
            </Wrap>
            {
                !isLoading && 
                <ButtonWrap>
                    <MoreView
                        onClick={moreViewHandler}
                        isDark={darkAtom}
                    >
                        리스트 더보기
                    </MoreView>
                </ButtonWrap>
            }
            
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

const Wrap = styled.div`
    padding: 20px 0;
`
const Table = styled.table`
    width: 100%;
`
const TableHeader = styled.thead`
    color: ${(props) => props.theme.grayColor};
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 600;
    width: 100%;
    th:nth-child(1){
        width: 10%;
    }
    th:nth-child(2){
        width: 20%;
    }
    th:nth-child(3){
        width: 45%;
    }
    th:nth-child(4){
        width: 25%;
    }
`

const TableBody = styled.tbody``

const NoData = styled.td`
    text-align: center;
    font-size: 22px;
    font-weight: 400;
    padding-top: 50px;
`
const ButtonWrap = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`
const MoreView = styled.button<DarkModeInterface>`
    cursor: pointer;
    font-weight: 600;
    font-size: 18px;
    background: none;
    padding: 10px 15px;
    border-radius: 20px;
    border: 1px solid ${(props) => props.isDark ? "#fff" : "#000"};
    color: ${(props) => props.isDark ? "#fff" : "#000"};
    opacity: 0.7;
    :hover{
        opacity: 1;
        transition: all .3s ease;
    }
`
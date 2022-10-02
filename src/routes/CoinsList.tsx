import { useQuery } from "react-query";
import { useEffect, useCallback, useState } from 'react';
import { handlefetchCoins } from "../api";
import { TickerInterface } from "../types/common";
import styled from 'styled-components';
import BrowserTitle from '../components/BrowserTitle';
import Row from '../components/Row';


export default function CoinsList() {
    const [page, setPage] = useState(1);
    const [allData, setAllData] = useState<TickerInterface[]>([]);

    const { isLoading, data: allTickersData, refetch: refetchAllTickers } = useQuery<TickerInterface[]>("allTickers", () => handlefetchCoins(page));


    console.log("isLoading", isLoading);

    const handleInfiniteScroll = useCallback(async () => {
        const { offsetHeight, scrollTop } = document.documentElement;
        const innerHeight = window.innerHeight;
        if (offsetHeight === innerHeight + scrollTop) {
        setPage((prevPage) => prevPage + 1);
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);
        return () => window.removeEventListener("scroll", handleInfiniteScroll);
    }, [handleInfiniteScroll]);

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
            <Title>Coin Tracker</Title>
            <Wrap>
                <Table>
                    <TableHeader>
                        <tr>
                            <th>
                                Rank
                            </th>
                            <th></th>
                            <th>
                                Volume / Change
                            </th>
                            <th>
                                Price / Change
                            </th>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {
                            allData?.map((coin, index) => (
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
                                    image={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                                />
                            ))
                        }
                        
                    </TableBody>
                </Table>
            </Wrap>
        </Container>
    )
}

const Container = styled.div`
    border-radius: 10px;
    max-width: 480px;
    width: 480px;
    padding: 40px 10px;
    box-sizing: border-box;
    box-shadow: black 5px 5px 20px 0px;
    margin: 100px 0;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
`;

const Title = styled.h1`
    text-transform: uppercase;
    text-align: center;
    font-size: 30px;
    margin-bottom: 30px;
`;

const Wrap = styled.div`
    padding: 20px;
`
const Table = styled.table`
    width: 100%;
`
const TableHeader = styled.thead`
    color: ${(props) => props.theme.grayColor};
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 600;
    width: 100%;
    th:nth-child(1){
        width: 20%;
    }
    th:nth-child(2){
        width: 20%;
    }
    th:nth-child(3){
        width: 30%;
    }
    th:nth-child(4){
        width: 30%;
    }
`

const TableBody = styled.tbody`
    
`

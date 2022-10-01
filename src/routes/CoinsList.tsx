import React from 'react'
import styled from 'styled-components'
import BrowserTitle from '../components/BrowserTitle'


export default function CoinsList() {
    return (
        <Container>
            <BrowserTitle title="Coin Tracker"/>
            <Title>Coin Tracker</Title>
            <Wrap>
                <Table>
                    <TableHeader>
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
                    </TableHeader>

                </Table>

                {/* {allData?.map((coin, index) => (
                <Coin
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
                ))} */}

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



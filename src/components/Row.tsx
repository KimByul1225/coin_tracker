import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface RowProps {
    id: string;
    rank: number;
    symbol: string;
    name: string;
    image: string;
    price: number;
    priceChange: number;
    volume: number;
    volumeChange: number;
}

function Row({ id, rank, symbol, name, image, price, priceChange, volume, volumeChange }: RowProps) {
    return (
        <TableRow>
            <td>{rank}</td>
            <td>
                <CoinLogo
                    src={image ? image : ""} alt={name}
                />
            </td>
            <td>1</td>
            <td>1</td>
            



            {/* <Link to={`/${id}`} state={{ name, rank }}>
                <Wrapper>
                <RankContainer>
                    <Rank>{rank}</Rank>
                </RankContainer>

                <InformationContainer>
                    <Image src={image} alt={name}/>
                    <Content>
                    <SymbolContainer>
                        <Symbol>{symbol}</Symbol>
                        <Name>{name}</Name>
                    </SymbolContainer>
                    <CapContainer>
                        <Volume>${Number(volume.toFixed(2)).toLocaleString("ko-KR")}</Volume>
                        <Cap>{volumeChange}%</Cap>
                    </CapContainer>
                    </Content>
                </InformationContainer>

                <PriceContainer>
                    <Price>${Number(price.toFixed(2)).toLocaleString("ko-KR")}</Price>
                    <Change isActive={priceChange > 0}>{priceChange > 0 ? `+${priceChange}` : `${priceChange}`}%</Change>
                </PriceContainer>
                </Wrapper>
            </Link> */}


        </TableRow>
    );
}

export default Row;


const TableRow = styled.tr`
    :hover{
        transform: scale(1.025);
    }

`

const CoinLogo = styled.img`
    width: 50px;
    height: 50px;
`;
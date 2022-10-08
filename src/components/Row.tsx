import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

interface RowProps {
    id: string;
    rank: number;
    symbol: string;
    name: string;
    image?: string;
    price: number;
    priceChange: number;
    volume: number;
    volumeChange: number;
}

interface DetailPageProps{
    id?: string,
    name?: string,
    rank?: number
}

function Row({ id, rank, symbol, name, image, price, priceChange, volume, volumeChange }: RowProps) {
    const history = useHistory();

    const rowClickHandler = ({id, name, rank}: DetailPageProps) => {
        history.push({
            pathname: `/${id}`,
            state: {
                name,
                rank
            }
        });
    }

    return (
        <TableRow onClick={()=>rowClickHandler({id, name, rank})}>
            <td>{rank}</td>
            <td>
                <CoinLogo
                    src={image ? image : ""} alt={name}
                />
            </td>
            <td>
                <h3>{symbol}</h3>
                <p>{name}</p>
                <p>${Number(volume.toFixed(2)).toLocaleString("ko-KR")}</p>
                <p>{volumeChange}%</p>
            </td>
            <td>
                <h3>${Number(price.toFixed(2)).toLocaleString("ko-KR")}</h3>
                <p>
                    {priceChange > 0 ? `+${priceChange}` : `${priceChange}`}%
                </p>
            </td>
            



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
    cursor: pointer;

`

const CoinLogo = styled.img`
    width: 50px;
    height: 50px;
`;
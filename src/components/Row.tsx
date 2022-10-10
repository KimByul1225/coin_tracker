import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import noImg from '../images/icon/icon_no_img.png'

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
                    src={image} alt={name}
                    onError={e => e.currentTarget.src = noImg}
                />
                <h2>{symbol}</h2>
            </td>
            <td>
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
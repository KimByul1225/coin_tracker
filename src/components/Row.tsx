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
                <h3>{name}</h3>
                <p>${Number(volume.toFixed(2)).toLocaleString("ko-KR")}</p>
                <PriceChangeArea
                    isPlus = {volumeChange > 0}
                >
                    {volumeChange > 0 ? `+${volumeChange}` : `${volumeChange}`}%
                </PriceChangeArea>
            </td>
            <td>
                <h3>${Number(price.toFixed(2)).toLocaleString("ko-KR")}</h3>
                <PriceChangeArea
                    isPlus = {priceChange > 0}
                >
                    {priceChange > 0 ? `+${priceChange}` : `${priceChange}`}%
                </PriceChangeArea>
            </td>
        </TableRow>
    );
}
export default Row;


const TableRow = styled.tr`
    td{
        vertical-align: middle;
        padding: 10px 0;
        h2{
            font-weight: 800;
            margin-top: 5px;
        }
        h3{
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 5px;
        }
        p{
            font-weight: 400;
            margin-bottom: 5px;
        }
    }
    td:nth-child(1){
        text-align: center;
    }
    td:nth-child(2){
        text-align: center;
    }
    td:nth-child(3){
        padding-left: 15px;
    }
    td:nth-child(4){
        padding-left: 15px;
    }
    :hover{
        transform: scale(1.025);
    }
    cursor: pointer;
    border-bottom: 2px solid ${(props) => props.theme.grayColor};

`

const CoinLogo = styled.img`
    width: 50px;
    height: 50px;
`;

const PriceChangeArea = styled.p<{isPlus: boolean}>`
    color: ${(props) => (props.isPlus === true ? props.theme.greenColor : props.theme.redColor)};
    font-size: 18px;
    font-weight: 800;
`
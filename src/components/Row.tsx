import React from 'react';
import styled from 'styled-components';

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
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
        </TableRow>
    );
}

export default Row;


const TableRow = styled.tr`
    

`
import React from "react";
import styled from "styled-components";

/**
 * @description Api통신 완료 전 로딩창을 보여주기 위한 컴포넌트
 */

const Loading = () => {
    return <Text>Loading...</Text>;
};

export default Loading;

const Text = styled.div`
    text-transform: uppercase;
    text-align: center;
    font-size: 30px;
    font-weight: 600;
`;

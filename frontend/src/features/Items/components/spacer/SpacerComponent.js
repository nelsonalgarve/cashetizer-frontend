import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';

const TopSmall = styled.View`
    margintop: 4px;
`;

const TopMedium = styled.View`
    margintop: 8px;
`;

const TopLarge = styled.View`
    margintop: 8px;
`;

const LeftSmall = styled.View`
    margintop: 16px;
`;

const LeftMedium = styled.View`
    margintop: 24px;
`;

const LeftLarge = styled.View`
    margintop: 32px;
`;

export const Spacer = ({ variant }) => {
    if (variant === 'top-small') {
        return <TopSmall />;
    }
    if (variant === 'top-medium') {
        return <TopMedium />;
    }
    if (variant === 'top-large') {
        return <TopLarge />;
    }
    if (variant === 'left-small') {
        return <TopSmall />;
    }
    if (variant === 'left-medium') {
        return <TopMedium />;
    }
    if (variant === 'left-large') {
        return <TopLarge />;
    }
};

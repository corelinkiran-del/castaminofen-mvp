import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Container, Title, SubText, Card } from '../../components/ui/Styled';

const Item = styled(Card)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ItemMeta = styled.View`
  flex: 1;
  margin-left: 14px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export default function LibraryScreen() {
  return (
    <Container contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
      <Title>کتابخانه</Title>
      <SubText>آثار ذخیره‌شده و لیست‌های مورد علاقه شما.</SubText>

      <Item>
        <Row>
          <View style={{ width: 60, height: 60, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.08)' }} />
          <ItemMeta>
            <Title style={{ fontSize: 16 }}>گالری شب</Title>
            <SubText>پادکست • 12 قسمت</SubText>
          </ItemMeta>
        </Row>
      </Item>
    </Container>
  );
}

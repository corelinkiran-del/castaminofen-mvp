import React from 'react';
import styled from 'styled-components/native';
import { Container, Title, SubText, Card } from '../../components/ui/Styled';

const Hero = styled.View`
  margin-top: 24px;
  margin-bottom: 28px;
`;

const SearchBox = styled.View`
  background: rgba(255,255,255,0.04);
  border-radius: 22px;
  padding: 16px;
  flex-direction: row;
  align-items: center;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  color: #fff;
  margin-left: 12px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const CategoryCard = styled(Card)`
  flex: 1;
  margin-right: 12px;
  background: rgba(17, 19, 25, 0.98);
`;

const CategoryTitle = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;

const CategorySubtitle = styled(SubText)`
  margin-top: 8px;
`;

export default function ExploreScreen() {
  return (
    <Container contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
      <Hero>
        <Title>کاوش محتوا</Title>
        <SubText>موسیقی و پادکست‌های ویژه را کشف کن.</SubText>
      </Hero>

      <SearchBox>
        <SubText>جستجو...</SubText>
        <SearchInput placeholder="موضوع یا نام را وارد کنید" placeholderTextColor="rgba(255,255,255,0.4)" />
      </SearchBox>

      <Row>
        <CategoryCard>
          <CategoryTitle>پادکست</CategoryTitle>
          <CategorySubtitle>روایت‌های شنیدنی</CategorySubtitle>
        </CategoryCard>
        <CategoryCard>
          <CategoryTitle>کتاب صوتی</CategoryTitle>
          <CategorySubtitle>کتاب‌های منتخب</CategorySubtitle>
        </CategoryCard>
      </Row>
    </Container>
  );
}

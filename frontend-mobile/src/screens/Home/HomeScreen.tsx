import React from 'react';
import styled from 'styled-components/native';
import { Container, Title, SubText } from '../../components/ui/Styled';

const Header = styled.View`
  margin-top: 24px;
  margin-bottom: 28px;
`;

const HeroCard = styled.View`
  width: 100%;
  padding: 24px;
  background-color: rgba(217, 161, 70, 0.14);
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  shadow-color: #000;
  shadow-offset: 0px 18px;
  shadow-opacity: 0.26;
  shadow-radius: 22px;
  elevation: 14;
`;

const Badge = styled.Text`
  color: #f6e7b9;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-bottom: 16px;
`;

const HeroTitle = styled.Text`
  color: #ffffff;
  font-size: 32px;
  font-weight: 800;
  line-height: 40px;
`;

const HeroSubtitle = styled.Text`
  color: rgba(255,255,255,0.72);
  font-size: 14px;
  margin-top: 14px;
  line-height: 22px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 18px;
`;

const ActionButton = styled.TouchableOpacity`
  background: rgba(216, 150, 46, 0.2);
  padding: 14px 18px;
  border-radius: 22px;
  margin-right: 12px;
`;

const ActionText = styled.Text`
  color: #f1e2b3;
  font-weight: 700;
`;

const SectionHeader = styled.View`
  margin-top: 32px;
  margin-bottom: 14px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled(Title)`
  font-size: 20px;
`;

const SectionSeeAll = styled.Text`
  color: rgba(255,255,255,0.6);
  font-size: 13px;
`;

const HorizontalList = styled.ScrollView.attrs({ horizontal: true, showsHorizontalScrollIndicator: false })`
  margin-top: 12px;
`;

const ContentCard = styled.View`
  width: 220px;
  height: 280px;
  border-radius: 28px;
  margin-right: 16px;
  padding: 18px;
  background: rgba(18, 20, 27, 0.96);
  border: 1px solid rgba(255,255,255,0.06);
  shadow-color: #000;
  shadow-opacity: 0.2;
  shadow-radius: 20px;
  elevation: 10;
`;

const Cover = styled.View`
  flex: 1;
  background: rgba(255,255,255,0.08);
  border-radius: 24px;
  margin-bottom: 16px;
  justify-content: flex-end;
  padding: 14px;
`;

const CoverLabel = styled.Text`
  color: #fff;
  font-size: 13px;
  font-weight: 700;
`;

const CardTitle = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
`;

const CardMeta = styled.Text`
  color: rgba(255,255,255,0.58);
  font-size: 12px;
`;

const Footer = styled.View`
  height: 120px;
`;

export default function HomeScreen() {
  return (
    <Container contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
      <Header>
        <Badge>منتخب امروز</Badge>
        <HeroTitle>کشف تجربهٔ صوتی لوکس</HeroTitle>
        <HeroSubtitle>موسیقی، پادکست و کتاب صوتی همه در یک فضای تاریک و سینمایی.</HeroSubtitle>
      </Header>

      <HeroCard>
        <Badge>ویژه</Badge>
        <HeroTitle>روایت شب‌های مدرن</HeroTitle>
        <HeroSubtitle>یک سفر شنیداری با نورهای گرم و عمق صوتی فراموش‌نشدنی.</HeroSubtitle>
        <Row>
          <ActionButton>
            <ActionText>گوش کن</ActionText>
          </ActionButton>
          <ActionButton>
            <ActionText>مشاهده</ActionText>
          </ActionButton>
        </Row>
      </HeroCard>

      <SectionHeader>
        <SectionTitle>پیشنهادهای هوشمند</SectionTitle>
        <SectionSeeAll>نمایش همه</SectionSeeAll>
      </SectionHeader>

      <HorizontalList>
        {[1, 2, 3].map((item) => (
          <ContentCard key={item}>
            <Cover>
              <CoverLabel>پادکست</CoverLabel>
            </Cover>
            <CardTitle>قصه‌های موسیقایی</CardTitle>
            <CardMeta>42 قسمت • ملایم</CardMeta>
          </ContentCard>
        ))}
      </HorizontalList>

      <SectionHeader>
        <SectionTitle>برای شما</SectionTitle>
        <SectionSeeAll>بیشتر</SectionSeeAll>
      </SectionHeader>

      <HorizontalList>
        {[1, 2].map((item) => (
          <ContentCard key={`for-you-${item}`}>
            <Cover>
              <CoverLabel>کتاب صوتی</CoverLabel>
            </Cover>
            <CardTitle>روان‌شناسی نور</CardTitle>
            <CardMeta>14 ساعت • انگلیسی</CardMeta>
          </ContentCard>
        ))}
      </HorizontalList>

      <Footer />
    </Container>
  );
}

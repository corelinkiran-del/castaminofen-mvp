import React from 'react';
import styled from 'styled-components/native';
import { Container, Title, SubText, Card } from '../../components/ui/Styled';

const ProfileCard = styled(Card)`
  padding: 26px;
`;

const ProfileMeta = styled(SubText)`
  margin-top: 8px;
`;

export default function ProfileScreen() {
  return (
    <Container contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}>
      <Title>پروفایل</Title>
      <SubText>حساب شما و دسترسی‌های پریمیوم</SubText>

      <ProfileCard>
        <Title style={{ fontSize: 18 }}>کاربر رسانه</Title>
        <ProfileMeta>اشتراک: پریمیوم</ProfileMeta>
        <ProfileMeta>زمان باقی‌مانده: 20 روز</ProfileMeta>
      </ProfileCard>
    </Container>
  );
}

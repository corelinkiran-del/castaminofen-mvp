import React from 'react';
import styled from 'styled-components/native';
import { Container, Title, SubText, Card, AccentButton, AccentButtonText } from '../../components/ui/Styled';

const Artwork = styled.Image`
  width: 100%;
  height: 340px;
  border-radius: 32px;
  margin-bottom: 18px;
  background: rgba(255,255,255,0.08);
`;

const MetaRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const MetaText = styled(SubText)`
  color: rgba(255,255,255,0.68);
`;

const ProgressBackground = styled.View`
  width: 100%;
  height: 6px;
  background: rgba(255,255,255,0.08);
  border-radius: 6px;
  margin-vertical: 18px;
`;

const ProgressFill = styled.View`
  width: 46%;
  height: 100%;
  background: rgba(216, 150, 46, 0.92);
  border-radius: 6px;
`;

const ControlRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const ControlButton = styled.TouchableOpacity`
  width: 86px;
  height: 56px;
  border-radius: 18px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  align-items: center;
  justify-content: center;
`;

export default function PlayerScreen() {
  return (
    <Container contentContainerStyle={{ padding: 24, paddingBottom: 40 }}>
      <Title>پخش‌کننده لوکس</Title>
      <SubText>فضای شنیداری با نورپردازی ملایم</SubText>

      <Artwork source={{ uri: 'https://picsum.photos/900/900' }} />

      <Card>
        <Title style={{ fontSize: 20 }}>قسمت اول: طلوع</Title>
        <SubText>پادکست صوتی • 35 دقیقه</SubText>

        <MetaRow>
          <MetaText>02:14</MetaText>
          <MetaText>35:00</MetaText>
        </MetaRow>

        <ProgressBackground>
          <ProgressFill />
        </ProgressBackground>

        <ControlRow>
          <ControlButton>
            <AccentButtonText>بازگشت</AccentButtonText>
          </ControlButton>
          <AccentButton style={{ flex: 1, marginHorizontal: 12, borderRadius: 22 }}>
            <AccentButtonText>پخش</AccentButtonText>
          </AccentButton>
          <ControlButton>
            <AccentButtonText>بعدی</AccentButtonText>
          </ControlButton>
        </ControlRow>
      </Card>
    </Container>
  );
}

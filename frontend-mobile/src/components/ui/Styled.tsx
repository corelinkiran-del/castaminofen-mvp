import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${(p: any) => p.theme.colors.background};
`;

export const Card = styled.View`
  background: ${(p: any) => p.theme.colors.card};
  border-radius: ${(p: any) => p.theme.radius.large}px;
  padding: 16px;
  margin-vertical: 12px;
  shadow-color: #000;
  shadow-opacity: 0.45;
  shadow-radius: 20px;
  elevation: 6;
`;

export const Title = styled.Text`
  color: ${(p: any) => p.theme.colors.text};
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const SubText = styled.Text`
  color: ${(p: any) => p.theme.colors.muted};
  font-size: 14px;
`;

export const AccentButton = styled.TouchableOpacity`
  background: ${(p: any) => p.theme.colors.accent};
  padding: 14px 18px;
  border-radius: ${(p: any) => p.theme.radius.medium}px;
  align-items: center;
  justify-content: center;
`;

export const AccentButtonText = styled.Text`
  color: ${(p: any) => p.theme.colors.text};
  font-weight: 700;
`;

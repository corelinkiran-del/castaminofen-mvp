import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Container, Card, Title, SubText, AccentButton, AccentButtonText } from '../../components/ui/Styled';

const Field = styled.TextInput`
  background: rgba(255,255,255,0.02);
  color: ${(p: any) => p.theme.colors.text};
  padding: 14px;
  border-radius: ${(p: any) => p.theme.radius.medium}px;
  margin-vertical: 8px;
`;

export default function LoginScreen({ navigation }: any) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    try {
      // basic UI-only behavior for now
      if (!email || !password) return Alert.alert('خطا', 'لطفا ایمیل و رمز را وارد کنید');
      // simulated success
      Alert.alert('خوش آمدید', `ورود با ${email}`);
    } catch (e) {
      Alert.alert('خطا', 'اتصال ممکن نیست');
    }
  };

  return (
    <Container contentContainerStyle={{ padding: 24 }}>
      <Title>خوش آمدید</Title>
      <SubText>با حساب کاربری خود وارد شوید تا به محتوای اختصاصی دسترسی پیدا کنید.</SubText>

      <Card>
        <Field placeholder="ایمیل" placeholderTextColor={theme.colors.muted} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Field placeholder="رمز عبور" placeholderTextColor={theme.colors.muted} secureTextEntry value={password} onChangeText={setPassword} />
        <AccentButton onPress={submit} style={{ marginTop: 12 }}>
          <AccentButtonText>ورود</AccentButtonText>
        </AccentButton>
      </Card>
    </Container>
  );
}

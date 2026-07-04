import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Container, Card, Title, SubText, AccentButton, AccentButtonText } from '../../components/ui/Styled';

const FieldLabel = styled.Text`
  color: ${(p: any) => p.theme.colors.muted};
  font-size: 14px;
  margin-bottom: 8px;
`;

const Field = styled.TextInput`
  background: rgba(255, 255, 255, 0.05);
  color: ${(p: any) => p.theme.colors.text};
  padding: 16px;
  border-radius: ${(p: any) => p.theme.radius.medium}px;
  margin-bottom: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

const InfoBanner = styled.View`
  background: rgba(110, 168, 255, 0.08);
  border-radius: ${(p: any) => p.theme.radius.large}px;
  padding: 14px 16px;
  margin-top: 20px;
  border: 1px solid rgba(110, 168, 255, 0.16);
`;

const InfoText = styled.Text`
  color: ${(p: any) => p.theme.colors.text};
  font-size: 13px;
  line-height: 20px;
`;

const InlineLink = styled.Text`
  color: ${(p: any) => p.theme.colors.accent};
  font-weight: 700;
`;

export default function RegisterScreen({ navigation }: any) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    if (!email || !username || !password) {
      return Alert.alert('خطا', 'لطفا همه فیلدها را تکمیل شود');
    }
    Alert.alert('تبریک!', `حساب ${username} با موفقیت ساخته شد`);
  };

  return (
    <Container contentContainerStyle={{ padding: 24 }}>
      <Title>حسابتان را فعال کنید</Title>
      <SubText>یک پروفایل جذاب بسازید و روی تجربه‌ی رسانه‌ای خود کنترل کامل داشته باشید.</SubText>

      <Card>
        <FieldLabel>ایمیل</FieldLabel>
        <Field placeholder="name@example.com" placeholderTextColor={theme.colors.muted} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

        <FieldLabel>نام کاربری</FieldLabel>
        <Field placeholder="نام کاربری" placeholderTextColor={theme.colors.muted} value={username} onChangeText={setUsername} autoCapitalize="none" />

        <FieldLabel>رمز عبور</FieldLabel>
        <Field placeholder="رمز عبور" placeholderTextColor={theme.colors.muted} secureTextEntry value={password} onChangeText={setPassword} />

        <AccentButton onPress={submit} style={{ marginTop: 8 }}>
          <AccentButtonText>ثبت نام</AccentButtonText>
        </AccentButton>

        <InfoBanner>
          <InfoText>ثبت‌نام شما سریع و امن است. بعد از ورود، دسترسی به تجربه‌های ویژه، پخش آفلاین و توصیه‌های هوشمند فعال می‌شود.</InfoText>
        </InfoBanner>

        <InfoBanner>
          <InfoText>
            اگر قبلاً حساب ساخته‌اید، <InlineLink onPress={() => navigation.navigate('Login')}>وارد شوید</InlineLink>.
          </InfoText>
        </InfoBanner>
      </Card>
    </Container>
  );
}

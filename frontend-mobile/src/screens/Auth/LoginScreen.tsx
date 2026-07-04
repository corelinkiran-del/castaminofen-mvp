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

const InfoChip = styled.View`
  background: rgba(215, 178, 100, 0.1);
  border-radius: ${(p: any) => p.theme.radius.large}px;
  padding: 12px 16px;
  margin-top: 20px;
  border: 1px solid rgba(215, 178, 100, 0.18);
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

export default function LoginScreen({ navigation }: any) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (!email || !password) {
      return Alert.alert('خطا', 'لطفا ایمیل و رمز را وارد کنید');
    }

    Alert.alert('خوش آمدید', `ورود با ${email}`);
  };

  return (
    <Container contentContainerStyle={{ padding: 24 }}>
      <Title>سلام، به Castaminofen خوش آمدید</Title>
      <SubText>برای ورود به تجربه‌ی صوتی و تصویری اختصاصی، ایمیل و رمز عبور خود را وارد کنید.</SubText>

      <Card>
        <FieldLabel>ایمیل</FieldLabel>
        <Field placeholder="name@example.com" placeholderTextColor={theme.colors.muted} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

        <FieldLabel>رمز عبور</FieldLabel>
        <Field placeholder="رمز عبور" placeholderTextColor={theme.colors.muted} secureTextEntry value={password} onChangeText={setPassword} />

        <AccentButton onPress={submit} style={{ marginTop: 8 }}>
          <AccentButtonText>وارد شوید</AccentButtonText>
        </AccentButton>

        <InfoChip>
          <InfoText>با ورود، دسترسی به پلی‌لیست‌های شخصی‌سازی‌شده، پخش سریع و پیشنهادهای هوشمند را فعال می‌کنید.</InfoText>
        </InfoChip>

        <InfoChip>
          <InfoText>
            حساب ندارید؟ <InlineLink onPress={() => navigation.navigate('Register')}>ثبت نام کنید</InlineLink>
          </InfoText>
        </InfoChip>
      </Card>
    </Container>
  );
}

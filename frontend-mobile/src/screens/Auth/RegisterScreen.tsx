import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import { Container, Card, Title, SubText, AccentButton, AccentButtonText } from '../../components/ui/Styled';

const Field = styled.TextInput`
  background: rgba(255,255,255,0.02);
  color: ${(p: any) => p.theme.colors.text};
  padding: 14px;
  border-radius: ${(p: any) => p.theme.radius.medium}px;
  margin-vertical: 8px;
`;

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    if (!email || !username || !password) return Alert.alert('خطا', 'همه فیلدها را پر کنید');
    Alert.alert('ثبت‌نام موفق', `کاربر ${username} ساخته شد (شبیه‌سازی)`);
  };

  return (
    <Container contentContainerStyle={{ padding: 24 }}>
      <Title>ثبت نام</Title>
      <SubText>حساب جدید بسازید و به تجربهٔ پریمیوم دسترسی پیدا کنید.</SubText>

      <Card>
        <Field placeholder="ایمیل" placeholderTextColor="#9aa0a6" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Field placeholder="نام کاربری" placeholderTextColor="#9aa0a6" value={username} onChangeText={setUsername} />
        <Field placeholder="رمز عبور" placeholderTextColor="#9aa0a6" secureTextEntry value={password} onChangeText={setPassword} />
        <AccentButton onPress={submit} style={{ marginTop: 12 }}>
          <AccentButtonText>ثبت نام</AccentButtonText>
        </AccentButton>
      </Card>
    </Container>
  );
}

import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'handled',
  contentContainerStyle: {
    paddingBottom: Platform.OS === 'android' ? 150 : 100,
  },
})`
  flex: 1;
  padding-left: 30px;
  padding-right: 30px;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #f4ede8;
  margin: 34px 0 24px;
`;

export const ContainerButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const LogoutButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const UserAvatarContainer = styled.View`
  position: relative;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;

export const UserAvatarDefault = styled.View`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  background-color: #3e3b47;
  align-self: center;
  justify-content: center;
  align-items: center;
  border: 6px solid #999591;
`;

export const CameraButton = styled(RectButton)`
  position: absolute;
  width: 48px;
  height: 48px;
  background: #ff9000;
  border-radius: 24px;
  bottom: 0;
  right: 80px;
  align-items: center;
  justify-content: center;
`;

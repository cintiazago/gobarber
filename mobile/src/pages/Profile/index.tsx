import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import { Alert, KeyboardAvoidingView, Platform, View } from 'react-native';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/auth';
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidatonErrors';
import {
  Container,
  Title,
  UserAvatarContainer,
  TextInput,
  UserAvatar,
  UserAvatarDefault,
  CameraButton,
  BackButton,
  ContainerButtons,
  LogoutButton,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user, updateUser, signOut } = useAuth();

  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);

  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        // Esquema do objeto recebido por parâmetro
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
        });

        // Validando campos do input
        await schema.validate(data, {
          abortEarly: false,
        });

        /* Colocando old_password, password e password_confirmation como opcionais
        caso existam uno ao objeto que contem o nome e o email utilizando o  Object.assign */
        const formData = {
          name: data.name,
          email: data.email,
          ...(data.old_password
            ? {
                old_password: data.old_password,
                password: data.password,
                password_confirmation: data.password_confirmation,
              }
            : {}),
        };

        // Atualizar informações do usuário na api:
        const response = await api.put('/profile', formData);

        updateUser(response.data);

        Alert.alert('Perfil atualizado  com sucesso');

        // Redirecionar para dashboard caso o perfil seja atualizado
        navigation.goBack();
      } catch (err) {
        // Erros de validação
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErrors(err);
          formRef.current?.setErrors(erros);

          return;
        }

        // Disparar um alerta nos erros de atualização do perfil
        Alert.alert(
          'Erro na atualização do perfil',
          'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
        );
      }
    },
    [navigation, updateUser],
  );

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
      },
      response => {
        // Cancelou a escolha da imagem
        if (response.didCancel) {
          return;
        }

        // Deu algum erro
        if (response.error) {
          console.warn(response.error);
          Alert.alert('Erro ao atualizar seu avatar.');
          return;
        }

        const data = new FormData();

        // Configurando objeto do tipo FormData para enviar a api
        data.append('avatar', {
          type: 'image/jpeg', // tipo da imagem
          name: `${user.id}.jpeg`, // nome da imagem
          uri: response.uri, // url da imagem
        });

        // Atualizando avatar do usuário na api
        api.patch('users/avatar', data).then(apiResponse => {
          updateUser(apiResponse.data);
        });
      },
    );
  }, [updateUser, user.id]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Container>
          <ContainerButtons>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={22} color="#999591" />
            </BackButton>

            <LogoutButton onPress={signOut}>
              <Icon name="power" size={22} color="#999591" />
            </LogoutButton>
          </ContainerButtons>

          <UserAvatarContainer>
            {user.avatar_url ? (
              <UserAvatar source={{ uri: user.avatar_url }} />
            ) : (
              <UserAvatarDefault>
                <Icon name="user" size={70} color="#999591" />
              </UserAvatarDefault>
            )}
            <CameraButton onPress={handleUpdateAvatar}>
              <Icon name="camera" size={22} color="#312e38" />
            </CameraButton>
          </UserAvatarContainer>

          <View>
            <Title>Meu perfil</Title>
          </View>
          <Form
            initialData={{ name: user.name, email: user.email }}
            ref={formRef}
            onSubmit={handleSignUp}
          >
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current.focus()}
            />
            <Input
              ref={emailInputRef}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => oldPasswordInputRef.current.focus()}
            />
            <Input
              ref={oldPasswordInputRef}
              containerStyle={{ marginTop: 16 }}
              secureTextEntry
              autoCompleteType="off"
              textContentType="newPassword"
              name="password"
              icon="lock"
              placeholder="Senha atual"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            <Input
              ref={passwordInputRef}
              secureTextEntry
              autoCompleteType="off"
              textContentType="newPassword"
              name="old_password"
              icon="lock"
              placeholder="Nova senha"
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
            />
            <Input
              ref={confirmPasswordInputRef}
              secureTextEntry
              autoCompleteType="off"
              textContentType="newPassword"
              name="password_confirmation"
              icon="lock"
              placeholder="Confirmar senha"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <Button onPress={() => formRef.current?.submitForm()}>
              Confirmar mundanças
            </Button>
          </Form>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;

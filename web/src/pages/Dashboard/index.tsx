import React, { useState } from 'react';

import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointments,
  Calendar,
} from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/3417069?s=460&u=e0924e9fe21100cc5db5d0689d390b1ac59e1c8c&v=4"
                alt="Cintia Zago"
              />

              <strong>Cintia Zago</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>

          <Section>
            <strong>Manhã</strong>

            <Appointments>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/3417069?s=460&u=e0924e9fe21100cc5db5d0689d390b1ac59e1c8c&v=4"
                  alt="Cintia Zago"
                />

                <strong>Cintia Zago</strong>
              </div>
            </Appointments>

            <Appointments>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/3417069?s=460&u=e0924e9fe21100cc5db5d0689d390b1ac59e1c8c&v=4"
                  alt="Cintia Zago"
                />

                <strong>Cintia Zago</strong>
              </div>
            </Appointments>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointments>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/3417069?s=460&u=e0924e9fe21100cc5db5d0689d390b1ac59e1c8c&v=4"
                  alt="Cintia Zago"
                />

                <strong>Cintia Zago</strong>
              </div>
            </Appointments>
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default Dashboard;

import React from 'react';

import GlobalStyle from './styles/global';
// import SignIn from './pages/SignIn';
import SignIn from './pages/SignUp';

const App: React.FC = () => (
  <>
    <SignIn />
    <GlobalStyle />
  </>
);

export default App;

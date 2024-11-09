import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import InviteModal from 'src/feature/invite';
import Header from 'src/layouts/Header';
import MainContent from 'src/layouts/MainContent';
import Footer from 'src/layouts/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const App = React.memo(() => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleRequestInviteClick = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <Container>
      <Header />
      <MainContent onRequestInvite={handleRequestInviteClick} />
      <Footer />
      {isModalOpen && <InviteModal onClose={handleCloseModal} />}
    </Container>
  );
});

export default App;

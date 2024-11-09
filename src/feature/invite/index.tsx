import React from 'react';

import Modal from 'src/shared/components/Modal';
import InviteSuccess from 'src/feature/invite/components/InviteSuccess';
import { useInviteForm } from 'src/feature/invite/hooks/useInviteForm';
import InviteForm from 'src/feature/invite/components/InviteForm';

interface InviteModalProps {
  onClose: () => void;
}

const InviteModal = React.memo<InviteModalProps>(({ onClose }) => {
  const { successMessage, isSubmitting, errors, handleSubmit } = useInviteForm();

  return (
    <Modal title="Request an Invite" handleDismiss={onClose}>
      {successMessage ? (
        <InviteSuccess onClose={onClose} />
      ) : (
        <InviteForm errors={errors} isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
      )}
    </Modal>
  );
});

export default InviteModal;

'use client';

import { createContext, Dispatch, ReactNode, SetStateAction } from 'react';

import { useSignInModal } from '@/components/modals//sign-in-modal';

export const ModalContext = createContext<{
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setShowSignInModal: () => {},
});

export default function ModalProvider({ children }: { children: ReactNode }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();

  return (
    <ModalContext.Provider
      value={{
        setShowSignInModal,
      }}
    >
      <SignInModal />
      {children}
    </ModalContext.Provider>
  );
}

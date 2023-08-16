import { useEffect, ComponentType, FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import useWallet from '@/wallet/useWallet';

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): FunctionComponent<P> => {
  const AuthComponent: FunctionComponent<P> = (props) => {
    const Router = useRouter();
    const { wallet } = useWallet();

    useEffect(() => {
      if (!wallet.walletAddress) {
        Router.replace('/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet.walletAddress]);

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return AuthComponent;
};

export default withAuth;

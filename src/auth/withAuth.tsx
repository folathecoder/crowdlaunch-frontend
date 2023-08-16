import { useEffect, useState, ComponentType, FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import useWallet from '@/wallet/useWallet';

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): FunctionComponent<P> => {
  const AuthComponent: FunctionComponent<P> = (props) => {
    const Router = useRouter();
    const { wallet } = useWallet();
    const [canChangeRoute, setCanChangeRoute] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setCanChangeRoute(true);
      }, 10000); // Set the delay to 10 seconds

      // Cleanup the timeout if the component is unmounted before 10 seconds
      return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
      if (canChangeRoute && !wallet.walletAddress) {
        Router.replace('/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wallet.walletAddress, canChangeRoute]);

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return AuthComponent;
};

export default withAuth;

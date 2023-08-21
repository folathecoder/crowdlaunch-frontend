import { DisclaimerComponent } from '@rainbow-me/rainbowkit';

// Wallet connection disclaimer to mitigate legal risks
export const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet to CrowdLaunch, you acknowledge that investments on
    this platform carry significant risks. You could lose your entire
    investment. Please invest prudently and within your financial means.
  </Text>
);

// Wallet connection application info data
export const appInfo = {
  appName: 'CrowdLaunch',
  disclaimer: Disclaimer,
  learnMoreUrl:
    'https://crowdlaunch.vercel.app/guides/crowdlaunch-a-new-era-of-startup-funding',
};

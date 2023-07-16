import { APP_NAME } from '@/data/appInfo';

import {
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaTelegramPlane,
  FaPlusCircle,
} from 'react-icons/fa';

const currentYear: number = new Date().getFullYear();

export const headerMenu = [
  { id: 1, pageName: 'Explore', pageLink: '/explore' },
  { id: 2, pageName: 'Guides', pageLink: '/guides' },
];

export const footerMenu = {
  copyright: `Copyright © ${APP_NAME}, ${currentYear}`,
  footerLinks: [
    { id: 1, title: 'Terms', link: '/terms' },
    { id: 2, title: 'Privacy Policy', link: '/privacy-policy' },
    {
      id: 3,
      title: 'Risk Disclosure',
      link: '/risk-disclosure',
    },
  ],
  socials: [
    {
      id: 1,
      title: 'facebook',
      link: 'https://facebook.com',
      icon: FaFacebookF,
    },
    {
      id: 2,
      title: 'telegram',
      link: 'https://telegram.com',
      icon: FaTelegramPlane,
    },
    {
      id: 3,
      title: 'twitter',
      link: 'https://twitter.com',
      icon: FaTwitter,
    },
    {
      id: 4,
      title: 'linkedIn',
      link: 'https://www.linkedin.com/',
      icon: FaLinkedinIn,
    },
  ],
};

export const profileMenu = [
  {
    id: 1,
    pageName: 'Create Project',
    pageLink: '/create-project',
    icon: FaPlusCircle,
  },
  { id: 2, pageName: 'Profile', pageLink: '/profile/1', icon: null },
  {
    id: 3,
    pageName: 'Portfolio',
    pageLink: '/profile/1#portfolio',
    icon: null,
  },
  { id: 4, pageName: 'My NFTs', pageLink: '/profile/1#nfts', icon: null },
  {
    id: 5,
    pageName: 'My Projects',
    pageLink: '/profile/1#listed-projects',
    icon: null,
  },
  {
    id: 6,
    pageName: 'Watchlist',
    pageLink: '/profile/1#watchlist',
    icon: null,
  },
  { id: 7, pageName: 'Orders', pageLink: '/profile/1#orders', icon: null },
];

import { APP_NAME } from '@/data/appInfo';

import {
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaTelegramPlane,
} from 'react-icons/fa';

const currentYear: number = new Date().getFullYear();

export const headerMenu = [
  { id: 1, pageName: 'Explore', pageLink: '/explore' },
  { id: 2, pageName: 'Rankings', pageLink: '/rankings' },
  { id: 3, pageName: 'Guides', pageLink: '/guides' },
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

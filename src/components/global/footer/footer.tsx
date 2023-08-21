import React from 'react';
import Link from 'next/link';
import {
  FooterContainer,
  FooterInner,
  FooterCopyright,
  FooterSocialsContainer,
  FooterSocials,
} from '@/components/global/footer/footerStyles';
import { footerMenu } from '@/data/menuData';

const Footer = () => {
  const { copyright, socials } = footerMenu;

  return (
    <FooterContainer>
      <FooterInner>
        <FooterCopyright>
          <p>{copyright}</p>
        </FooterCopyright>
        <FooterSocialsContainer>
          <FooterSocials>
            {socials.map((social) => {
              return (
                <li key={social.id} aria-label={social.title}>
                  <div>
                    <Link href={social.link} passHref>
                      <social.icon />
                    </Link>
                  </div>
                </li>
              );
            })}
          </FooterSocials>
        </FooterSocialsContainer>
      </FooterInner>
    </FooterContainer>
  );
};

export default Footer;

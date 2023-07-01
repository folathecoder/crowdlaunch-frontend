import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FooterContainer,
  FooterInner,
  FooterCopyright,
  FooterSocialsContainer,
  FooterSocials,
  FooterNav,
  FooterLinks,
  FooterUniqueLink,
} from '@/components/global/footer/footerStyles';
import { footerMenu } from '@/data/menuData';

const Footer = () => {
  const { copyright, footerLinks, socials } = footerMenu;

  const router = useRouter();
  const { pathname } = router;

  return (
    <FooterContainer>
      <FooterInner>
        <FooterCopyright>
          <p>{copyright}</p>
        </FooterCopyright>
        <FooterNav>
          <FooterLinks>
            {footerLinks.map((link) => {
              const isActive = pathname === link.link;
              return (
                <FooterUniqueLink
                  key={link.id}
                  aria-label={link.title}
                  isActive={isActive}
                >
                  <Link href={link.link}>{link.title}</Link>
                </FooterUniqueLink>
              );
            })}
          </FooterLinks>
        </FooterNav>
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

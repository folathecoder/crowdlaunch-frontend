import React, { useState, useEffect, useCallback } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  LinkedinShareButton,
} from 'react-share';
import { useClipboard } from 'use-clipboard-copy';
import { ShareModalContainer, ShareItem, CopyItem } from './shareModalStyles';
import {
  FaTwitter,
  FaFacebookF,
  FaRedditAlien,
  FaLinkedinIn,
  FaLink,
} from 'react-icons/fa';

interface ShareModalTypes {
  shareUrl: string;
}

const shareLinks = [
  {
    id: 1,
    icon: <FaFacebookF />,
    title: 'Facebook',
    shareButton: FacebookShareButton,
  },
  {
    id: 2,
    icon: <FaTwitter />,
    title: 'Twitter',
    shareButton: TwitterShareButton,
  },
  {
    id: 3,
    icon: <FaRedditAlien />,
    title: 'Reddit',
    shareButton: RedditShareButton,
  },
  {
    id: 4,
    icon: <FaLinkedinIn />,
    title: 'LinkedIn',
    shareButton: LinkedinShareButton,
  },
];

const ShareModal = ({ shareUrl }: ShareModalTypes) => {
  const clipboard = useClipboard();
  const [copied, setCopied] = useState(false);

  const handleCopyClick = useCallback(() => {
    setCopied(true);
    clipboard.copy(shareUrl);
  }, [clipboard, shareUrl]);

  useEffect(() => {
    setTimeout(() => {
      if (copied) {
        setCopied(false);
      }
    }, 2000);
  }, [copied]);

  return (
    <ShareModalContainer>
      {shareLinks.map((link) => (
        <ShareItem key={link.id}>
          <link.shareButton url={shareUrl}>
            <div className="share_item">
              <div>{link.icon}</div>
              <div>
                <p>{link.title}</p>
              </div>
            </div>
          </link.shareButton>
        </ShareItem>
      ))}
      <CopyItem onClick={handleCopyClick}>
        <div>
          <FaLink />
        </div>
        <div>
          <p>{copied ? 'Copied!' : 'Copy Link'}</p>
        </div>
      </CopyItem>
    </ShareModalContainer>
  );
};

export default ShareModal;

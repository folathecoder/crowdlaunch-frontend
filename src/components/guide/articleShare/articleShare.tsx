import React, { useCallback, useState, useEffect } from 'react';
import { ShareContainer } from './articleShareStyles';
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  RedditShareButton,
  LinkedinShareButton,
} from 'react-share';
import { useClipboard } from 'use-clipboard-copy';
import Tooltip from '@mui/material/Tooltip';
import {
  FaTwitter,
  FaFacebookF,
  FaPinterestP,
  FaRedditAlien,
  FaLinkedinIn,
  FaLink,
} from 'react-icons/fa';

interface ArticleShareTypes {
  shareUrl: string;
}

const ArticleShare = ({ shareUrl }: ArticleShareTypes) => {
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
    <ShareContainer>
      <FacebookShareButton url={shareUrl}>
        <div style={{ backgroundColor: '#3A579A' }}>
          <FaFacebookF />
        </div>
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl}>
        <div style={{ backgroundColor: '#00ABF0' }}>
          <FaTwitter />
        </div>
      </TwitterShareButton>
      <PinterestShareButton
        url={shareUrl}
        media="https://mksdmcdn-9b59.kxcdn.com/gridlove/wp-content/uploads/2016/09/gridlock_43.jpg"
        description="/"
      >
        <div style={{ backgroundColor: '#CD1C1F' }}>
          <FaPinterestP />
        </div>
      </PinterestShareButton>
      <RedditShareButton url={shareUrl}>
        <div style={{ backgroundColor: '#FC461E' }}>
          <FaRedditAlien />
        </div>
      </RedditShareButton>
      <LinkedinShareButton title="" summary="" source={shareUrl} url={shareUrl}>
        <div style={{ backgroundColor: '#127BB6' }}>
          <FaLinkedinIn />
        </div>
      </LinkedinShareButton>
      <Tooltip
        title="Copied!"
        arrow
        open={copied}
        PopperProps={{
          sx: {
            '& .MuiTooltip-tooltip': {
              border: 'none',
              color: 'var(--color-font-200)',
              fontSize: '14px',
              padding: '6px',
              lineHeight: '21px',
              backgroundColor: 'var(--color-bg-200)',
            },

            '& .MuiTooltip-popperArrow': {
              backgroundColor: 'var(--color-bg-200) !important',
            },
          },
        }}
      >
        <div style={{ backgroundColor: '#790b56cf' }} onClick={handleCopyClick}>
          <FaLink />
        </div>
      </Tooltip>
    </ShareContainer>
  );
};

export default ArticleShare;

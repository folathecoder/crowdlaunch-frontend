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
          <i className="fa-brands fa-facebook-f"></i>
        </div>
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl}>
        <div style={{ backgroundColor: '#00ABF0' }}>
          <i className="fa-brands fa-twitter"></i>
        </div>
      </TwitterShareButton>
      <PinterestShareButton
        url={shareUrl}
        media="https://mksdmcdn-9b59.kxcdn.com/gridlove/wp-content/uploads/2016/09/gridlock_43.jpg"
        description="/"
      >
        <div style={{ backgroundColor: '#CD1C1F' }}>
          <i className="fa-brands fa-pinterest"></i>
        </div>
      </PinterestShareButton>
      <RedditShareButton url={shareUrl}>
        <div style={{ backgroundColor: '#FC461E' }}>
          <i className="fa-brands fa-reddit-alien"></i>
        </div>
      </RedditShareButton>
      <LinkedinShareButton title="" summary="" source={shareUrl} url={shareUrl}>
        <div style={{ backgroundColor: '#127BB6' }}>
          <i className="fa-brands fa-linkedin-in"></i>
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
          <i className="fa-solid fa-link"></i>
        </div>
      </Tooltip>
    </ShareContainer>
  );
};

export default ArticleShare;

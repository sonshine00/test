import React, { useState } from 'react';
import { i18n } from '../data/i18n';

const ShareButton = ({ lang, resultType }) => {
  const [copied, setCopied] = useState(false);
  const texts = i18n[lang] || i18n.en;

  const handleShare = () => {
    // Share the home URL for virality, but include the result name in text
    const url = `${window.location.origin}${window.location.pathname.split('#')[0]}#/${lang}`;
    const shareText = resultType 
      ? `${texts.shareMessage(resultType)} ${url}`
      : `${texts.title} - ${url}`;

    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="share-container">
      <button className="primary-button share-button" onClick={handleShare}>
        📢 {texts.share}
      </button>
      {copied && <p className="copied-text">{texts.copied}</p>}
    </div>
  );
};

export default ShareButton;
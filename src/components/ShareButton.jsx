import React, { useState } from 'react';
import { i18n } from '../data/i18n';

const ShareButton = ({ lang }) => {
  const [copied, setCopied] = useState(false);
  const texts = i18n[lang];

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="share-container">
      <button className="share-button" onClick={handleShare}>
        {texts.share}
      </button>
      {copied && <p className="copied-text">{texts.copied}</p>}
    </div>
  );
};

export default ShareButton;

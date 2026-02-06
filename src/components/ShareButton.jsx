import React, { useState } from 'react';
import { i18n } from '../data/i18n';

const ShareButton = ({ lang, resultType, testId }) => {
  const [showToast, setShowToast] = useState(false);
  const texts = i18n[lang] || i18n.en;

  const handleShare = () => {
    // Construct the canonical URL for the test (sharing the start page is better for virality)
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}#/${lang}/${testId}`;
    
    const shareText = texts.shareTemplate(resultType || '?', shareUrl);

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      });
    }
  };

  return (
    <div className="share-container">
      <button className="primary-button share-button" onClick={handleShare}>
        📢 {texts.share}
      </button>
      {showToast && (
        <div className="toast fade-in">
          {texts.linkCopied}
        </div>
      )}
    </div>
  );
};

export default ShareButton;

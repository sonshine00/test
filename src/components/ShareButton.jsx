import React, { useState } from 'react';
import { i18n } from '../data/i18n';

const ShareButton = ({ lang, resultType, testId }) => {
  const [showToast, setShowToast] = useState(false);
  const texts = i18n[lang] || i18n.en;

  // Construct sharing details
  const baseUrl = window.location.origin + window.location.pathname;
  const shareUrl = `${baseUrl}#/${lang}/${testId}`;
  const shareText = texts.shareTemplate(resultType || '?', shareUrl);

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      });
    }
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(fbUrl, '_blank');
  };

  return (
    <div className="share-container">
      <h3 className="share-title">{texts.share}</h3>
      <div className="share-buttons-grid">
        <button className="share-icon-button twitter" onClick={shareOnTwitter} aria-label="Share on Twitter">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          <span>Twitter</span>
        </button>
        <button className="share-icon-button facebook" onClick={shareOnFacebook} aria-label="Share on Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          <span>Facebook</span>
        </button>
        <button className="share-icon-button copy" onClick={copyToClipboard} aria-label="Copy Link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          <span>{texts.linkCopied.split(' ')[0]}</span>
        </button>
      </div>
      {showToast && (
        <div className="toast fade-in">
          {texts.linkCopied}
        </div>
      )}
    </div>
  );
};

export default ShareButton;
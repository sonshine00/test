import React, { useState } from 'react';
import { i18n } from '../data/i18n';
import { generateShareText } from '../utils/share';

const ShareButton = ({ lang, resultType, testId }) => {
  const [showToast, setShowToast] = useState(false);
  const texts = i18n[lang] || i18n.en;

  // Construct sharing details using the utility
  const shareText = generateShareText(testId, resultType, lang);
  
  // URL for platforms that prefer a separate URL field
  const baseUrl = window.location.origin + window.location.pathname;
  const shareUrl = `${baseUrl}#/${lang}/${testId}`;

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

  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareOnTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <div className="share-container viral-share-section">
      <h3 className="share-title">{texts.share}</h3>
      <div className="share-buttons-grid">
        <button className="share-icon-button twitter" onClick={shareOnTwitter} aria-label="Share on X">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          <span>X</span>
        </button>
        <button className="share-icon-button facebook" onClick={shareOnFacebook} aria-label="Share on Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          <span>Facebook</span>
        </button>
        <button className="share-icon-button whatsapp" onClick={shareOnWhatsApp} aria-label="Share on WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.13.57-.074 1.758-.706 2.006-1.388.248-.682.248-1.265.174-1.388-.074-.124-.272-.198-.57-.347m-4.821 8.39c-1.72 0-3.4-.458-4.874-1.321l-.35-.206-3.625.95 1.03-3.21-.226-.36c-.947-1.505-1.448-3.253-1.448-5.05 0-5.27 4.317-9.56 9.62-9.56 2.566 0 4.978 1.002 6.79 2.81 1.812 1.81 2.812 4.223 2.812 6.79 0 5.27-4.317 9.56-9.62 9.56m8.173-17.71C18.59 3.123 15.823 2 12.869 2 6.81 2 2.018 6.77 2.018 12.63c0 1.873.488 3.702 1.413 5.325L2 22l4.897-1.28c1.573.853 3.346 1.303 5.155 1.303 6.057 0 10.85-4.77 10.85-10.63 0-2.84-.515-5.51-2.868-7.73z"/></svg>
          <span>WhatsApp</span>
        </button>
        <button className="share-icon-button telegram" onClick={shareOnTelegram} aria-label="Share on Telegram">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.18-.08-.04-.19-.01-.27.01-.12.02-1.97 1.24-5.55 3.66-.52.36-1 .53-1.43.52-.48-.01-1.4-.27-2.08-.5-.84-.27-1.5-.42-1.44-.89.03-.24.44-.49 1.24-.73 4.85-2.11 8.08-3.5 9.7-4.17.6-.25 1.25-.35 1.7-.35.14 0 .45.02.66.12.21.1.47.25.53.51.06.26.08.54.07.82z"/></svg>
          <span>Telegram</span>
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

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { i18n } from '../data/i18n';

const ContactForm = () => {
  const { lang } = useParams();
  const texts = i18n[lang] || i18n.en;
  
  const [status, setStatus] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/xzdapqrj", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('SUCCESS');
        form.reset();
      } else {
        setStatus('ERROR');
      }
    } catch (error) {
      setStatus('ERROR');
    }
  };

  const contactTexts = {
    en: {
      title: "Partnership Inquiry",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send Message",
      success: "Thank you! Your message has been sent.",
      error: "Oops! There was a problem sending your message."
    },
    ko: {
      title: "제휴 문의",
      name: "성함/기업명",
      email: "이메일",
      message: "문의 내용",
      send: "문의하기",
      success: "감사합니다! 메시지가 성공적으로 전송되었습니다.",
      error: "죄송합니다. 메시지 전송 중 오류가 발생했습니다."
    }
  };

  const t = contactTexts[lang] || contactTexts.en;

  return (
    <div className="contact-section highlight-card">
      <h3>🤝 {t.title}</h3>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">{t.name}</label>
          <input type="text" name="name" id="name" required placeholder={t.name} />
        </div>
        <div className="form-group">
          <label htmlFor="email">{t.email}</label>
          <input type="email" name="email" id="email" required placeholder={t.email} />
        </div>
        <div className="form-group">
          <label htmlFor="message">{t.message}</label>
          <textarea name="message" id="message" required placeholder={t.message}></textarea>
        </div>
        <button type="submit" className="primary-button">
          {t.send}
        </button>
        
        {status === 'SUCCESS' && <p className="status-text success">{t.success}</p>}
        {status === 'ERROR' && <p className="status-text error">{t.error}</p>}
      </form>
    </div>
  );
};

export default ContactForm;

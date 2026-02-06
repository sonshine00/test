import { i18n } from '../data/i18n';
import { tests } from '../data/tests';

/**
 * Generates localized share text for a given test and result.
 * @param {string} testId - The ID of the test (e.g., 'kpop_vibe')
 * @param {string} resultName - The display name of the result (e.g., 'Bright Mood Maker')
 * @param {string} lang - Language code ('en' or 'ko')
 * @returns {string} - The formatted share text
 */
export const generateShareText = (testId, resultName, lang) => {
  const texts = i18n[lang] || i18n.en;
  const currentTest = tests[testId];
  const testTitle = currentTest?.[lang]?.title || currentTest?.en?.title || 'Personality Test';
  
  const baseUrl = window.location.origin + window.location.pathname;
  const shareUrl = `${baseUrl}#/${lang}/${testId}`;
  
  return texts.shareTemplate(testTitle, resultName || '?', shareUrl);
};

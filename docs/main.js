const translations = {
    en: {
      select_language: "Language",
      title: "Lesotho National Adaptation Plan",
      paragraph: "Preliminaries"
    },
    st: {
      select_language: "Puo",
      title: "Leano la naha la Lesotho la tokiso",
      paragraph: "Tse qalang"
    }
  };

  function generateKey(text) {
    return text.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');
  }
  
  function addDataTranslateAttributes() {
    const elements = document.querySelectorAll('title, h1, p, select, option');
    elements.forEach(element => {
      if (!element.hasAttribute('data-translate')) {
        const text = element.textContent.trim();
        if (text) {
          const key = generateKey(text);
          element.setAttribute('data-translate', key);
          if (!translations.en[key]) {
            translations.en[key] = text; // Add original text to the translations if not present
          }
        }
      }
    });
  }
  
  function applyTranslations(language) {
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      if (translations[language] && translations[language][key]) {
        element.textContent = translations[language][key];
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    // Automatically add data-translate attributes
    addDataTranslateAttributes();
  
    const selectElement = document.getElementById('language-select');
    
    // Apply translations on page load
    const defaultLanguage = 'en'; // You can dynamically determine this based on user settings or browser settings
    applyTranslations(defaultLanguage);
    
    // Add event listener for language change
    selectElement.addEventListener('change', (event) => {
      const selectedLanguage = event.target.value;
      applyTranslations(selectedLanguage);
    });
  });
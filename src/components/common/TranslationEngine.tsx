import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TranslationEngine = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. Setup the global callback for Google Translate
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
      );
    };

    // 2. Inject the script only if it doesn't exist
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    // 3. Robust Cleanup Observer to absolutely destroy UI glitches
    const observer = new MutationObserver(() => {
        // Destroy the banner frame if it appears
        const banner = document.querySelector('.goog-te-banner-frame') as HTMLElement;
        if (banner) {
          banner.style.display = 'none';
        }

        // Force body top to 0 to prevent the shift
        if (document.body.style.top !== '0px') {
          document.body.style.top = '0px';
        }

        // Destroy the tooltip popup box
        const tooltip = document.getElementById('goog-gt-tt') as HTMLElement;
        if (tooltip) {
          tooltip.style.display = 'none';
          tooltip.style.opacity = '0';
        }

        // Strip the hover highlighting classes completely from all elements
        const highlights = document.querySelectorAll('.goog-text-highlight');
        highlights.forEach((el) => {
          el.classList.remove('goog-text-highlight');
        });
    });

    // Start observing the whole document for changes
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Whenever the route changes, we might need to kick the engine if it missed something.
  useEffect(() => {
    const timer = setTimeout(() => {
      const banner = document.querySelector('.goog-te-banner-frame') as HTMLElement;
      if (banner) banner.style.display = 'none';
      if (document.body.style.top !== '0px') document.body.style.top = '0px';
    }, 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div id="google_translate_element" style={{ display: 'none' }}></div>
  );
};

export default TranslationEngine;

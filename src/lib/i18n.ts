import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "nav": {
        "Home": "Home",
        "Districts": "Districts",
        "Culture": "Culture",
        "Community": "Community",
        "Tourism": "Tourism",
        "Tribals": "Tribals",
        "MarketPlace": "MarketPlace",
        "Gallery": "Gallery",
        "Share Your Story": "Share Your Story",
        "Login": "Login",
        "Logout": "Logout",
        "Admin": "Admin"
      },
      "home": {
        "hero_title_start": "Discover the\nSoul of ",
        "hero_title_highlight": "Bihar",
        "hero_title_end": "",
        "hero_subtitle": "Experience the rich heritage, vibrant culture, and untold stories of one of India's most historic lands.",
        "explore_button": "Explore Now"
      },
      "footer": {
        "subtitle": "Discover the Soul of India",
        "description": "Your gateway to explore, experience and contribute to the rich heritage and culture of Bihar.",
        "quick_links": "Quick Links",
        "connect": "Connect",
        "follow_us": "Follow Us",
        "about_us": "About Us",
        "contact_us": "Contact Us",
        "privacy": "Privacy Policy"
      },
      "sections": {
        "popular_places_title": "Popular Places You Must Visit",
        "popular_places_subtitle": "Explore",
        "districts_title": "Districts of Bihar",
        "districts_subtitle": "Discover",
        "districts_action": "View All Districts",
        "communities_title": "Discover Community",
        "communities_subtitle": "Communities",
        "communities_action": "View All Communities",
        "map_title": "Bihar District Map",
        "map_subtitle": "Interactive",
        "map_desc": "Hover to explore, click to select a district. Use zoom controls or scroll to zoom in.",
        "gallery_title": "Photo Gallery",
        "gallery_subtitle": "Visuals",
        "share_title": "Share Your Bihar Story",
        "share_title_2": "With the World",
        "share_button": "Share Story",
        "upload_photos": "Upload Photos"
      },
      "culture": {
        "title": "Bihar's Rich",
        "title_highlight": "Culture",
        "subtitle": "Dive into the vibrant festivals and mouth-watering culinary heritage that define the soul of Bihar. Use the filters below to explore by region or category.",
        "all_categories": "All",
        "all_districts": "All Districts",
        "festival": "Festival",
        "food": "Food"
      },
      "districts": {
        "Patna": "Patna",
        "Gaya": "Gaya",
        "Nalanda": "Nalanda",
        "Bhagalpur": "Bhagalpur",
        "Muzaffarpur": "Muzaffarpur",
        "Darbhanga": "Darbhanga",
        "Vaishali": "Vaishali",
        "Sonepur": "Sonepur",
        "Mithila": "Mithila",
        "Bodh Gaya": "Bodh Gaya",
        "Rajgir": "Rajgir",
        "Patna Sahib": "Patna Sahib",
        "Pawapuri": "Pawapuri",
        "Gaya District": "Gaya District",
        "Nalanda District": "Nalanda District",
        "Vaishali District": "Vaishali District",
        "Patna District": "Patna District"
      }
    }
  },
  hi: {
    translation: {
      "nav": {
        "Home": "मुख्य पृष्ठ",
        "Districts": "ज़िले",
        "Culture": "संस्कृति",
        "Community": "समुदाय",
        "Tourism": "पर्यटन",
        "Tribals": "आदिवासी",
        "MarketPlace": "बाज़ार",
        "Gallery": "गैलरी",
        "Share Your Story": "अपनी कहानी साझा करें",
        "Login": "लॉग इन",
        "Logout": "लॉग आउट",
        "Admin": "एडमिन"
      },
      "home": {
        "hero_title_start": "",
        "hero_title_highlight": "बिहार",
        "hero_title_end": " की ऐतिहासिक विरासत का सफर करें",
        "hero_subtitle": "भारत के सबसे ऐतिहासिक स्थानों में से एक की समृद्ध विरासत, जीवंत संस्कृति और अनकही कहानियों का अनुभव करें।",
        "explore_button": "अभी एक्सप्लोर करें"
      },
      "footer": {
        "subtitle": "भारत की आत्मा की खोज करें",
        "description": "बिहार की समृद्ध विरासत और संस्कृति का पता लगाने, अनुभव करने और उसमें योगदान करने का आपका प्रवेश द्वार।",
        "quick_links": "त्वरित लिंक",
        "connect": "संपर्क करें",
        "follow_us": "हमें फॉलो करें",
        "about_us": "हमारे बारे में",
        "contact_us": "संपर्क सूत्र",
        "privacy": "गोपनीयता नीति"
      },
      "sections": {
        "popular_places_title": "लोकप्रिय स्थान जो आपको देखने चाहिए",
        "popular_places_subtitle": "अन्वेषण करें",
        "districts_title": "बिहार के जिले",
        "districts_subtitle": "खोजें",
        "districts_action": "सभी जिले देखें",
        "communities_title": "समुदाय की खोज करें",
        "communities_subtitle": "समुदाय",
        "communities_action": "सभी समुदाय देखें",
        "map_title": "बिहार का जिला मानचित्र",
        "map_subtitle": "इंटरैक्टिव",
        "map_desc": "खोजने के लिए होवर करें, जिला चुनने के लिए क्लिक करें। ज़ूम इन करने के लिए स्क्रॉल करें।",
        "gallery_title": "फोटो गैलरी",
        "gallery_subtitle": "दृश्य",
        "share_title": "अपनी बिहार की कहानी",
        "share_title_2": "दुनिया के साथ साझा करें",
        "share_button": "कहानी साझा करें",
        "upload_photos": "तस्वीरें अपलोड करें"
      },
      "culture": {
        "title": "बिहार की समृद्ध",
        "title_highlight": "संस्कृति",
        "subtitle": "जीवंत त्योहारों और मुंह में पानी लाने वाली पाक विरासत में गोता लगाएँ जो बिहार की आत्मा को परिभाषित करती है। क्षेत्र या श्रेणी के अनुसार अन्वेषण करने के लिए नीचे दिए गए फ़िल्टर का उपयोग करें।",
        "all_categories": "सभी",
        "all_districts": "सभी जिले",
        "festival": "त्यौहार",
        "food": "भोजन"
      },
      "districts": {
        "Patna": "पटना",
        "Gaya": "गया",
        "Nalanda": "नालंदा",
        "Bhagalpur": "भागलपुर",
        "Muzaffarpur": "मुजफ्फरपुर",
        "Darbhanga": "दरभंगा",
        "Vaishali": "वैशाली",
        "Sonepur": "सोनपुर",
        "Mithila": "मिथिला",
        "Bodh Gaya": "बोध गया",
        "Rajgir": "राजगीर",
        "Patna Sahib": "पटना साहिब",
        "Pawapuri": "पावापुरी",
        "Gaya District": "गया जिला",
        "Nalanda District": "नालंदा जिला",
        "Vaishali District": "वैशाली जिला",
        "Patna District": "पटना जिला"
      }
    }
  }
};

const match = typeof document !== 'undefined' ? document.cookie.match(/googtrans=\/en\/(hi|en)/) : null;
const defaultLang = (match && match[1] === "hi") ? "hi" : "en";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLang,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

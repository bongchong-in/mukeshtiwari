import { JournalEntry } from './types';

// Theme Configuration for logical colors (used in Canvas/JS)
export const THEME_CONFIG = {
  rippleColors: [
    '140, 74, 50',   // #8C4A32 (Mud Brown)
    '93, 109, 88',   // #5D6D58 (Moss Green)
    '168, 181, 178'  // #A8B5B2 (River Blue)
  ]
};

// Main Site Content
export const SITE_CONTENT = {
  hero: {
    badge: "सहज कला (Spontaneous Art)",
    titleLine1: "The Act of",
    titleLine2: "Nature.",
    quote: "\"Creativity is physical, not mental.\""
  },
  
  about: {
    avatarText: "Zauq",
    hindiName: "ज़ौक़ (Aesthetic Sense)",
    tags: [
      "BHU Fine Arts",
      "10+ Years Theatre",
      "JNV Educator"
    ],
    headline: {
      line1: "\"I don't just paint.",
      line2: "I perform the painting.\""
    },
    description: {
      part1: "My background in theatre taught me that art needs a voice. When I walk into the forest, I am not an observer. I am a participant. The mud, the algae, the ",
      highlight: "Gobar",
      part2: " (cow dung)—these are my co-actors."
    }
  },

  journal: {
    title: "Field Notes",
    subtitle: "प्रकृति के रंग",
    entries: [
      {
        id: 1,
        title: "Forest Part-1",
        hindiTitle: "जंगल की स्मृति",
        date: "Dec 04",
        material: "Mud, Dried Leaves, River Water",
        image: "https://raw.githubusercontent.com/bongchong-in/mukeshtiwari/refs/heads/main/images/first.jpg", 
        note: "I didn't paint this. The river did. I just held the canvas.",
        rotation: "rotate-1"
      },
      {
        id: 2,
        title: "The Stigma (Gobar)",
        hindiTitle: "गोबर कला",
        date: "Nov 20",
        material: "Cow Dung, Watercolours",
        image: "https://raw.githubusercontent.com/bongchong-in/mukeshtiwari/refs/heads/main/images/gobar.jpg",
        note: "People say it's waste. I see texture. Art is not in the material, but in the vision (Drishti).",
        rotation: "-rotate-1"
      },
      {
        id: 3,
        title: "River's Biography",
        hindiTitle: "नदी की आत्मकथा",
        date: "Nov 15",
        material: "Pond Algae (Kai), Sludge",
        image: "https://raw.githubusercontent.com/bongchong-in/mukeshtiwari/refs/heads/main/images/river.jpg",
        note: "The algae refused to stick, but it left its stain. Imperfection is the only truth.",
        rotation: "rotate-2"
      }
    ] as JournalEntry[]
  },

  contact: {
    title: "Connect & Create",
    subtitle: "कला संवाद (Art Dialogue)",
    formConfig: {
      submitUrl: "https://docs.google.com/forms/d/e/1FAIpQLSempnuvtR2YrdZF40lku-ovMs7q6rP_eXakz-C3skwALH3WRA/formResponse",
      fieldMapping: {
        type: "entry.1531653842",
        name: "entry.2141127643",
        email: "entry.232787832",
        message: "entry.1875764139"
      },
      options: {
        commission: {
          label: "Buy / Commission",
          placeholder: "Describe the piece you are looking for..."
        },
        workshop: {
          label: "Join Workshop",
          placeholder: "Which workshop or city are you interested in?"
        },
        exhibition: {
          label: "Exhibitions",
          placeholder: "Any specific queries about upcoming shows?"
        }
      }
    },
    info: {
      location: "Varanasi, India",
      email: "mukeshtiwariartist@gmail.com",
      instagramHandle: "Instagram",
      instagramUrl: "https://www.instagram.com/m_art_spontaneous",
      instagramDmUrl: "https://ig.me/m/m_art_spontaneous",
      dmButtonText: "DM on Insta"
    },
    credits: {
      text: "Designed, gifted and supported by",
      studioName: "MxS Studio",
      studioUrl: "https://mxsstudio.edgentiq.com"
    }
  }
};
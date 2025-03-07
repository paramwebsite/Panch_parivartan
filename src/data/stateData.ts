export const stateData = {
    "jammu-kashmir": {
      id: "jammu-kashmir",
      name: "Jammu & Kashmir",
      facts: {
        attire: "Pheran",
        language: "Kashmiri, Dogri",
        food: "Rogan Josh, Kahwa",
        dance: "Rouf",
        festival: "Eid, Baisakhi"
      }
    },
    "himachal-pradesh": {
      id: "himachal-pradesh",
      name: "Himachal Pradesh",
      facts: {
        attire: "Kurta Pyjama, Shalwar Kameez",
        language: "Hindi, Pahari",
        food: "Dham, Madra",
        dance: "Nati",
        festival: "Kullu Dussehra"
      }
    },
    "punjab": {
      id: "punjab",
      name: "Punjab",
      facts: {
        attire: "Phulkari for women, Kurta Pajama for men",
        language: "Punjabi",
        food: "Sarson da Saag, Makki di Roti",
        dance: "Bhangra",
        festival: "Lohri"
      }
    },
    "uttar-pradesh": {
      id: "uttar-pradesh",
      name: "Uttar Pradesh",
      facts: {
        attire: "Dhoti Kurta, Sari",
        language: "Hindi, Urdu",
        food: "Kebabs, Biryani",
        dance: "Kathak",
        festival: "Diwali"
      }
    },
    "haryana": {
      id: "haryana",
      name: "Haryana",
      facts: {
        attire: "Dhoti Kurta, Ghagra Choli",
        language: "Haryanvi",
        food: "Kadhi Pakora, Bajre ki Khichdi",
        dance: "Phag Dance",
        festival: "Teej"
      }
    },
    "rajasthan": {
      id: "rajasthan",
      name: "Rajasthan",
      facts: {
        attire: "Ghagra Choli, Dhoti Kurta",
        language: "Rajasthani",
        food: "Dal Baati Churma",
        dance: "Ghoomar",
        festival: "Pushkar Fair"
      }
    },
    "gujarat": {
      id: "gujarat",
      name: "Gujarat",
      facts: {
        attire: "Chaniya Choli, Kediya",
        language: "Gujarati",
        food: "Dhokla, Thepla",
        dance: "Garba",
        festival: "Navratri"
      }
    },
    "madhya-pradesh": {
      id: "madhya-pradesh",
      name: "Madhya Pradesh",
      facts: {
        attire: "Chanderi Sari, Dhoti Kurta",
        language: "Hindi",
        food: "Poha, Bhutte ka Kees",
        dance: "Jawara",
        festival: "Lokrang"
      }
    },
    "maharashtra": {
      id: "maharashtra",
      name: "Maharashtra",
      facts: {
        attire: "Nauvari Saree, Dhoti Kurta",
        language: "Marathi",
        food: "Vada Pav, Puran Poli",
        dance: "Lavani",
        festival: "Ganesh Chaturthi"
      }
    },
    "kerala": {
      id: "kerala",
      name: "Kerala",
      facts: {
        attire: "Kasavu Saree, Mundu",
        language: "Malayalam",
        food: "Appam, Kerala Fish Curry",
        dance: "Kathakali",
        festival: "Onam"
      }
    },
    "tamil-nadu": {
      id: "tamil-nadu",
      name: "Tamil Nadu",
      facts: {
        attire: "Madisar, Veshti",
        language: "Tamil",
        food: "Idli, Dosa",
        dance: "Bharatanatyam",
        festival: "Pongal"
      }
    },
    "andhra-pradesh": {
      id: "andhra-pradesh",
      name: "Andhra Pradesh",
      facts: {
        attire: "Langa Voni, Pancha",
        language: "Telugu",
        food: "Hyderabadi Biryani, Gongura",
        dance: "Kuchipudi",
        festival: "Sankranti"
      }
    },
    "telangana": {
      id: "telangana",
      name: "Telangana",
      facts: {
        attire: "Langa Voni, Dhoti",
        language: "Telugu",
        food: "Hyderabadi Biryani, Haleem",
        dance: "Perini Shivatandavam",
        festival: "Bathukamma"
      }
    },
    "chhattisgarh": {
      id: "chhattisgarh",
      name: "Chhattisgarh",
      facts: {
        attire: "Lugda, Dhoti Kurta",
        language: "Chhattisgarhi",
        food: "Chila, Muthia",
        dance: "Panthi",
        festival: "Hareli"
      }
    },
    "bihar": {
      id: "bihar",
      name: "Bihar",
      facts: {
        attire: "Dhoti Kurta, Sari",
        language: "Bhojpuri, Maithili",
        food: "Litti Chokha",
        dance: "Bidesia",
        festival: "Chhath Puja"
      }
    },
    "west-bengal": {
      id: "west-bengal",
      name: "West Bengal",
      facts: {
        attire: "Dhoti, Sari",
        language: "Bengali",
        food: "Rosogolla, Machher Jhol",
        dance: "Rabindra Nritya",
        festival: "Durga Puja"
      }
    },
    "assam": {
      id: "assam",
      name: "Assam",
      facts: {
        attire: "Mekhela Chador, Dhoti",
        language: "Assamese",
        food: "Masor Tenga, Pitha",
        dance: "Bihu",
        festival: "Bihu"
      }
    }
  };
  
  export const generateQuestion = (): Question => {
    const states = Object.values(stateData);
    const state = states[Math.floor(Math.random() * states.length)];
    const categories: Array<'attire' | 'language' | 'food' | 'dance' | 'festival'> = 
      ['attire', 'language', 'food', 'dance', 'festival'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    const questions = {
      attire: `Which state's traditional dress includes ${state.facts.attire}?`,
      language: `In which state is ${state.facts.language} the primary language?`,
      food: `${state.facts.food} is a famous dish from which state?`,
      dance: `${state.facts.dance} is a classical dance form from which state?`,
      festival: `${state.facts.festival} is majorly celebrated in which state?`
    };
  
    return {
      id: `${state.id}-${category}`,
      text: questions[category],
      correctState: state.id,
      category
    };
  };
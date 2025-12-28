
import { Language } from './types';

export const translations: Record<Language, any> = {
  he: {
    title: "הגמוניה במזרח התיכון",
    startTitle: "גורל האומה בידיך",
    startDesc: "הובל את מדינתך במזרח התיכון המודרני. עליך לנווט בין מלחמות, הסכמי שלום, פיתוח צבאי ומשברים כלכליים.",
    newGame: "התחל משחק חדש",
    loadGame: "טען משחק שמור",
    save: "שמור",
    archive: "ארכיון",
    turn: "תור",
    victory: "ניצחון היסטורי!",
    gameOver: "המשחק נגמר",
    restart: "נסה שוב מההתחלה",
    share: "שתף הישגים",
    feedback: "שלח משוב",
    stats: {
      military: "עוצמה צבאית",
      diplomacy: "דיפלומטיה",
      territory: "טריטוריה",
      economy: "כלכלה"
    },
    ui: {
      intelReport: "דו\"ח מודיעין",
      results: "תוצאות המבצע",
      nextTurn: "המשך לתור הבא",
      saving: "נשמר!",
      loading: "טוען...",
      error: "אירעה שגיאה."
    },
    scenarios: [
      {
        title: "משבר המים בגבול",
        description: "מדינה שכנה החלה בבניית סכר ענק במעלה הנהר, מה שמאיים לייבש את המקורות החקלאיים שלך.",
        choices: [
          { id: "1a", label: "תגובה צבאית", description: "פרוס כוחות בגבול ואיימ בתקיפה אווירית אם הבנייה לא תיפסק.", impact: { military: 10, diplomacy: -15, territory: 0, economy: -5, narrativeResult: "השכנה עצרה את הבנייה בלחץ האיום, אך היחסים הדיפלומטיים הגיעו לשפל היסטורי." } },
          { id: "1b", label: "משא ומתן", description: "הצע הסכם לשיתוף פעולה אנרגטי תמורת הבטחת זרימת המים.", impact: { military: -5, diplomacy: 15, territory: 0, economy: 10, narrativeResult: "הושג הסכם היסטורי. זרימת המים הובטחה והכלכלה המקומית קיבלה דחיפה מהפרויקט המשותף." } },
          { id: "1c", label: "פנייה לאו\"ם", description: "בקש התערבות בינלאומית וסנקציות על המדינה השכנה.", impact: { military: 0, diplomacy: 5, territory: -5, economy: -5, narrativeResult: "התהליך באו\"ם איטי. השכנה ממשיכה בבנייה והחקלאות בגבול סובלת." } }
        ]
      },
      {
        title: "מהפכת ה'סיליקון דזרט'",
        description: "חברת טכנולוגיה רב-לאומית מעוניינת להקים מרכז פיתוח ענק באזור המדברי שלך.",
        choices: [
          { id: "2a", label: "סבסוד ממשלתי", description: "הצע הקלות מס מפליגות וקרקע בחינם כדי למשוך את החברה.", impact: { military: 0, diplomacy: 5, territory: 0, economy: 20, narrativeResult: "המרכז הוקם והפך למנוע צמיחה אדיר, אך הגירעון הממשלתי גדל." } },
          { id: "2b", label: "דרישה לייצור מקומי", description: "התנה את ההקמה בהעסקת 80% עובדים מקומיים והעברת ידע.", impact: { military: 5, diplomacy: 0, territory: 0, economy: 10, narrativeResult: "החברה הסכימה בקושי. ההון האנושי המקומי צמח, אך ההשקעה הייתה קטנה מהצפוי." } },
          { id: "2c", label: "הקמת חברה ממשלתית", description: "דחה את ההצעה והקם פרויקט טכנולוגי לאומי מתחרה.", impact: { military: 15, diplomacy: -5, territory: 0, economy: -10, narrativeResult: "הפרויקט הלאומי זלל תקציבים, אך העניק למדינה עצמאות טכנולוגית צבאית קריטית." } }
        ]
      },
      {
        title: "גילוי גז בים",
        description: "נמצאו עתודות גז עצומות במים הכלכליים, אך הגבול הימי עם המדינה השכנה שנוי במחלוקת.",
        choices: [
          { id: "3a", label: "קידוח חד צדדי", description: "שלח ספינות קידוח בליווי ספינות טילים להגן על האזור.", impact: { military: 10, diplomacy: -20, territory: 15, economy: 20, narrativeResult: "הפקת הגז החלה והפכתם למעצמת אנרגיה, אך סכנת המלחמה גדלה משמעותית." } },
          { id: "3b", label: "חלוקת רווחים", description: "הצע לשכנה לחלק את הרווחים חצי-חצי תמורת הכרה בגבול.", impact: { military: -5, diplomacy: 20, territory: 5, economy: 10, narrativeResult: "הסכם חלוצי הושג. השקט בים נשמר והרווחים זורמים לקופת המדינה." } },
          { id: "3c", label: "הקפאת הפרויקט", description: "המתן לבוררות בינלאומית לפני תחילת העבודות.", impact: { military: 0, diplomacy: 10, territory: 0, economy: -10, narrativeResult: "התהליך המשפטי נגרר שנים. המדינה נותרה תלויה ביבוא אנרגיה יקר." } }
        ]
      },
      {
        title: "גל הגירה אזורי",
        description: "מלחמת אזרחים במדינה סמוכה שולחת מאות אלפי פליטים לכיוון הגבולות שלך.",
        choices: [
          { id: "4a", label: "גבולות פתוחים", description: "קבל את הפליטים והענק להם סיוע הומניטרי מלא.", impact: { military: -10, diplomacy: 25, territory: 0, economy: -15, narrativeResult: "העולם מריע לך דיפלומטית, אך הנטל הכלכלי והחברתי כבד מנשוא." } },
          { id: "4b", label: "מחנות זמניים", description: "הקם מחנות סגורים סמוך לגבול ודרוש מימון בינלאומי.", impact: { military: 5, diplomacy: 5, territory: 0, economy: -5, narrativeResult: "המשבר נשלט במידה מסוימת, אך התנאים במחנות מעוררים ביקורת." } },
          { id: "4c", label: "סגירת גבולות", description: "השתמש בצבא כדי למנוע כניסה ולבצר את הגדרות.", impact: { military: 15, diplomacy: -20, territory: 5, economy: 5, narrativeResult: "הביטחון הפנימי נשמר, אך המוניטין הבינלאומי של המדינה נפגע קשות." } }
        ]
      },
      {
        title: "הברית הגרעינית",
        description: "מעצמה עולמית מציעה לך סיוע בהקמת כור גרעיני למטרות שלום תמורת ברית צבאית.",
        choices: [
          { id: "5a", label: "קבלת ההצעה", description: "חתום על הברית והתחל בבנייה.", impact: { military: 25, diplomacy: -10, territory: 0, economy: 15, narrativeResult: "הפכת לכוח צבאי ואנרגטי משמעותי, אך שכניך מגיבים במרוץ חימוש." } },
          { id: "5b", label: "סירוב ונייטרליות", description: "דחה את ההצעה כדי לשמור על מעמד נייטרלי באזור.", impact: { military: -10, diplomacy: 15, territory: 0, economy: -5, narrativeResult: "היציבות נשמרה, אך המדינה נותרה מאחור מבחינה טכנולוגית וצבאית." } },
          { id: "5c", label: "פיתוח עצמאי", description: "נסה לפתח יכולות גרעיניות לבד ללא תלות במעצמות.", impact: { military: 10, diplomacy: -15, territory: 0, economy: -25, narrativeResult: "הפרויקט יקר להחריד וגרר סנקציות, אך השגתם עצמאות אסטרטגית." } }
        ]
      }
    ]
  },
  en: {
    title: "Middle East Hegemony",
    startTitle: "The Nation's Fate",
    startDesc: "Lead your nation in the modern Middle East. Navigate through wars, treaties, and crises.",
    newGame: "Start New Game",
    loadGame: "Load Saved Game",
    save: "Save",
    archive: "Archive",
    turn: "Turn",
    victory: "Historic Victory!",
    gameOver: "Game Over",
    restart: "Try Again",
    share: "Share",
    feedback: "Send Feedback",
    stats: {
      military: "Military",
      diplomacy: "Diplomacy",
      territory: "Territory",
      economy: "Economy"
    },
    ui: {
      intelReport: "Intel Report",
      results: "Results",
      nextTurn: "Next Turn",
      saving: "Saved!",
      loading: "Loading...",
      error: "Error loading."
    },
    scenarios: [
      {
        title: "Border Water Dispute",
        description: "A neighboring country has begun building a massive dam upstream, threatening your agricultural resources.",
        choices: [
          { id: "1a", label: "Military Response", description: "Deploy forces to the border and threaten airstrikes.", impact: { military: 10, diplomacy: -15, territory: 0, economy: -5, narrativeResult: "Construction stopped under pressure, but diplomatic relations hit an all-time low." } },
          { id: "1b", label: "Negotiate", description: "Offer an energy cooperation deal for guaranteed water flow.", impact: { military: -5, diplomacy: 15, territory: 0, economy: 10, narrativeResult: "A historic deal was reached. Water flow is secured and the economy received a boost." } },
          { id: "1c", label: "UN Appeal", description: "Seek international intervention and sanctions.", impact: { military: 0, diplomacy: 5, territory: -5, economy: -5, narrativeResult: "The UN process is slow. Construction continues and border farms suffer." } }
        ]
      },
      {
        title: "Silicon Desert Revolution",
        description: "A multinational tech giant wants to establish a massive development hub in your desert region.",
        choices: [
          { id: "2a", label: "Government Subsidy", description: "Offer tax breaks and free land to attract the company.", impact: { military: 0, diplomacy: 5, territory: 0, economy: 20, narrativeResult: "The hub became a major growth engine, though the deficit grew." } },
          { id: "2b", label: "Local Production", description: "Condition approval on 80% local hiring and knowledge transfer.", impact: { military: 5, diplomacy: 0, territory: 0, economy: 10, narrativeResult: "The company reluctantly agreed. Local human capital grew, but investment was smaller than hoped." } },
          { id: "2c", label: "National Project", description: "Reject the offer and launch a competing national tech project.", impact: { military: 15, diplomacy: -5, territory: 0, economy: -10, narrativeResult: "The project drained the budget but provided critical military tech independence." } }
        ]
      },
      {
        title: "Offshore Gas Discovery",
        description: "Vast gas reserves found in economic waters, but the maritime border is disputed.",
        choices: [
          { id: "3a", label: "Unilateral Drilling", description: "Send drilling ships with naval escorts.", impact: { military: 10, diplomacy: -20, territory: 15, economy: 20, narrativeResult: "Production began and you became an energy power, but war risk surged." } },
          { id: "3b", label: "Profit Sharing", description: "Offer to split profits 50/50 in exchange for border recognition.", impact: { military: -5, diplomacy: 20, territory: 5, economy: 10, narrativeResult: "A pioneering deal was reached. Maritime peace is secured." } },
          { id: "3c", label: "Freeze Project", description: "Wait for international arbitration.", impact: { military: 0, diplomacy: 10, territory: 0, economy: -10, narrativeResult: "Legal process dragged for years. The country remains dependent on expensive imports." } }
        ]
      },
      {
        title: "Regional Migration Wave",
        description: "Civil war in a nearby state sends hundreds of thousands of refugees toward your borders.",
        choices: [
          { id: "4a", label: "Open Borders", description: "Accept refugees and provide full humanitarian aid.", impact: { military: -10, diplomacy: 25, territory: 0, economy: -15, narrativeResult: "Diplomatic praise is high, but the socio-economic burden is massive." } },
          { id: "4b", label: "Temporary Camps", description: "Set up border camps and demand international funding.", impact: { military: 5, diplomacy: 5, territory: 0, economy: -5, narrativeResult: "Crisis managed to an extent, but camp conditions draw criticism." } },
          { id: "4c", label: "Close Borders", description: "Use military to prevent entry and fortify fences.", impact: { military: 15, diplomacy: -20, territory: 5, economy: 5, narrativeResult: "Internal security maintained, but global reputation severely damaged." } }
        ]
      },
      {
        title: "The Nuclear Pact",
        description: "A global power offers aid for a civilian nuclear plant in exchange for a military alliance.",
        choices: [
          { id: "5a", label: "Accept Deal", description: "Sign the pact and begin construction.", impact: { military: 25, diplomacy: -10, territory: 0, economy: 15, narrativeResult: "You became a military and energy force, but neighbors respond with an arms race." } },
          { id: "5b", label: "Reject & Neutrality", description: "Decline to stay neutral in regional conflicts.", impact: { military: -10, diplomacy: 15, territory: 0, economy: -5, narrativeResult: "Stability maintained, but the country fell behind technologically." } },
          { id: "5c", label: "Independent Development", description: "Attempt to develop nuclear capabilities independently.", impact: { military: 10, diplomacy: -15, territory: 0, economy: -25, narrativeResult: "Extremely expensive project led to sanctions, but achieved strategic independence." } }
        ]
      }
    ]
  },
  ru: {
    title: "Гегемония на Ближнем Востоке",
    startTitle: "Судьба нации",
    startDesc: "Возглавьте свою страну на современном Ближнем Востоке. Пройдите через войны и кризисы.",
    newGame: "Новая игра",
    loadGame: "Загрузить",
    save: "Сохранить",
    archive: "Архив",
    turn: "Ход",
    victory: "Победа!",
    gameOver: "Конец игры",
    restart: "Заново",
    share: "Поделиться",
    feedback: "Обратная связь",
    stats: {
      military: "Армия",
      diplomacy: "Дипломатия",
      territory: "Территория",
      economy: "Экономика"
    },
    ui: {
      intelReport: "Разведка",
      results: "Итоги",
      nextTurn: "Далее",
      saving: "Сохранено!",
      loading: "Загрузка...",
      error: "Ошибка."
    },
    scenarios: [
      {
        title: "Водный спор на границе",
        description: "Соседняя страна начала строительство дамбы, угрожая вашему сельскому хозяйству.",
        choices: [
          { id: "1a", label: "Военный ответ", description: "Разверните войска и пригрозите ударами.", impact: { military: 10, diplomacy: -15, territory: 0, economy: -5, narrativeResult: "Стройка остановлена, но отношения испорчены." } },
          { id: "1b", label: "Переговоры", description: "Предложите сотрудничество в энергетике.", impact: { military: -5, diplomacy: 15, territory: 0, economy: 10, narrativeResult: "Достигнуто историческое соглашение." } },
          { id: "1c", label: "Обращение в ООН", description: "Запросите санкции против соседа.", impact: { military: 0, diplomacy: 5, territory: -5, economy: -5, narrativeResult: "Процесс в ООН затянулся, фермеры страдают." } }
        ]
      },
      {
        title: "Технологическая революция",
        description: "Гигант индустрии хочет построить хаб в пустыне.",
        choices: [
          { id: "2a", label: "Субсидии", description: "Налоговые льготы для привлечения капитала.", impact: { military: 0, diplomacy: 5, territory: 0, economy: 20, narrativeResult: "Экономика выросла, но долг увеличился." } },
          { id: "2b", label: "Местные кадры", description: "Требование нанимать 80% местных.", impact: { military: 5, diplomacy: 0, territory: 0, economy: 10, narrativeResult: "Человеческий капитал вырос." } },
          { id: "2c", label: "Свой проект", description: "Развивать технологии самостоятельно.", impact: { military: 15, diplomacy: -5, territory: 0, economy: -10, narrativeResult: "Военная независимость достигнута." } }
        ]
      }
    ]
  },
  zh: {
    title: "中东霸权",
    startTitle: "国家命运",
    startDesc: "领导中东国家。应对战争、条约和危机。",
    newGame: "新游戏",
    loadGame: "加载游戏",
    save: "保存",
    archive: "档案",
    turn: "回合",
    victory: "历史性胜利！",
    gameOver: "游戏结束",
    restart: "重新开始",
    share: "分享",
    feedback: "发送反馈",
    stats: {
      military: "军事",
      diplomacy: "外交",
      territory: "领土",
      economy: "经济"
    },
    ui: {
      intelReport: "情报",
      results: "结果",
      nextTurn: "下一回合",
      saving: "已保存！",
      loading: "加载中...",
      error: "错误。"
    },
    scenarios: [
      {
        title: "边界水资源纠纷",
        description: "邻国开始在上游建造大型水坝，威胁到你的农业资源。",
        choices: [
          { id: "1a", label: "军事响应", description: "在边境部署军队并威胁空袭。", impact: { military: 10, diplomacy: -15, territory: 0, economy: -5, narrativeResult: "建设因压力停止，但外交关系降至冰点。" } },
          { id: "1b", label: "谈判", description: "提议能源合作协议以换取水量保障。", impact: { military: -5, diplomacy: 15, territory: 0, economy: 10, narrativeResult: "达成历史性协议，水流得到保障。" } },
          { id: "1c", label: "联合国申诉", description: "寻求国际干预和制裁。", impact: { military: 0, diplomacy: 5, territory: -5, economy: -5, narrativeResult: "联合国程序缓慢。建设继续，边境农场受损。" } }
        ]
      }
    ]
  },
  hi: {
    title: "मध्य पूर्व आधिपत्य",
    startTitle: "राष्ट्र का भाग्य",
    startDesc: "मध्य पूर्व में राष्ट्र का नेतृत्व करें। युद्धों और संकटों का सामना करें।",
    newGame: "नया खेल",
    loadGame: "लोड करें",
    save: "सहेजें",
    archive: "संग्रह",
    turn: "बारी",
    victory: "ऐतिहासिक जीत!",
    gameOver: "खेल खत्म",
    restart: "फिर से",
    share: "साझा करें",
    feedback: "फीडबैक भेजें",
    stats: {
      military: "सैन्य",
      diplomacy: "कूटनीति",
      territory: "क्षेत्र",
      economy: "अर्थव्यवस्था"
    },
    ui: {
      intelReport: "रिपोर्ट",
      results: "परिणाम",
      nextTurn: "अगली बारी",
      saving: "सहेजा गया!",
      loading: "लोड हो रहा है...",
      error: "त्रुटि।"
    },
    scenarios: [
      {
        title: "सीमा जल विवाद",
        description: "पड़ोसी देश ने नदी पर एक बड़ा बांध बनाना शुरू कर दिया है, जिससे आपके कृषि संसाधन खतरे में हैं।",
        choices: [
          { id: "1a", label: "सैन्य प्रतिक्रिया", description: "सीमा पर सेना तैनात करें और हवाई हमले की धमकी दें।", impact: { military: 10, diplomacy: -15, territory: 0, economy: -5, narrativeResult: "दबाव में निर्माण रुक गया, लेकिन कूटनीतिक संबंध खराब हो गए।" } },
          { id: "1b", label: "बातचीत", description: "जल प्रवाह की गारंटी के लिए ऊर्जा सहयोग का प्रस्ताव दें।", impact: { military: -5, diplomacy: 15, territory: 0, economy: 10, narrativeResult: "एक ऐतिहासिक समझौता हुआ।" } },
          { id: "1c", label: "संयुक्त राष्ट्र में अपील", description: "अंतरराष्ट्रीय हस्तक्षेप की मांग करें।", impact: { military: 0, diplomacy: 5, territory: -5, economy: -5, narrativeResult: "प्रक्रिया धीमी है, निर्माण जारी है।" } }
        ]
      }
    ]
  },
  de: {
    title: "Hegemonie",
    startTitle: "Das Schicksal",
    startDesc: "Führen Sie Ihre Nation im Nahen Osten.",
    newGame: "Neues Spiel",
    loadGame: "Laden",
    save: "Speichern",
    archive: "Archiv",
    turn: "Runde",
    victory: "Sieg!",
    gameOver: "Spiel vorbei",
    restart: "Neustart",
    share: "Teilen",
    feedback: "Feedback",
    stats: {
      military: "Militär",
      diplomacy: "Diplomatie",
      territory: "Territorium",
      economy: "Wirtschaft"
    },
    ui: {
      intelReport: "Intel",
      results: "Ergebnisse",
      nextTurn: "Nächste Runde",
      saving: "Gespeichert!",
      loading: "Laden...",
      error: "Fehler."
    },
    scenarios: [
      {
        title: "Grenz-Wasserstreit",
        description: "Ein Nachbarland baut einen Staudamm, der Ihre Landwirtschaft bedroht.",
        choices: [
          { id: "1a", label: "Militär", description: "Truppen entsenden und drohen.", impact: { military: 10, diplomacy: -15, territory: 0, economy: -5, narrativeResult: "Bau gestoppt, aber diplomatische Krise." } },
          { id: "1b", label: "Verhandeln", description: "Energiekooperation gegen Wasser.", impact: { military: -5, diplomacy: 15, territory: 0, economy: 10, narrativeResult: "Historisches Abkommen erreicht." } },
          { id: "1c", label: "UN-Appell", description: "Internationale Hilfe suchen.", impact: { military: 0, diplomacy: 5, territory: -5, economy: -5, narrativeResult: "Prozess zu langsam, Ernte leidet." } }
        ]
      }
    ]
  },
  es: {
    title: "Hegemonía",
    startTitle: "El destino",
    startDesc: "Lidera tu nación en Medio Oriente.",
    newGame: "Nuevo juego",
    loadGame: "Cargar",
    save: "Guardar",
    archive: "Archivo",
    turn: "Turno",
    victory: "¡Victoria!",
    gameOver: "Fin",
    restart: "Reiniciar",
    share: "Compartir",
    feedback: "Feedback",
    stats: {
      military: "Militar",
      diplomacy: "Diplomacia",
      territory: "Territorio",
      economy: "Economía"
    },
    ui: {
      intelReport: "Intel",
      results: "Resultados",
      nextTurn: "Siguiente",
      saving: "¡Guardado!",
      loading: "Cargando...",
      error: "Error."
    },
    scenarios: [
      {
        title: "Conflicto por el agua",
        description: "Un país vecino construye una presa que amenaza tus recursos agrícolas.",
        choices: [
          { id: "1a", label: "Militar", description: "Desplegar tropas y amenazar con ataques.", impact: { military: 10, diplomacy: -15, territory: 0, economy: -5, narrativeResult: "La presión detuvo la obra, pero las relaciones se hundieron." } },
          { id: "1b", label: "Negociar", description: "Ofrecer cooperación energética por agua.", impact: { military: -5, diplomacy: 15, territory: 0, economy: 10, narrativeResult: "Se alcanzó un acuerdo histórico." } },
          { id: "1c", label: "Apelar a la ONU", description: "Buscar sanciones internacionales.", impact: { military: 0, diplomacy: 5, territory: -5, economy: -5, narrativeResult: "Proceso lento, el campo sufre." } }
        ]
      }
    ]
  }
};


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
    readText: "הקרא טקסט",
    achievements: "הישגים",
    unlocked: "נפתח הישג!",
    stats: {
      military: "עוצמה צבאית",
      diplomacy: "דיפלומטיה",
      territory: "טריטוריה",
      economy: "כלכלה"
    },
    achievementList: {
      mil_master: { title: "מעצמה צבאית", desc: "הגע ל-80 עוצמה צבאית" },
      dip_master: { title: "אדריכל השלום", desc: "הגע ל-80 דיפלומטיה" },
      eco_master: { title: "נמר כלכלי", desc: "הגע ל-80 כלכלה" },
      survivor: { title: "שורד אזורי", desc: "הגעת לתור 10" },
      hegemon: { title: "הגמון אמיתי", desc: "ניצחת במשחק" }
    },
    ui: {
      intelReport: "דו\"ח מודיעין",
      results: "תוצאות המבצע",
      nextTurn: "המשך לתור הבא",
      saving: "נשמר!",
      loading: "טוען...",
      exporting: "מייצא...",
      error: "אירעה שגיאה.",
      search: "חפש אירוע...",
      filterTurn: "סינון לפי תור",
      filterOutcome: "סינון לפי תוצאה",
      outcomeAll: "הכל",
      outcomePeace: "שלום ודיפלומטיה",
      outcomeWar: "מלחמה ועימות",
      readStart: "הקרא תיאור משחק"
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
      },
      {
        title: "מתקפת סייבר על הבורסה",
        description: "קבוצת האקרים לא מזוהה שיתקה את המערכות הפיננסיות של המדינה. יש חשד למעורבות של מעצמה אזורית.",
        choices: [
          { id: "6a", label: "מתקפת נגד", description: "הורה ליחידת הסייבר לתקוף את תשתיות החשמל של המדינה החשודה.", impact: { military: 15, diplomacy: -15, territory: 0, economy: -10, narrativeResult: "המתקפה הצליחה, אך המתיחות האזורית עלתה מדרגה וגררה גינויים." } },
          { id: "6b", label: "הגנה ושיקום", description: "השקע מיליארדים במיגון סייבר וגיוס מומחים בינלאומיים.", impact: { military: 0, diplomacy: 10, territory: 0, economy: -15, narrativeResult: "הכלכלה התאוששה לאט, אך המערכות שלך כעת הן מהחזקות בעולם." } },
          { id: "6c", label: "חשיפה פומבית", description: "פרסם את ההוכחות למעורבות המעצמה ודרוש דיון במועצת הביטחון.", impact: { military: -5, diplomacy: 20, territory: 0, economy: -5, narrativeResult: "הלחץ הבינלאומי עבד. הסנקציות על היריבה החלישו אותה משמעותית." } }
        ]
      },
      {
        title: "פסגת שלום היסטורית",
        description: "מנהיג של מדינת אויב מציע להיפגש בטריטוריה נייטרלית כדי לסיים סכסוך בן עשורים.",
        choices: [
          { id: "7a", label: "שלום תמורת שטחים", description: "הסכם על נסיגה מאזורי מפתח תמורת הכרה דיפלומטית מלאה.", impact: { military: -15, diplomacy: 30, territory: -15, economy: 15, narrativeResult: "השלום הושג. הכלכלה פורחת בזכות מסחר, אך הצבא מודאג מהגבולות החדשים." } },
          { id: "7b", label: "הסכם ביטחוני בלבד", description: "חתום על חוזה אי-התקפה ללא ויתורים טריטוריאליים.", impact: { military: 5, diplomacy: 15, territory: 0, economy: 5, narrativeResult: "המצב התייצב. האמון נשאר נמוך אך המלחמה נמנעה." } },
          { id: "7c", label: "סירוב למפגש", description: "דרוש תנאים מוקדמים נוקשים לפני כל הידברות.", impact: { military: 10, diplomacy: -10, territory: 0, economy: -5, narrativeResult: "ההזדמנות הוחמצה. שני הצדדים ממשיכים להתבצר בעמדותיהם." } }
        ]
      },
      {
        title: "שינויי אקלים ורעב",
        description: "בצורת ממושכת הובילה למחסור חמור במזון. האוכלוסייה מתחילה להתמרמר ברחובות.",
        choices: [
          { id: "8a", label: "יבוא מזון מסיבי", description: "השתמש ברזרבות המדינה כדי לקנות חיטה בשוק העולמי.", impact: { military: -5, diplomacy: 5, territory: 0, economy: -25, narrativeResult: "הרעב נעצר, אך קופת המדינה התרוקנה לחלוטין." } },
          { id: "8b", label: "דיכוי המהומות", description: "השתמש בכוחות הביטחון כדי להשליט סדר בערים.", impact: { military: 10, diplomacy: -20, territory: 0, economy: -5, narrativeResult: "הסדר נשמר בכוח, אך הלגיטימציה של המשטר נפגעה קשות." } },
          { id: "8c", label: "רפורמה חקלאית", description: "השקע בממתקני התפלה וחקלאות מדברית מתקדמת.", impact: { military: 0, diplomacy: 0, territory: 5, economy: 15, narrativeResult: "הפתרון לקח זמן אך הפכתם לעצמאיים תזונתית ואף מייצאים ידע." } }
        ]
      },
      {
        title: "מרוץ החלל האזורי",
        description: "המדינה השכנה שיגרה לוויין ריגול. המטה הכללי לוחץ עליך להגיב בתכנית חלל משלך.",
        choices: [
          { id: "9a", label: "לוויין צבאי", description: "פתח לוויין עם יכולות תקיפה מהחלל.", impact: { military: 25, diplomacy: -15, territory: 0, economy: -20, narrativeResult: "הרתעה צבאית חסרת תקדים הושגה, אך העולם חושש ממך." } },
          { id: "9b", label: "לוויין תקשורת אזרחי", description: "פתח תשתית אינטרנט לווייני שתשרת את כל האזור.", impact: { military: 5, diplomacy: 20, territory: 0, economy: 15, narrativeResult: "הפכת למרכז טכנולוגי אזורי. מדינות רבות תלויות כעת בתשתיות שלך." } },
          { id: "9c", label: "חבלה בתכנית היריב", description: "השתמש במודיעין וסייבר כדי לשבש את השיגור הבא שלהם.", impact: { military: 10, diplomacy: -25, territory: 0, economy: -5, narrativeResult: "התכנית שלהם נכשלה ב'תאונה', אך החשד כלפיך כבד." } }
        ]
      },
      {
        title: "מגפה גלובלית",
        description: "וירוס קטלני מתפשט במהירות. עליך להחליט על מדיניות הסגרים והחיסונים.",
        choices: [
          { id: "10a", label: "סגר הרמטי", description: "סגור את הגבולות והשבת את הכלכלה לחלוטין.", impact: { military: -10, diplomacy: -10, territory: 0, economy: -30, narrativeResult: "מספר המתים היה נמוך, אך הכלכלה תזדקק לשנים כדי להשתקם." } },
          { id: "10b", label: "חסינות עדר", description: "השאר את המשק פתוח וסמוך על מערכת הבריאות.", impact: { military: 5, diplomacy: 0, territory: 0, economy: 10, narrativeResult: "הכלכלה שגשגה יחסית, אך המחיר בחיי אדם היה כבד." } },
          { id: "10c", label: "דיפלומטיית חיסונים", description: "פתח חיסון מקומי וחלק אותו למדינות האזור.", impact: { military: 0, diplomacy: 40, territory: 0, economy: 15, narrativeResult: "הפכת ל'מושיע האזור'. אויבים לשעבר הפכו לבעלי ברית." } }
        ]
      },
      {
        title: "פסטיבל תרבות אזורי",
        description: "יוזמה להקמת פסטיבל מוזיקה ותרבות בין-ערבי בבירתך מעוררת מחלוקת.",
        choices: [
          { id: "11a", label: "אירוח מלא", description: "השקע משאבים בביטחון ואירוח פאר.", impact: { military: -5, diplomacy: 25, territory: 0, economy: 10, narrativeResult: "העולם ראה צד אחר של האזור. תיירות החלה לזרום." } },
          { id: "11b", label: "שיתוף מסחרי", description: "אפשר לחברות פרטיות לנהל את האירוע תחת חסותך.", impact: { military: 0, diplomacy: 10, territory: 0, economy: 15, narrativeResult: "הרווח הכלכלי היה נאה ללא סיכון תקציבי גבוה." } },
          { id: "11c", label: "ביטול האירוע", description: "מנע את האירוע מחשש לערעור היציבות הדתית/חברתית.", impact: { military: 5, diplomacy: -10, territory: 0, economy: -5, narrativeResult: "השמרנים מרוצים, אך הצעירים והקהילה הבינלאומית מאוכזבים." } }
        ]
      },
      {
        title: "משבר הנפט העולמי",
        description: "המחירים צונחים בגלל עודף היצע. ההכנסות של המדינה בסכנה.",
        choices: [
          { id: "12a", label: "קיצוץ בייצור", description: "לחץ על שאר המפיקות לקצץ בייצור כדי להעלות מחירים.", impact: { military: 0, diplomacy: 10, territory: 0, economy: 10, narrativeResult: "המהלך הצליח לייצב את המחירים, אך היחסים עם הלקוחות נפגעו." } },
          { id: "12b", label: "גיוון כלכלי מהיר", description: "הזרם את שארית הרזרבות לתעשיית ההייטק.", impact: { military: -5, diplomacy: 5, territory: 0, economy: 20, narrativeResult: "הכלכלה החלה להשתחרר מהתלות בנפט. צמיחה חדשה באופק." } },
          { id: "12c", label: "הגדלת הייצור", description: "נסה לכבוש נתח שוק גדול יותר במחירים נמוכים.", impact: { military: 5, diplomacy: -5, territory: 0, economy: -15, narrativeResult: "מלחמת מחירים פרצה. ההכנסות קרסו והמתח עם השכנות עלה." } }
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
    readText: "Read Text",
    achievements: "Achievements",
    unlocked: "Achievement Unlocked!",
    stats: {
      military: "Military",
      diplomacy: "Diplomacy",
      territory: "Territory",
      economy: "Economy"
    },
    achievementList: {
      mil_master: { title: "Military Superpower", desc: "Reach 80 Military Power" },
      dip_master: { title: "Peace Architect", desc: "Reach 80 Diplomacy" },
      eco_master: { title: "Economic Tiger", desc: "Reach 80 Economy" },
      survivor: { title: "Regional Survivor", desc: "Reach Turn 10" },
      hegemon: { title: "True Hegemon", desc: "Win the Game" }
    },
    ui: {
      intelReport: "Intel Report",
      results: "Results",
      nextTurn: "Next Turn",
      saving: "Saved!",
      loading: "Loading...",
      exporting: "Exporting...",
      error: "Error loading.",
      search: "Search event...",
      filterTurn: "Filter by Turn",
      filterOutcome: "Filter by Outcome",
      outcomeAll: "All",
      outcomePeace: "Peace & Diplomacy",
      outcomeWar: "War & Conflict",
      readStart: "Read Game Description"
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
      },
      {
        title: "Stock Exchange Cyber Attack",
        description: "An unknown hacking group has paralyzed the nation's financial systems. Regional power involvement is suspected.",
        choices: [
          { id: "6a", label: "Counter-Strike", description: "Order the cyber unit to attack the suspected nation's power grid.", impact: { military: 15, diplomacy: -15, territory: 0, economy: -10, narrativeResult: "Attack succeeded, but regional tensions rose significantly." } },
          { id: "6b", label: "Defense & Recovery", description: "Invest billions in cyber defense and global experts.", impact: { military: 0, diplomacy: 10, territory: 0, economy: -15, narrativeResult: "Economy recovered slowly, but your systems are now among the strongest." } },
          { id: "6c", label: "Public Exposure", description: "Publish evidence of involvement and demand UN Security Council action.", impact: { military: -5, diplomacy: 20, territory: 0, economy: -5, narrativeResult: "International pressure worked; sanctions weakened the rival." } }
        ]
      },
      {
        title: "Historic Peace Summit",
        description: "An enemy leader offers to meet in neutral territory to end decades of conflict.",
        choices: [
          { id: "7a", label: "Land for Peace", description: "Agree to withdraw from key areas for full diplomatic recognition.", impact: { military: -15, diplomacy: 30, territory: -15, economy: 15, narrativeResult: "Peace achieved. Economy booms from trade, but military remains wary." } },
          { id: "7b", label: "Security Deal Only", description: "Sign a non-aggression pact without territorial concessions.", impact: { military: 5, diplomacy: 15, territory: 0, economy: 5, narrativeResult: "Situation stabilized. Trust is low but war was avoided." } },
          { id: "7c", label: "Refuse Meeting", description: "Demand strict pre-conditions before any dialogue.", impact: { military: 10, diplomacy: -10, territory: 0, economy: -5, narrativeResult: "Opportunity missed. Both sides remain entrenched." } }
        ]
      },
      {
        title: "Climate Change & Famine",
        description: "Prolonged drought led to severe food shortages. The population is taking to the streets.",
        choices: [
          { id: "8a", label: "Massive Imports", description: "Use state reserves to buy grain on the global market.", impact: { military: -5, diplomacy: 5, territory: 0, economy: -25, narrativeResult: "Famine averted, but state coffers are empty." } },
          { id: "8b", label: "Crush Riots", description: "Use security forces to restore order in the cities.", impact: { military: 10, diplomacy: -20, territory: 0, economy: -5, narrativeResult: "Order restored by force, but regime legitimacy is damaged." } },
          { id: "8c", label: "Agri-Reform", description: "Invest in desalination and advanced desert farming.", impact: { military: 0, diplomacy: 0, territory: 5, economy: 15, narrativeResult: "Solution took time, but you achieved food independence." } }
        ]
      },
      {
        title: "Regional Space Race",
        description: "A neighboring nation launched a spy satellite. The General Staff pressures you to respond.",
        choices: [
          { id: "9a", label: "Military Satellite", description: "Develop a satellite with space-strike capabilities.", impact: { military: 25, diplomacy: -15, territory: 0, economy: -20, narrativeResult: "Unprecedented military deterrence achieved." } },
          { id: "9b", label: "Civilian Comms", description: "Develop satellite internet infrastructure for the whole region.", impact: { military: 5, diplomacy: 20, territory: 0, economy: 15, narrativeResult: "Became a regional tech hub; many nations now depend on you." } },
          { id: "9c", label: "Sabotage", description: "Use intelligence and cyber to disrupt their next launch.", impact: { military: 10, diplomacy: -25, territory: 0, economy: -5, narrativeResult: "Their program failed in an 'accident', but suspicions are high." } }
        ]
      },
      {
        title: "Global Pandemic",
        description: "A deadly virus is spreading rapidly. Decide on lockdown and vaccine policies.",
        choices: [
          { id: "10a", label: "Hard Lockdown", description: "Close borders and shutdown the economy entirely.", impact: { military: -10, diplomacy: -10, territory: 0, economy: -30, narrativeResult: "Death toll was low, but economy will take years to recover." } },
          { id: "10b", label: "Herd Immunity", description: "Keep the economy open and rely on the health system.", impact: { military: 5, diplomacy: 0, territory: 0, economy: 10, narrativeResult: "Economy thrived relatively, but the human cost was heavy." } },
          { id: "10c", label: "Vaccine Diplomacy", description: "Develop local vaccine and distribute it to neighbors.", impact: { military: 0, diplomacy: 40, territory: 0, economy: 15, narrativeResult: "Became the 'savior of the region'. Former enemies became allies." } }
        ]
      },
      {
        title: "Regional Cultural Festival",
        description: "An initiative to establish a major cross-border arts festival in your capital is sparking debate.",
        choices: [
          { id: "11a", label: "Full Hosting", description: "Invest heavily in security and lavish hosting.", impact: { military: -5, diplomacy: 25, territory: 0, economy: 10, narrativeResult: "The world saw a different side of the region. Tourism began to flow." } },
          { id: "11b", label: "Commercial Partner", description: "Allow private firms to manage under your patronage.", impact: { military: 0, diplomacy: 10, territory: 0, economy: 15, narrativeResult: "Economic profit was solid with low budget risk." } },
          { id: "11c", label: "Cancel Event", description: "Block it to avoid religious or social stability concerns.", impact: { military: 5, diplomacy: -10, territory: 0, economy: -5, narrativeResult: "Conservatives are pleased, but youth and the global community are disappointed." } }
        ]
      },
      {
        title: "Global Oil Crisis",
        description: "Prices are plummeting due to oversupply. State revenues are at risk.",
        choices: [
          { id: "12a", label: "Production Cuts", description: "Pressure other producers to cut supply and raise prices.", impact: { military: 0, diplomacy: 10, territory: 0, economy: 10, narrativeResult: "Successfully stabilized prices, though client relations were strained." } },
          { id: "12b", label: "Rapid Diversification", description: "Pour remaining reserves into the tech industry.", impact: { military: -5, diplomacy: 5, territory: 0, economy: 20, narrativeResult: "The economy began its release from oil dependency. New growth on the horizon." } },
          { id: "12c", label: "Increase Production", description: "Try to capture more market share at lower prices.", impact: { military: 5, diplomacy: -5, territory: 0, economy: -15, narrativeResult: "Price war erupted. Revenues crashed and tensions with neighbors rose." } }
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
    readText: "Прочитать",
    achievements: "Достижения",
    unlocked: "Достижение открыто!",
    stats: {
      military: "Армия",
      diplomacy: "Дипломатия",
      territory: "Территория",
      economy: "Экономика"
    },
    achievementList: {
      mil_master: { title: "Военная сверхдержава", desc: "Достигните 80 военной мощи" },
      dip_master: { title: "Архитектор мира", desc: "Достигните 80 дипломатии" },
      eco_master: { title: "Экономический тигр", desc: "Достигните 80 экономики" },
      survivor: { title: "Выживший", desc: "Достигните 10 хода" },
      hegemon: { title: "Настоящий гегемон", desc: "Выиграйте игру" }
    },
    ui: {
      intelReport: "Разведка",
      results: "Итоги",
      nextTurn: "Далее",
      saving: "Сохранено!",
      loading: "Загрузка...",
      exporting: "Экспорт...",
      error: "Ошибка.",
      search: "Поиск события...",
      filterTurn: "По ходу",
      filterOutcome: "По итогу",
      outcomeAll: "Все",
      outcomePeace: "Мир",
      outcomeWar: "Конфликт",
      readStart: "Прочитать описание"
    },
    scenarios: []
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
    readText: "阅读文字",
    achievements: "成就",
    unlocked: "成就达成！",
    stats: {
      military: "军事",
      diplomacy: "外交",
      territory: "领土",
      economy: "经济"
    },
    achievementList: {
      mil_master: { title: "军事强权", desc: "军事力量达到80" },
      dip_master: { title: "和平架构师", desc: "外交点数达到80" },
      eco_master: { title: "经济之虎", desc: "经济实力达到80" },
      survivor: { title: "区域生存者", desc: "到达第10回合" },
      hegemon: { title: "真正的霸权", desc: "赢得游戏" }
    },
    ui: {
      intelReport: "情报",
      results: "结果",
      nextTurn: "下一回合",
      saving: "已保存！",
      loading: "加载中...",
      exporting: "导出中...",
      error: "错误。",
      search: "搜索事件...",
      filterTurn: "按回合筛选",
      filterOutcome: "按结果筛选",
      outcomeAll: "全部",
      outcomePeace: "和平外交",
      outcomeWar: "战争冲突",
      readStart: "阅读游戏描述"
    },
    scenarios: []
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
    readText: "पाठ पढ़ें",
    achievements: "उपलब्धियां",
    unlocked: "उपलब्धि हासिल!",
    stats: {
      military: "सैन्य",
      diplomacy: "कूटनीति",
      territory: "क्षेत्र",
      economy: "अर्थव्यवस्था"
    },
    achievementList: {
      mil_master: { title: "सैन्य महाशक्ति", desc: "80 सैन्य शक्ति तक पहुँचें" },
      dip_master: { title: "शांति वास्तुकार", desc: "80 कूटनीति तक पहुँचें" },
      eco_master: { title: "आर्थिक टाइगर", desc: "80 अर्थव्यवस्था तक पहुँचें" },
      survivor: { title: "क्षेत्रीय उत्तरजीवी", desc: "10वीं बारी तक पहुँचें" },
      hegemon: { title: "सच्चा आधिपत्य", desc: "खेल जीतें" }
    },
    ui: {
      intelReport: "रिपोर्ट",
      results: "परिणाम",
      nextTurn: "अगली बारी",
      saving: "सहेजा गया!",
      loading: "लोड हो रहा है...",
      exporting: "निर्यात हो रहा है...",
      error: "त्रुटि।",
      search: "खोजें...",
      filterTurn: "बारी से फिल्टर",
      filterOutcome: "परिणाम से फिल्टर",
      outcomeAll: "सभी",
      outcomePeace: "शांति",
      outcomeWar: "युद्ध",
      readStart: "विवרון पढ़ें"
    },
    scenarios: []
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
    readText: "Text vorlesen",
    achievements: "Erfolge",
    unlocked: "Erfolg freigeschaltet!",
    stats: {
      military: "Militär",
      diplomacy: "Diplomatie",
      territory: "Territorium",
      economy: "Wirtschaft"
    },
    achievementList: {
      mil_master: { title: "Militärische Supermacht", desc: "Militärstärke 80 erreichen" },
      dip_master: { title: "Friedensarchitekt", desc: "Diplomatie 80 erreichen" },
      eco_master: { title: "Wirtschaftstiger", desc: "Wirtschaft 80 erreichen" },
      survivor: { title: "Regionaler Überlebender", desc: "Runde 10 erreichen" },
      hegemon: { title: "Wahrer Hegemon", desc: "Das Spiel gewinnen" }
    },
    ui: {
      intelReport: "Intel",
      results: "Ergebnisse",
      nextTurn: "Nächste Runde",
      saving: "Gespeichert!",
      loading: "Laden...",
      exporting: "Exportieren...",
      error: "Fehler.",
      search: "Suche...",
      filterTurn: "Nach Runde filtern",
      filterOutcome: "Nach Ergebnis filtern",
      outcomeAll: "Alle",
      outcomePeace: "Frieden",
      outcomeWar: "Krieg",
      readStart: "Beschreibung vorlesen"
    },
    scenarios: []
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
    readText: "Leer texto",
    achievements: "Logros",
    unlocked: "¡Logro desbloqueado!",
    stats: {
      military: "Militar",
      diplomacy: "Diplomacia",
      territory: "Territorio",
      economy: "Economía"
    },
    achievementList: {
      mil_master: { title: "Superpotencia militar", desc: "Alcanza 80 de poder militar" },
      dip_master: { title: "Arquitecto de paz", desc: "Alcanza 80 de diplomacia" },
      eco_master: { title: "Tigre económico", desc: "Alcanza 80 de economía" },
      survivor: { title: "Superviviente regional", desc: "Alcanza el turno 10" },
      hegemon: { title: "Verdadero Hegemón", desc: "Gana el juego" }
    },
    ui: {
      intelReport: "Intel",
      results: "Resultados",
      nextTurn: "Siguiente",
      saving: "¡Guardado!",
      loading: "Cargando...",
      exporting: "Exportando...",
      error: "Error.",
      search: "Buscar...",
      filterTurn: "Filtrar por turno",
      filterOutcome: "Filtrar por resultado",
      outcomeAll: "Todos",
      outcomePeace: "Paz",
      outcomeWar: "Conflicto",
      readStart: "Leer descripción"
    },
    scenarios: []
  }
};

Object.keys(translations).forEach(lang => {
  if (lang !== 'en' && lang !== 'he' && (!translations[lang].scenarios || translations[lang].scenarios.length === 0)) {
    translations[lang].scenarios = JSON.parse(JSON.stringify(translations['en'].scenarios));
  }
});

import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaCommentAlt,
  FaBook,
  FaChevronRight,
  FaChevronLeft,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { data } from "./data/data";

const sectionImages = {
  read: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1920",
  quotes:
    "https://images.unsplash.com/photo-1490633874781-1c63cc424610?auto=format&fit=crop&q=80&w=1920",
  contact:
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1920",
};

const backgroundImages = [
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1490633874781-1c63cc424610?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=1920",
];

const quotes = [
  {
    text: "כי תורה חדשה מאתי תצא. דהתורה היא קומה שלימה עור ובשר גידים ועצמות",
    chapter: "פרק ב׳",
  },
  {
    text: "יהי כבוד ה' לעולם כי בהירות הקב\"ה אין כל העולמות יכולים לסובלו",
    chapter: "פרק ד׳",
  },
  {
    text: 'עיר קטנה ואנשים בה מעט, עיר לשון אעירה שחר פירש הקב"ה דורש אותנו לשוב אליו',
    chapter: "פרק ה׳",
  },
  {
    text: "איתא בגמרא גדולים מעשה צדיקים יותר ממעשה שמים וארץ",
    chapter: "פרק ז׳",
  },
];

// const chapterContent = {
//   "א׳": `אר"י לא היה צריך להתחיל התורה אלא מהחודש הזה לכם כו'. ולמה גילה להם
// מעשה בראשית מפני שאמרו נעשה ונשמע ע"ד שארז"ל ישראל עלו במחשבה
// קדימת
// הרצון היה בשביל שיהיו ישראל צדיקים בכל דור ודור צמצם הש"י כביכול
// את בהירותו כדמיון אב המצמצם את שכלו ומדבר דברי קטנות בשביל בנו הקטן.
// וגם כל מדות מעשה נערות נולדים בהאב שאוהב את מעשה נערות כדי שיהיה להבן
// תענוג ומפואר אצלו ובהקב"ה העבר והעתיד הם שוים אצלו
// והיה הקב"ה מתענג
// ממעשה הצדיקים וצמצם את עצמו צמצם נקרא חכמה כי החכמה הוא מאין תמצא
// ע"ד החכמה מאין תמצא והצמצום היה בשביל ישראל וגם האהבה גרמה את
// הצמצום. וזהו אלה תולדות יצחק יעקב אברהם הוליד וכו'.`,
//   "ב׳": `כי תורה חדשה מאתי תצא. דהתורה היא קומה שלימה עור ובשר גידים ועצמות
// עור נקרא קליפין דאורייתא ובשר ע"ד מי שיגיע עצמו טועם טעם בשר וגידים ע"ד
// ויגד להם שא"ל דברים קשים כגידים ועצמות פירש עצמיותו של התורה עדיין לא
// נתגלה כי הנה כל התורה מלוקט מאנשים צדיקים מאדם ואבות ומשה שהשרה
// שכינתו על מעשיהם. וזהו תורה שלימה אבל בהירות עצמיות לא נתגלה עדיין עד
// שיבא משיח ויבינו בהירות עצמיותו וזהו תורה חדשה מאתי פירש מעצמיותי וזהו
// שניבא יחזקאל שהוא ראה את בנין העתיד ואמר התחיינה עצמות האלה פירש
// העצמיות של תורה דבמצרים היה גלות הדעת כי לא ידעו שיש אלוה בעולם ובדעת
// חדרים וכו' פירש כל המדות כי כשיודע שהוא בנו מניח אהבתו והתפארותו כי
// אעפ"י שיש תענוג מכח זה מניח את התענוג ההוא ומדבר עם הבן ונושק אותו אעפ"י
// שזה לו תענוג שאינו יפה בפני הבריות.`,
//   "ג׳": `והנה איל אחר איתא בזוהר היא האיל שנברא בין השמשות ובן היה פירש בין
// השמשות דבר הממוצע בין יום ובין לילה דבכל דבר יש ד' יסודות אש ומים רוח עפר
// והם דברים נגדיים מים מכבה אש רק צריך להיות עוד דבר א' המחברם והוא מדת
// אי"ן כי כאש מגיע יסוד המים לבטל את יסוד האש הוא נתבטל ממציאות שהגיע
// למדת אי"ן ובאהבה ויראה ג"כ כך כי בדבר גשמיות שהאוהב דבר אז אינו ירא ממנו
// בשעת מעשה וכשהוא ירא ממנו אינו אוהב אותו אמנם בהש"י יש אהבה ויראה
// כאחת כי הוא המחברם וכח הפועל בנפעל והאין נקרא חכמה.`,
//   "ד׳": `יהי כבוד ה' לעולם כי בהירות הקב"ה אין כל העולמות יכולים לסובלו. אך הוא י"ת
// עושה כמה צמצומים כדי שיכלו לסובלו. וקשה לכאורה הוא זה יותר כבוד שאין
// העולמות יכולים לסובלו אך ישמח ה' במעשיו שרוצה לשמוח במעשיו כדמיון אב
// שיש לו בן קטן והבן קטן רוצה ליקח מקל לרכוב עליו כמו על הסוס אעפ"י שדרך
// הסוס להנהיג את האדם והוא מנהיג אותו מ"מ יש לו תענוג בה ואביו עוזר לו ונותן
// לו מקל למלאות תאות הבן.`,
//   "ה׳": `עיר קטנה ואנשים בה מעט (קהלת ט,יד) עיר לשון אעירה שחר פירש הקב"ה דורש
// אותנו לשוב אליו. משל למלך שהגלה את בנו והיה אחד מהם חכם שהיה לו צער
// ובזה נתעוררו רחמיו על כל הבנים מכח החכם. כך הצדיקים מעורר רחמים של
// הקב"ה על כל ישראל וזהו אעירה שחר. ובת קול מכרזת בכל יום שובו הבנים
// שובבים וזהו הכרוז שבא לכאו"א התעוררות.`,
//   "ו׳": `ודהע"ה אמר אני מעורר השחר שחר לשון דרישה אני מעורר שהקב"ה ידרוש את
// ישראל וזהו עיר קטנה ואנשים בה מעט שאלו היו עושים מצות הי' מצוה גוררת
// מצוה והי' עובדים את הש"י ובא עליו מלך גדול כמאמר רז"ל רוח דרומית ק' מכולם
// דיש פיתוי יצה"ר ומפתה את הבריות באהבה רעה ניאוף ח"ו וכיוצא בה ויש מים
// רבים לא יוכלו לכבות את האהבה מ"ז נקרא מים רבים גלי ים יורדי הים במצלה
// שיורדין ממדריגתן כדי שיעלו נקרא ירידה וירידה זו צורך עליה עושי מלאכה במים
// רבים.`,
//   "ז׳": `איתא בגמרא גדולים מעשה צדיקים יותר ממעשה שמים וארץ וכו'. פירוש כי מעשה
// שמים וארץ הי' יש מאין וצדיקים עושים מיש אין כי מכל הדברים שעושין אפילו
// גשמיות כמו אכילה מעלין ניצוצין הקדושות מזה המאכל למעלה וכן מכל דבר
// נמצא שעושין מיש אין. וזהו פירש הפסוק שום תשים עליך מלך פירש מדת מלכות
// העליונה וע"ז ארז"ל שתהא אימתו עליך.`,
// };

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextChapter = data[currentChapter + 1];
  const prevChapter = data[currentChapter - 1];

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-95 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center gap-2">
              <FaBook size={24} className="text-gray-900" />
              <h1 className="text-xl font-heading">ומגיד דבריו ליעקב</h1>
            </div>

            <div className="hidden md:flex space-x-8">
              <a
                href="#home"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 font-body"
              >
                דף הבית
              </a>
              <a
                href="#read"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 font-body"
              >
                לקריאת החיבור
              </a>
              <a
                href="#contact"
                className="text-gray-900 hover:text-gray-600 px-3 py-2 font-body"
              >
                צור קשר
              </a>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-900 hover:text-gray-600"
              >
                {isMenuOpen ? (
                  <IoClose size={24} />
                ) : (
                  <GiHamburgerMenu size={24} />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
              <a
                href="#home"
                className="block px-3 py-2 text-gray-900 hover:bg-gray-100 font-body"
              >
                דף הבית
              </a>
              <a
                href="#read"
                className="block px-3 py-2 text-gray-900 hover:bg-gray-100 font-body"
              >
                לקריאת החיבור
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-gray-900 hover:bg-gray-100 font-body"
              >
                צור קשר
              </a>
            </div>
          </div>
        )}
      </nav>

      <div id="home" className="relative h-screen">
        <div className="absolute inset-0 overflow-hidden">
          {backgroundImages.map((img, index) => (
            <div
              key={img}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
          ))}
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-heading mb-4 tracking-wide">
            ומגיד דבריו ליעקב
          </h1>
          <h2 className="text-4xl md:text-6xl font-heading mb-8 tracking-wide">
            Palabras a Iaakov
          </h2>
          <p className="text-xl mb-2 font-body">מאת רחל קרמניצר</p>
          <p className="text-lg mb-2 font-body">
            מבוסס על תורתו של המגיד ממעזריש
          </p>
          <p className="text-lg mb-12 font-body">(ספר דיגיטלי לקריאה)</p>

          <div className="mb-12">
            <div className="transition-opacity duration-500">
              <p className="text-xl font-body mb-2">
                {quotes[currentQuoteIndex].text}
              </p>
              <p className="text-sm font-body">
                {quotes[currentQuoteIndex].chapter}
              </p>
            </div>
          </div>

          <a
            href="#read"
            className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-body font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2 group"
          >
            <span>מעבר לקריאה</span>
            <FaChevronRight className="transform transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <div id="read" className="relative page-transition">
        <div className="absolute inset-0">
          <img
            src={sectionImages.read}
            alt="Open book"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-90"></div>
        </div>
        <div className="relative py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-heading text-center mb-16 text-white">
              לקריאת החיבור
            </h2>
            <div className="bg-white rounded-2xl shadow-lg p-16">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-heading">
                  {data[currentChapter].title}
                </h3>
                <div className="flex gap-6">
                  {nextChapter && (
                    <button
                      onClick={() => setCurrentChapter(currentChapter + 1)}
                      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors text-lg"
                    >
                      <span>לפרק הבא</span>
                      <FaChevronRight size={24} />
                    </button>
                  )}
                  {prevChapter && (
                    <button
                      onClick={() => setCurrentChapter(currentChapter - 1)}
                      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors text-lg"
                    >
                      <FaChevronLeft size={24} />
                      <span>הפרק הקודם</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="font-body text-xl leading-relaxed whitespace-pre-wrap text-gray-800 mb-12">
                {data[currentChapter].text}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative page-transition">
        <div className="absolute inset-0">
          <img
            src={sectionImages.quotes}
            alt="Open field with books"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white bg-opacity-90"></div>
        </div>
        <div className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 text-white rounded-2xl shadow-lg p-8 text-center">
              <p className="text-2xl font-body mb-4">
                {quotes[currentQuoteIndex].text}
              </p>
              <footer className="text-gray-300 font-body">
                {quotes[currentQuoteIndex].chapter}
              </footer>
            </div>
          </div>
        </div>
      </div>

      <div id="contact" className="relative page-transition">
        <div className="absolute inset-0">
          <img
            src={sectionImages.contact}
            alt="Sunrise"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-50 bg-opacity-95"></div>
        </div>
        <div className="relative py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-heading mb-2">תודה שקראתם</h2>
            <p className="text-xl font-heading mb-8">רחל קרמניצר</p>

            <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=256"
                alt="Book"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-lg font-body mb-8">אשמח לשמוע את תגובותיכם</p>

            <div className="flex justify-center gap-4 mb-8">
              <a
                href="mailto:rkre@walla.com"
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors font-body"
              >
                <FaEnvelope size={20} />
                <span>rkre@walla.com</span>
              </a>
              <a
                href="tel:0549576421"
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors font-body"
              >
                <FaCommentAlt size={20} />
                <span>054-957-6421</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 flex flex-col gap-4">
        <a
          href="https://wa.me/972549576421"
          className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors transform hover:scale-110"
        >
          <FaCommentAlt size={24} />
        </a>
        <a
          href="mailto:rkre@walla.com"
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors transform hover:scale-110"
        >
          <FaEnvelope size={24} />
        </a>
      </div>

      <footer className="bg-gray-900 text-white py-4 text-center">
        <div className="font-body space-y-2">
          <p>© כל הזכויות שמורות לרחל קרמניצר {new Date().getFullYear()}</p>
          <p className="text-sm">
            אין להעתיק, לשכפל או לצלם ללא רשות מפורשת של המחברת
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

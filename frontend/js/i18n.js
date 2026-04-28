(() => {
  const LANG_KEY = "campus_lang";
  const nodeBaseText = new WeakMap();
  const attrBaseText = new WeakMap();

  const dictionaries = {
    English: {},
    Russian: {
      "Overview": "Обзор",
      "Schedule": "Расписание",
      "Grade Book": "Оценки",
      "Campus Map": "Карта кампуса",
      "Messages": "Сообщения",
      "Log Out": "Выйти",
      "Language": "Язык",
      "Dark Mode": "Тёмная тема",
      "English": "Английский",
      "Russian": "Русский",
      "Uzbek": "Узбекский",
      "Search courses, news, faculty...": "Поиск курсов, новостей, преподавателей...",
      "Find classmates or faculty...": "Найти однокурсников или преподавателей...",
      "Search campus locations...": "Поиск локаций кампуса...",
      "Search user by name or email...": "Поиск пользователя по имени или email...",
      "Write your message...": "Введите сообщение...",
      "Select receiver...": "Выберите получателя...",
      "Schedule & Events": "Расписание и события",
      "Grade Book & Portfolio": "Оценки и портфолио",
      "Campus Services": "Сервисы кампуса",
      "Messages & Community": "Сообщения и сообщество",
      "Welcome back, Alex. Here is what's happening today.": "С возвращением, Alex. Вот что происходит сегодня.",
      "Manage your classes, sports, and university events.": "Управляйте занятиями, спортом и университетскими событиями.",
      "Track your academic progress and achievements.": "Отслеживайте академический прогресс и достижения.",
      "Navigate the campus, order food, and access library services.": "Навигация по кампусу, заказ еды и библиотечные сервисы.",
      "Connect with peers, faculty, and student council.": "Общайтесь с однокурсниками, преподавателями и студсоветом.",
      "View Weekly": "Неделя",
      "Sync Calendar": "Синхронизировать",
      "Connect Telegram Bot": "Подключить Telegram-бота",
      "Download Transcript": "Скачать транскрипт",
      "Send Message": "Отправить сообщение",
      "View Full": "Открыть",
      "See all": "Смотреть все",
      "Open Grade Book": "Открыть зачетку",
      "Today's Schedule": "Сегодняшнее расписание",
      "Quick Actions": "Быстрые действия",
      "Campus News": "Новости кампуса",
      "Academic Progress": "Академический прогресс",
      "Achievements": "Достижения",
      "Classes & Seminars": "Занятия и семинары",
      "Sports Sections": "Спортивные секции",
      "Upcoming Campus Events": "Ближайшие события кампуса",
      "Current GPA": "Текущий GPA",
      "Credits Earned": "Полученные кредиты",
      "Academic Rank": "Академический рейтинг",
      "Fall 2026 Semester Grades": "Оценки за осенний семестр 2026",
      "Main Cafeteria": "Главная столовая",
      "Library": "Библиотека",
      "Notice Board": "Доска объявлений",
      "Admin Services": "Административные услуги",
      "Book Study Room": "Забронировать комнату",
      "Pre-order Food": "Предзаказ еды",
      "Consult Prof": "Консультация с преподавателем",
      "Request Docs": "Запросить документы",
      "Reserve Study Room": "Забронировать читальный зал",
      "Request Official Documents": "Запросить официальные документы",
      "Track Document Status": "Статус документа",
      "Pay Dorm Fees": "Оплатить общежитие",
      "Read Council News": "Новости совета",
      "Book Consult": "Записаться на консультацию",
      "Start Anonymous Chat": "Начать анонимный чат",
      "Quick Navigate": "Быстрая навигация",
      "Cafeteria": "Столовая",
      "Dormitories": "Общежития",
      "Yes": "Да",
      "No": "Нет",
      "View": "Открыть",
      "Progress": "Прогресс",
      "Credits": "Кредиты",
      "Untitled": "Без названия",
      "Event": "Событие",
      "Campus": "Кампус",
      "Unknown": "Неизвестно",
      "Invalid date": "Некорректная дата",
      "Loading schedule...": "Загрузка расписания...",
      "Loading events...": "Загрузка событий...",
      "No events scheduled.": "Нет запланированных занятий.",
      "No campus events scheduled.": "Нет запланированных событий кампуса.",
      "Loaded {count} timetable item(s).": "Загружено элементов расписания: {count}.",
      "Loaded {count} upcoming event(s).": "Загружено ближайших событий: {count}.",
      "Failed to load schedule.": "Не удалось загрузить расписание.",
      "Loading grades...": "Загрузка оценок...",
      "No subjects found.": "Предметы не найдены.",
      "No GPA data available": "Нет данных GPA",
      "Out of 120 required": "Из 120 необходимых",
      "Rank unavailable": "Рейтинг недоступен",
      "Unknown teacher": "Неизвестный преподаватель",
      "Room N/A": "Аудитория: н/д",
      "Calculated from backend grade records": "Рассчитано по записям backend",
      "Estimated from GPA band": "Оценка на основе диапазона GPA",
      "Loaded {count} subject(s) from backend.": "Загружено предметов из backend: {count}.",
      "Failed to load grades.": "Не удалось загрузить оценки.",
      "Load failed": "Ошибка загрузки",
      "Loading messages...": "Загрузка сообщений...",
      "No messages yet. Send the first message.": "Сообщений пока нет. Отправьте первое сообщение.",
      "Loaded {count} message(s).": "Загружено сообщений: {count}.",
      "Unknown user": "Неизвестный пользователь",
      "Unknown time": "Время неизвестно",
      "Could not load users list for receiver picker.": "Не удалось загрузить список пользователей.",
      "Session expired. Please login again.": "Сессия истекла. Войдите снова.",
      "Failed to load messages": "Не удалось загрузить сообщения",
      "Please select a receiver and enter message text.": "Выберите получателя и введите текст сообщения.",
      "Receiver ID must be a valid Mongo ObjectId.": "ID получателя должен быть валидным Mongo ObjectId.",
      "Sending message...": "Отправка сообщения...",
      "Message sent successfully.": "Сообщение успешно отправлено.",
      "Unauthorized. Please login again.": "Нет доступа. Войдите снова.",
      "Invalid receiver ID.": "Некорректный ID получателя.",
      "Failed to send message": "Не удалось отправить сообщение",
      "To: {name}": "Кому: {name}",
      "From: {name}": "От: {name}",
      "With: {name}": "С: {name}",
      "Please enter email and password.": "Введите email и пароль.",
      "Login failed": "Ошибка входа",
      "Sign In": "Войти",
      "Welcome back": "С возвращением",
      "Log in with your university email.": "Войдите с университетским email.",
      "University Email": "Университетский Email",
      "Password": "Пароль",
      "Remember me": "Запомнить меня",
      "Forgot password?": "Забыли пароль?",
      "Having trouble?": "Возникли проблемы?",
      "Contact IT Support": "Связаться с ИТ-поддержкой"
    },
    Uzbek: {
      "Overview": "Umumiy ko'rinish",
      "Schedule": "Dars jadvali",
      "Grade Book": "Baholar",
      "Campus Map": "Kampus xaritasi",
      "Messages": "Xabarlar",
      "Log Out": "Chiqish",
      "Language": "Til",
      "Dark Mode": "Tungi rejim",
      "English": "Inglizcha",
      "Russian": "Ruscha",
      "Uzbek": "O'zbekcha",
      "Search courses, news, faculty...": "Kurslar, yangiliklar, o'qituvchilarni qidirish...",
      "Find classmates or faculty...": "Talabalar yoki o'qituvchilarni qidirish...",
      "Search campus locations...": "Kampus joylarini qidirish...",
      "Search user by name or email...": "Foydalanuvchini ism yoki email bo'yicha qidiring...",
      "Write your message...": "Xabaringizni yozing...",
      "Select receiver...": "Qabul qiluvchini tanlang...",
      "Schedule & Events": "Jadval va tadbirlar",
      "Grade Book & Portfolio": "Baholar va portfolio",
      "Campus Services": "Kampus xizmatlari",
      "Messages & Community": "Xabarlar va hamjamiyat",
      "Welcome back, Alex. Here is what's happening today.": "Xush kelibsiz, Alex. Bugungi yangiliklar:",
      "Manage your classes, sports, and university events.": "Darslar, sport va universitet tadbirlarini boshqaring.",
      "Track your academic progress and achievements.": "Akademik rivojlanish va yutuqlaringizni kuzating.",
      "Navigate the campus, order food, and access library services.": "Kampus bo'ylab harakatlaning, ovqat buyurtma qiling va kutubxona xizmatlaridan foydalaning.",
      "Connect with peers, faculty, and student council.": "Talabalar, o'qituvchilar va talabalar kengashi bilan bog'laning.",
      "View Weekly": "Haftalik",
      "Sync Calendar": "Kalendarni sinxronlash",
      "Connect Telegram Bot": "Telegram botni ulash",
      "Download Transcript": "Transkriptni yuklash",
      "Send Message": "Xabar yuborish",
      "View Full": "To'liq ko'rish",
      "See all": "Barchasini ko'rish",
      "Open Grade Book": "Baholar kitobini ochish",
      "Today's Schedule": "Bugungi jadval",
      "Quick Actions": "Tezkor amallar",
      "Campus News": "Kampus yangiliklari",
      "Academic Progress": "Akademik progress",
      "Achievements": "Yutuqlar",
      "Classes & Seminars": "Darslar va seminarlar",
      "Sports Sections": "Sport bo'limlari",
      "Upcoming Campus Events": "Yaqinlashayotgan kampus tadbirlari",
      "Current GPA": "Joriy GPA",
      "Credits Earned": "Yig'ilgan kreditlar",
      "Academic Rank": "Akademik reyting",
      "Fall 2026 Semester Grades": "2026 kuz semestri baholari",
      "Main Cafeteria": "Asosiy oshxona",
      "Library": "Kutubxona",
      "Notice Board": "E'lonlar doskasi",
      "Admin Services": "Ma'muriy xizmatlar",
      "Book Study Room": "O'quv xonasini band qilish",
      "Pre-order Food": "Ovqatni oldindan buyurtma qilish",
      "Consult Prof": "Professor bilan maslahat",
      "Request Docs": "Hujjat so'rash",
      "Reserve Study Room": "O'quv xonasini band qilish",
      "Request Official Documents": "Rasmiy hujjatlarni so'rash",
      "Track Document Status": "Hujjat holati",
      "Pay Dorm Fees": "Yotoqxona to'lovini to'lash",
      "Read Council News": "Kengash yangiliklari",
      "Book Consult": "Maslahatga yozilish",
      "Start Anonymous Chat": "Anonim chatni boshlash",
      "Quick Navigate": "Tez yo'nalish",
      "Cafeteria": "Oshxona",
      "Dormitories": "Yotoqxonalar",
      "Yes": "Ha",
      "No": "Yo'q",
      "View": "Ko'rish",
      "Progress": "Jarayon",
      "Credits": "Kredit",
      "Untitled": "Nomsiz",
      "Event": "Tadbir",
      "Campus": "Kampus",
      "Unknown": "Noma'lum",
      "Invalid date": "Noto'g'ri sana",
      "Loading schedule...": "Jadval yuklanmoqda...",
      "Loading events...": "Tadbirlar yuklanmoqda...",
      "No events scheduled.": "Rejalashtirilgan darslar yo'q.",
      "No campus events scheduled.": "Rejalashtirilgan kampus tadbirlari yo'q.",
      "Loaded {count} timetable item(s).": "Jadval elementlari yuklandi: {count}.",
      "Loaded {count} upcoming event(s).": "Yaqin tadbirlar yuklandi: {count}.",
      "Failed to load schedule.": "Jadvalni yuklab bo'lmadi.",
      "Loading grades...": "Baholar yuklanmoqda...",
      "No subjects found.": "Fanlar topilmadi.",
      "No GPA data available": "GPA ma'lumotlari yo'q",
      "Out of 120 required": "Kerakli 120 dan",
      "Rank unavailable": "Reyting mavjud emas",
      "Unknown teacher": "Noma'lum o'qituvchi",
      "Room N/A": "Xona: mavjud emas",
      "Calculated from backend grade records": "Backend baho yozuvlaridan hisoblandi",
      "Estimated from GPA band": "GPA diapazoni bo'yicha taxmin",
      "Loaded {count} subject(s) from backend.": "Backenddan fanlar yuklandi: {count}.",
      "Failed to load grades.": "Baholarni yuklab bo'lmadi.",
      "Load failed": "Yuklashda xato",
      "Loading messages...": "Xabarlar yuklanmoqda...",
      "No messages yet. Send the first message.": "Hozircha xabarlar yo'q. Birinchi xabarni yuboring.",
      "Loaded {count} message(s).": "Yuklangan xabarlar: {count}.",
      "Unknown user": "Noma'lum foydalanuvchi",
      "Unknown time": "Vaqt noma'lum",
      "Could not load users list for receiver picker.": "Qabul qiluvchi uchun foydalanuvchilar ro'yxatini yuklab bo'lmadi.",
      "Session expired. Please login again.": "Sessiya tugadi. Qayta kiring.",
      "Failed to load messages": "Xabarlarni yuklab bo'lmadi",
      "Please select a receiver and enter message text.": "Qabul qiluvchini tanlang va xabar matnini kiriting.",
      "Receiver ID must be a valid Mongo ObjectId.": "Qabul qiluvchi ID to'g'ri Mongo ObjectId bo'lishi kerak.",
      "Sending message...": "Xabar yuborilmoqda...",
      "Message sent successfully.": "Xabar muvaffaqiyatli yuborildi.",
      "Unauthorized. Please login again.": "Ruxsat yo'q. Qayta kiring.",
      "Invalid receiver ID.": "Qabul qiluvchi ID noto'g'ri.",
      "Failed to send message": "Xabar yuborilmadi",
      "To: {name}": "Kimga: {name}",
      "From: {name}": "Kimdan: {name}",
      "With: {name}": "Bilan: {name}",
      "Please enter email and password.": "Email va parolni kiriting.",
      "Login failed": "Kirish muvaffaqiyatsiz",
      "Sign In": "Kirish",
      "Welcome back": "Qaytganingiz bilan",
      "Log in with your university email.": "Universitet emailingiz bilan kiring.",
      "University Email": "Universitet Emaili",
      "Password": "Parol",
      "Remember me": "Meni eslab qolish",
      "Forgot password?": "Parolni unutdingizmi?",
      "Having trouble?": "Muammo bormi?",
      "Contact IT Support": "IT yordamga murojaat qiling"
    }
  };

  const getLanguage = () => localStorage.getItem(LANG_KEY) || "English";

  const getLocale = () => {
    const lang = getLanguage();
    if (lang === "Russian") return "ru-RU";
    if (lang === "Uzbek") return "uz-UZ";
    return "en-US";
  };

  const applyParams = (text, params = {}) =>
    String(text).replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? `{${key}}`));

  const t = (key, params = {}) => {
    const lang = getLanguage();
    const translated = dictionaries[lang]?.[key] || key;
    return applyParams(translated, params);
  };

  const setLanguage = (lang) => {
    const normalized = ["English", "Russian", "Uzbek"].includes(lang) ? lang : "English";
    localStorage.setItem(LANG_KEY, normalized);
    translatePage(document);
    window.dispatchEvent(new CustomEvent("campus:language-changed", { detail: { language: normalized } }));
  };

  const translatePage = (root = document) => {
    const doc = root.ownerDocument || root;
    const walker = doc.createTreeWalker(root, NodeFilter.SHOW_TEXT);

    let textNode = walker.nextNode();
    while (textNode) {
      const parent = textNode.parentElement;
      if (
        parent &&
        !["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"].includes(parent.tagName) &&
        textNode.textContent &&
        textNode.textContent.trim()
      ) {
        if (!nodeBaseText.has(textNode)) {
          nodeBaseText.set(textNode, textNode.textContent);
        }

        const base = nodeBaseText.get(textNode);
        const raw = String(base);
        const leading = raw.match(/^\s*/)?.[0] || "";
        const trailing = raw.match(/\s*$/)?.[0] || "";
        const core = raw.trim();
        textNode.textContent = `${leading}${t(core)}${trailing}`;
      }
      textNode = walker.nextNode();
    }

    const attrTargets = root.querySelectorAll?.("[placeholder], [title], [aria-label]") || [];
    attrTargets.forEach((el) => {
      ["placeholder", "title", "aria-label"].forEach((attr) => {
        const value = el.getAttribute(attr);
        if (!value || !value.trim()) return;
        let cache = attrBaseText.get(el);
        if (!cache) {
          cache = {};
          attrBaseText.set(el, cache);
        }
        if (!cache[attr]) cache[attr] = value;
        el.setAttribute(attr, t(cache[attr]));
      });
    });
  };

  window.i18n = {
    LANG_KEY,
    getLanguage,
    setLanguage,
    getLocale,
    t,
    translatePage
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => translatePage(document), { once: true });
  } else {
    translatePage(document);
  }
})();

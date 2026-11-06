/* Языки нового лендинга (главная и /pricing/), 06.11.2026: RU в разметке, KZ и EN — здесь.
   Переводим текстовые узлы и подписи по точному совпадению русской фразы; выбор хранится в localStorage fh_lang (как на старом сайте),
   можно открыть с ?lang=kz или ?lang=en. Бренд Қорлан и цены не переводятся. Новую фразу на странице добавить сюда: [RU, KZ, EN]. */
(function () {
  var T = [
    // шапка и подвал
    ["ИИ-поиск", "ЖИ-іздеу", "AI search"],
    ["Своя база", "Өз базаңыз", "Your database"],
    ["Тарифы", "Тарифтер", "Pricing"],
    ["Блог", "Блог", "Blog"],
    ["Войти", "Кіру", "Log in"],
    ["Зарегистрироваться", "Тіркелу", "Sign up"],
    ["Язык", "Тіл", "Language"],
    ["© 2026 Flyhunt Ltd · Астана", "© 2026 Flyhunt Ltd · Астана", "© 2026 Flyhunt Ltd · Astana"],
    ["Сообщество AI для HR", "HR-ға арналған AI қауымдастығы", "AI for HR community"],
    ["Ивенты", "Іс-шаралар", "Events"],
    ["Обучение ИИ", "ЖИ-ге оқыту", "AI training"],
    ["Подбор под ключ", "Кілтке дейін іріктеу", "Done-for-you hiring"],
    ["Оферта", "Оферта", "Terms"],
    ["Конфиденциальность", "Құпиялылық", "Privacy"],
    ["Flyhunt в Instagram", "Flyhunt Instagram-да", "Flyhunt on Instagram"],
    ["Flyhunt в LinkedIn", "Flyhunt LinkedIn-де", "Flyhunt on LinkedIn"],
    ["Flyhunt на YouTube", "Flyhunt YouTube-та", "Flyhunt on YouTube"],
    ["Нанимают с Flyhunt", "Flyhunt-пен жалдайды", "Hiring with Flyhunt"],
    ["Смакополис", "Смакополис", "Smakopolis"],
    ["АРПА", "АРПА", "ARPA"],
    ["Айби Групп", "Айби Групп", "Aibi Group"],
    ["Зарегистрироваться бесплатно", "Тегін тіркелу", "Sign up free"],
    ["Вопрос? Напишите Қорлан в WhatsApp", "Сұрағыңыз бар ма? Қорланға WhatsApp-та жазыңыз", "Questions? Message Қорлан on WhatsApp"],
    ["Почему бесплатно: мы зарабатываем, только когда ИИ делает работу за вас.", "Неге тегін: біз ЖИ сіздің орныңызға жұмыс істегенде ғана табыс табамыз.", "Why free: we only earn when AI does the work for you."],
    ["Акция до 20 ноября", "20 қарашаға дейін акция", "Offer until November 20"],

    // главная — первый экран
    ["Акция до 20 ноября: зарегистрируйтесь — ATS останется бесплатной навсегда, а тарифы ИИ вдвое дешевле с фиксацией цены", "20 қарашаға дейін акция: тіркеліңіз — ATS мәңгі тегін қалады, ал ЖИ тарифтері бекітілген бағамен екі есе арзан", "Offer until November 20: sign up and the ATS stays free forever, with AI plans at half price and a locked-in rate"],
    ["ATS — бесплатно навсегда.", "ATS — мәңгі тегін.", "ATS — free forever."],
    ["Платите только за ИИ.", "Тек ЖИ үшін төлейсіз.", "Pay only for AI."],
    ["Воронка, база кандидатов и отклики hh — бесплатно. ИИ находит и проверяет кандидатов в вашей базе, на hh и в LinkedIn: 200 откликов — за 15 минут.", "Воронка, кандидаттар базасы және hh өтінімдері — тегін. ЖИ кандидаттарды сіздің базаңыздан, hh-тан және LinkedIn-нен тауып, тексереді: 200 өтінім — 15 минутта.", "Pipeline, candidate database and hh applications — free. AI finds and screens candidates in your database, on hh and on LinkedIn: 200 applications in 15 minutes."],
    ["Без карты · регистрация 2 минуты · бонус до 4 000 токенов ≈ 200 проверенных резюме ·", "Картасыз · тіркелу 2 минут · 4 000 токенге дейін бонус ≈ 200 тексерілген түйіндеме ·", "No card · 2-minute sign-up · bonus up to 4 000 tokens ≈ 200 screened résumés ·"],
    ["Поиск кандидатов", "Кандидаттарды іздеу", "Candidate search"],
    ["Менеджер по B2B-продажам, Алматы", "B2B-сату менеджері, Алматы", "B2B Sales Manager, Almaty"],
    ["Найти", "Табу", "Search"],
    ["Моя база", "Менің базам", "My database"],
    ["моя база", "менің базам", "my database"],
    ["совпадение", "сәйкестік", "match"],
    ["АК", "АК", "AK"], ["Айгерим К.", "Айгерим К.", "Aigerim K."],
    ["Откликалась год назад · теперь Head of Sales", "Бір жыл бұрын өтінім берген · қазір Head of Sales", "Applied a year ago · now Head of Sales"],
    ["ДС", "ДС", "DS"], ["Данияр С.", "Данияр С.", "Daniyar S."],
    ["Не ищет работу активно", "Белсенді жұмыс іздемейді", "Not actively looking"],
    ["МЖ", "МЖ", "MZh"], ["Мадина Ж.", "Мадина Ж.", "Madina Zh."],
    ["B2B-продажи, 4 года", "B2B-сату, 4 жыл", "B2B sales, 4 years"],
    ["200 откликов — за 15 минут", "200 өтінім — 15 минутта", "200 applications in 15 minutes"],

    // главная — как ищет ИИ
    ["Вы даёте вакансию. ИИ — лучших кандидатов.", "Сіз — вакансия, ЖИ — үздік кандидаттар.", "You give the job. AI gives you the best candidates."],
    ["Один запрос — и ИИ ищет сразу в трёх местах, сравнивает людей с вакансией и ставит самых сильных наверх.", "Бір сұрау — ЖИ бірден үш жерден іздейді, адамдарды вакансиямен салыстырып, ең мықтыларын жоғарыға шығарады.", "One request and AI searches three places at once, compares people against the job and puts the strongest at the top."],
    ["Ваша база", "Сіздің базаңыз", "Your database"],
    ["Сначала — люди, которые уже откликались к вам или были в найме. Их не нужно искать заново.", "Алдымен — сізге бұрын өтінім берген немесе іріктеуден өткен адамдар. Оларды қайта іздеудің қажеті жоқ.", "First, people who have already applied to you or been in your hiring process. No need to find them again."],
    ["Резюме из базы hh и все отклики на ваши вакансии — проверены по вашим критериям.", "hh базасындағы түйіндемелер мен вакансияларыңызға келген барлық өтінімдер — сіздің критерийлеріңіз бойынша тексерілген.", "Résumés from the hh database and every application to your jobs — screened against your criteria."],
    ["Те, кто не откликается и не ищет работу активно, — с контактами.", "Өтінім бермейтін және белсенді жұмыс іздемейтіндер — байланыстарымен.", "People who don't apply and aren't actively looking — with contact details."],
    ["один список", "бір тізім", "one list"],
    [", где у каждого кандидата оценка и объяснение, почему он подходит", ": әр кандидаттың бағасы бар және неге сәйкес келетіні түсіндірілген", ", where every candidate has a score and an explanation of why they fit"],

    // главная — сколько времени
    ["Сколько времени возвращает ИИ", "ЖИ қанша уақыт үнемдейді", "How much time AI gives back"],
    ["На одну вакансию со 200 откликами", "200 өтінімі бар бір вакансияға", "Per job with 200 applications"],
    ["Работа", "Жұмыс", "Task"], ["Руками", "Қолмен", "Manually"], ["С Flyhunt", "Flyhunt-пен", "With Flyhunt"],
    ["Разобрать 200 откликов", "200 өтінімді қарап шығу", "Review 200 applications"],
    ["10 часов", "10 сағат", "10 hours"], ["15 минут", "15 минут", "15 minutes"],
    ["Найти тех, кто не откликается", "Өтінім бермейтіндерді табу", "Find people who don't apply"],
    ["2 дня", "2 күн", "2 days"], ["10 минут", "10 минут", "10 minutes"],
    ["Поднять своих прошлых кандидатов", "Бұрынғы кандидаттарыңызды қайта қарау", "Revisit your past candidates"],
    ["не делается", "жасалмайды", "never happens"], ["сразу", "бірден", "instantly"],
    ["Разместить на 4 площадках", "4 алаңда жариялау", "Post on 4 job boards"],
    ["1 час", "1 сағат", "1 hour"], ["1 клик", "1 рет басу", "1 click"],
    ["Отчёт руководителю", "Басшыға есеп", "Report to management"],
    ["2 часа", "2 сағат", "2 hours"], ["≈ 30 часов", "≈ 30 сағат", "≈ 30 hours"],
    ["экономии на каждой вакансии — почти неделя работы рекрутера", "әр вакансиядан үнемделеді — рекрутердің бір аптаға жуық жұмысы", "saved on every job — almost a week of a recruiter's work"],
    ["Оценка: 3 минуты на ручной разбор одного резюме", "Есеп: бір түйіндемені қолмен қарауға 3 минут", "Estimate: 3 minutes to review one résumé manually"],

    // главная — строка цены
    ["ATS — 0 ₸ навсегда.", "ATS — мәңгі 0 ₸.", "ATS — 0 ₸ forever."],
    ["ИИ — от", "ЖИ —", "AI — from"],
    ["10 000 ₸/мес", "10 000 ₸/айдан бастап", "10 000 ₸/mo"],
    ["за всю компанию при оплате за год (помесячно 12 500)", "бүкіл компанияға, жылдық төлеммен (ай сайын төлесеңіз — 12 500)", "for the whole company, billed annually (12 500 monthly)"],
    ["Почему бесплатно: мы зарабатываем, только когда ИИ делает работу за вас. ≈ 5 000 ₸ за человека · раньше 35 000 ₸ за каждого", "Неге тегін: біз ЖИ сіздің орныңызға жұмыс істегенде ғана табыс табамыз. Адам басына ≈ 5 000 ₸ · бұрын әрқайсысына 35 000 ₸", "Why free: we only earn when AI does the work for you. ≈ 5 000 ₸ per person · previously 35 000 ₸ each"],
    ["Все тарифы →", "Барлық тарифтер →", "All plans →"],

    // главная — своя база
    ["Своя база кандидатов,", "Өз кандидаттар базаңыз —", "Your own candidate database"],
    ["которая не стареет", "ешқашан ескірмейді", "that never goes stale"],
    ["Вы годами копите кандидатов — а через полгода половина контактов и резюме уже неактуальна. Во Flyhunt база обновляется сама.", "Сіз кандидаттарды жылдар бойы жинайсыз — ал жарты жылдан кейін байланыстар мен түйіндемелердің жартысы ескіреді. Flyhunt-та база өздігінен жаңарып отырады.", "You collect candidates for years, and six months later half the contacts and résumés are out of date. In Flyhunt the database updates itself."],
    ["Каждый отклик сохраняется сам", "Әр өтінім өздігінен сақталады", "Every application is saved automatically"],
    ["со всех площадок — ничего не теряется, когда вакансия закрыта", "барлық алаңдардан — вакансия жабылғанда ештеңе жоғалмайды", "from every job board — nothing is lost when the job closes"],
    ["Обновляется сама с hh и LinkedIn", "hh және LinkedIn арқылы өздігінен жаңарады", "Updates itself from hh and LinkedIn"],
    ["человек сменил работу или обновил резюме — у вас тоже свежая версия", "адам жұмысын ауыстырды немесе түйіндемесін жаңартты — сізде де жаңа нұсқа", "someone changes jobs or updates their résumé — you get the fresh version too"],
    ["Перенесём базу из других ATS", "Базаны басқа ATS-тен көшіріп береміз", "We'll migrate your database from other ATSs"],
    ["на платном тарифе — за вас; Excel загрузите сами за минуту", "ақылы тарифте — біз жасаймыз; Excel-ді өзіңіз бір минутта жүктейсіз", "on a paid plan we do it for you; upload Excel yourself in a minute"],
    ["ИИ ищет в ней первой", "ЖИ алдымен сонда іздейді", "AI searches it first"],
    ["лучшие кандидаты часто уже у вас — просто о них забыли", "үздік кандидаттар көбіне сізде бар — тек олар ұмыт қалған", "your best candidates are often already there — just forgotten"],
    ["· 12 480 кандидатов", "· 12 480 кандидат", "· 12 480 candidates"],
    ["За неделю обновлено 214 профилей", "Бір аптада 214 профиль жаңартылды", "214 profiles updated this week"],
    ["Менеджер, Beeline", "Менеджер, Beeline", "Manager, Beeline"],
    ["вчера", "кеше", "yesterday"],
    ["ЕТ", "ЕТ", "YT"], ["Ерлан Т.", "Ерлан Т.", "Yerlan T."],
    ["Обновил резюме на hh · ищет работу", "hh-та түйіндемесін жаңартты · жұмыс іздеп жүр", "Updated résumé on hh · job hunting"],
    ["СН", "СН", "SN"], ["Сауле Н.", "Сәуле Н.", "Saule N."],
    ["Новый телефон и почта", "Жаңа телефон мен пошта", "New phone and email"],
    ["3 дня", "3 күн", "3 days"],
    ["РМ", "РМ", "RM"], ["Руслан М.", "Руслан М.", "Ruslan M."],
    ["Откликался в 2024 · снова в поиске", "2024 жылы өтінім берген · қайта іздеуде", "Applied in 2024 · looking again"],
    ["5 дней", "5 күн", "5 days"],

    // главная — ATS
    ["Полноценная ATS. Только работу в ней делает ИИ.", "Толыққанды ATS. Тек ондағы жұмысты ЖИ атқарады.", "A full-featured ATS. Except AI does the work in it."],
    ["Всё, что нужно для найма командой, — без настройки и внедрения.", "Командамен жалдауға қажеттінің бәрі — баптаусыз және енгізусіз.", "Everything you need to hire as a team — no setup, no rollout."],
    ["Обычная ATS", "Кәдімгі ATS", "A typical ATS"],
    ["Хранит кандидатов, которых вы нашли", "Сіз тапқан кандидаттарды сақтайды", "Stores the candidates you found"],
    ["Сама находит кандидатов", "Кандидаттарды өзі табады", "Finds candidates itself"],
    ["Резюме читаете вы", "Түйіндемені сіз оқисыз", "You read the résumés"],
    ["ИИ проверяет каждое и объясняет оценку", "ЖИ әрқайсысын тексеріп, бағасын түсіндіреді", "AI screens each one and explains the score"],
    ["База устаревает", "База ескіреді", "The database goes stale"],
    ["База обновляется сама", "База өздігінен жаңарады", "The database updates itself"],
    ["Вакансию размещаете на каждой площадке", "Вакансияны әр алаңға өзіңіз орналастырасыз", "You post the job on each board"],
    ["Один клик — hh, LinkedIn, OLX, Astana Hub", "Бір басу — hh, LinkedIn, OLX, Astana Hub", "One click — hh, LinkedIn, OLX, Astana Hub"],
    ["Отчёты строите сами", "Есептерді өзіңіз құрасыз", "You build reports yourself"],
    ["ИИ говорит, почему вакансия буксует", "ЖИ вакансияның неге тоқтап тұрғанын айтады", "AI tells you why a job is stuck"],
    ["Неделя на внедрение", "Енгізуге бір апта", "A week to roll out"],
    ["Подключили hh — и работаете", "hh-ты қостыңыз — жұмыс істей бересіз", "Connect hh and get to work"],
    ["Воронка по этапам", "Кезеңдер бойынша воронка", "Stage-based pipeline"],
    ["Команда и роли", "Команда және рөлдер", "Team and roles"],
    ["Решение заказчика по ссылке", "Тапсырыс берушінің шешімі сілтеме арқылы", "Hiring manager decisions via link"],
    ["Отклики со всех площадок в одном списке", "Барлық алаңдардағы өтінімдер бір тізімде", "Applications from all boards in one list"],
    ["История по кандидату", "Кандидат тарихы", "Candidate history"],
    ["Отчёт руководству", "Басшылыққа есеп", "Management report"],
    ["Сводка раз в неделю", "Аптасына бір рет шолу", "Weekly summary"],

    // главная — Қорлан
    ["ИИ-помощник Flyhunt", "Flyhunt ЖИ-көмекшісі", "Flyhunt AI assistant"],
    ["Вам поможет Қорлан. В WhatsApp и в кабинете.", "Сізге Қорлан көмектеседі. WhatsApp-та және жеке кабинетте.", "Қорлан is here to help. On WhatsApp and in your account."],
    ["Подключит площадки, настроит первую вакансию, подскажет, что делать дальше, — и сделает это сама, если попросите.", "Алаңдарды қосады, алғашқы вакансияны баптайды, әрі қарай не істеу керегін айтады — сұрасаңыз, өзі орындап береді.", "She'll connect your job boards, set up your first job, tell you what to do next — and do it herself if you ask."],
    ["Написать Қорлан в WhatsApp →", "Қорланға WhatsApp-та жазу →", "Message Қорлан on WhatsApp →"],
    ["Как подключить hh?", "hh-ты қалай қосамын?", "How do I connect hh?"],
    ["Нажмите «Подключить hh» в Интеграциях — займёт минуту.", "«Интеграциялар» бөлімінде «hh қосу» батырмасын басыңыз — бір минут алады.", "Click “Connect hh” in Integrations — it takes a minute."],
    ["Готово, вижу 3 вакансии. Запустить по ним скрининг?", "Дайын, 3 вакансияны көріп тұрмын. Олар бойынша скринингті іске қосайын ба?", "Done, I can see 3 jobs. Shall I run screening on them?"],
    ["Да", "Иә", "Yes"],
    ["Запустила. Утром пришлю лучших.", "Іске қостым. Таңертең үздіктерін жіберемін.", "Started. I'll send you the best ones in the morning."],
    ["Flyhunt в Claude", "Flyhunt Claude-та", "Flyhunt in Claude"],
    ["через MCP-коннектор →", "MCP-коннектор арқылы →", "via the MCP connector →"],
    ["Расширение для Chrome", "Chrome кеңейтімі", "Chrome extension"],
    ["кандидаты из LinkedIn в один клик", "LinkedIn-нен кандидаттар бір басумен", "LinkedIn candidates in one click"],
    ["Нас поддерживают", "Бізді қолдайды", "Backed by"],

    // вопросы (главная и тарифы)
    ["Частые вопросы", "Жиі қойылатын сұрақтар", "FAQ"],
    ["Вопросы о тарифах", "Тарифтер туралы сұрақтар", "Pricing questions"],
    ["Flyhunt заменит мою ATS?", "Flyhunt менің ATS-ымды алмастыра ала ма?", "Can Flyhunt replace my ATS?"],
    ["Да. Воронка, команда, заказчики и отчёты — внутри. Кандидатов из Excel загрузите сами, а из других ATS на платном тарифе перенесём за вас.", "Иә. Воронка, команда, тапсырыс берушілер және есептер — ішінде. Excel-дегі кандидаттарды өзіңіз жүктейсіз, ал басқа ATS-тен ақылы тарифте біз көшіріп береміз.", "Yes. Pipeline, team, hiring managers and reports are all built in. Upload candidates from Excel yourself; on a paid plan we'll migrate them from other ATSs for you."],
    ["Решает ли ИИ, кого нанимать?", "Кімді жалдауды ЖИ шеше ме?", "Does AI decide whom to hire?"],
    ["Нет. ИИ находит, проверяет и объясняет оценку. Решение всегда за вами.", "Жоқ. ЖИ тауып, тексеріп, бағасын түсіндіреді. Шешім әрқашан сізде.", "No. AI finds, screens and explains its score. The decision is always yours."],
    ["Нужно ли уходить с hh?", "hh-тан кету керек пе?", "Do I need to leave hh?"],
    ["Нет. Flyhunt подключается к вашему аккаунту hh и работает поверх него.", "Жоқ. Flyhunt сіздің hh аккаунтыңызға қосылып, соның үстінен жұмыс істейді.", "No. Flyhunt connects to your hh account and works on top of it."],
    ["Как база обновляется сама?", "База өздігінен қалай жаңарады?", "How does the database update itself?"],
    ["Flyhunt регулярно сверяет кандидатов с hh и LinkedIn: новое место работы, обновлённое резюме, свежие контакты подтягиваются в карточку.", "Flyhunt кандидаттарды hh және LinkedIn-мен үнемі салыстырып отырады: жаңа жұмыс орны, жаңартылған түйіндеме, соңғы байланыстар карточкаға өзі түседі.", "Flyhunt regularly checks candidates against hh and LinkedIn: a new job, an updated résumé or fresh contacts are pulled into the profile."],
    ["Что бесплатно навсегда?", "Не мәңгі тегін?", "What's free forever?"],
    ["Вся ATS: вакансии, воронка, база кандидатов, отклики hh, расширение Chrome, заказчики и команда до 2 человек. Без срока и без карты. Платите только за работу ИИ — токенами.", "Бүкіл ATS: вакансиялар, воронка, кандидаттар базасы, hh өтінімдері, Chrome кеңейтімі, тапсырыс берушілер және 2 адамға дейінгі команда. Мерзімсіз және картасыз. Тек ЖИ жұмысы үшін — токенмен төлейсіз.", "The whole ATS: jobs, pipeline, candidate database, hh applications, Chrome extension, hiring managers and a team of up to 2. No time limit, no card. You pay only for AI work — in tokens."],
    ["Вся ATS: вакансии, воронка, база кандидатов, отклики hh, расширение Chrome, заказчики и команда до 2 человек. Без срока и без карты. Кто зарегистрируется до 20 ноября, сохраняет бесплатную ATS навсегда.", "Бүкіл ATS: вакансиялар, воронка, кандидаттар базасы, hh өтінімдері, Chrome кеңейтімі, тапсырыс берушілер және 2 адамға дейінгі команда. Мерзімсіз және картасыз. 20 қарашаға дейін тіркелгендер үшін ATS мәңгі тегін қалады.", "The whole ATS: jobs, pipeline, candidate database, hh applications, Chrome extension, hiring managers and a team of up to 2. No time limit, no card. Sign up before November 20 and the ATS stays free for you forever."],
    ["Что такое токены?", "Токен деген не?", "What are tokens?"],
    ["Расчётная единица ИИ: 1 токен = 1 ₸. Проверка одного резюме — 20 токенов, контакт из LinkedIn — 200. Токены тарифа приходят каждый месяц; не хватило — докупите от 10 000 ₸.", "ЖИ-дің есеп бірлігі: 1 токен = 1 ₸. Бір түйіндемені тексеру — 20 токен, LinkedIn-нен байланыс — 200. Тариф токендері ай сайын түседі; жетпесе — 10 000 ₸-ден бастап сатып аласыз.", "AI's unit of account: 1 token = 1 ₸. Screening one résumé costs 20 tokens, a LinkedIn contact 200. Plan tokens arrive every month; if you run short, top up from 10 000 ₸."],
    ["Расчётная единица ИИ: 1 токен = 1 ₸. Проверка одного резюме — 20 токенов, контакт из LinkedIn — 200. Токены тарифа приходят каждый месяц и действуют до конца месяца; не хватило — докупите от 10 000 ₸.", "ЖИ-дің есеп бірлігі: 1 токен = 1 ₸. Бір түйіндемені тексеру — 20 токен, LinkedIn-нен байланыс — 200. Тариф токендері ай сайын түседі және ай соңына дейін жарамды; жетпесе — 10 000 ₸-ден бастап сатып аласыз.", "AI's unit of account: 1 token = 1 ₸. Screening one résumé costs 20 tokens, a LinkedIn contact 200. Plan tokens arrive every month and are valid until the month ends; if you run short, top up from 10 000 ₸."],
    ["Что будет после 20 ноября?", "20 қарашадан кейін не болады?", "What happens after November 20?"],
    ["Кто зарегистрировался до 20 ноября — ATS остаётся бесплатной навсегда. Кто подключил тариф по акции — цена сохраняется, пока продлевает без перерыва.", "20 қарашаға дейін тіркелгендер үшін ATS мәңгі тегін қалады. Акциямен тариф қосқандар үшін баға үзіліссіз ұзартылып тұрғанша сақталады.", "If you sign up before November 20, the ATS stays free forever. If you start a plan at the offer price, that price stays as long as you renew without a break."],
    ["Нужна ли карта?", "Карта керек пе?", "Do I need a card?"],
    ["Нет. Регистрация и ATS — без карты. Карта нужна только чтобы подключить тариф.", "Жоқ. Тіркелу мен ATS — картасыз. Карта тек тарифті қосу үшін керек.", "No. Sign-up and the ATS need no card. A card is needed only to start a plan."],
    ["Что будет, если токены кончатся?", "Токендер таусылса не болады?", "What if I run out of tokens?"],
    ["ATS продолжит работать: вакансии, воронка, база, отклики hh — как обычно. На паузу встанет только ИИ, пока вы не подключите тариф или не докупите токены.", "ATS жұмысын жалғастырады: вакансиялар, воронка, база, hh өтінімдері — әдеттегідей. Тариф қоспайынша немесе токен сатып алмайынша тек ЖИ кідіртіледі.", "The ATS keeps working: jobs, pipeline, database, hh applications — as usual. Only AI pauses until you start a plan or top up tokens."],
    ["Можно ли платить по счёту ТОО?", "ЖШС шотымен төлеуге бола ма?", "Can we pay by company invoice?"],
    ["Да. Годовой тариф можно оплатить по счёту на юрлицо — напишите Қорлан, пришлём счёт и договор. Помесячно — картой с автосписанием.", "Иә. Жылдық тарифті заңды тұлғаға шот арқылы төлеуге болады — Қорланға жазыңыз, шот пен шарт жібереміз. Ай сайын — картадан автоматты түрде.", "Yes. An annual plan can be paid by invoice to a legal entity — message Қорлан and we'll send the invoice and contract. Monthly plans are paid by card with auto-renewal."],
    ["Как защищены данные?", "Деректер қалай қорғалған?", "How is my data protected?"],
    ["Данные хранятся на серверах в Казахстане. Вашу базу кандидатов и вакансии видит только ваша команда — другим компаниям они не доступны.", "Деректер Қазақстандағы серверлерде сақталады. Кандидаттар базаңыз бен вакансияларыңызды тек сіздің командаңыз көреді — басқа компаниялар оларға қол жеткізе алмайды.", "Data is stored on servers in Kazakhstan. Only your team can see your candidate database and jobs — other companies have no access."],
    ["Почему цена такая низкая?", "Неге баға соншалық төмен?", "Why is the price so low?"],
    ["Это акция до 20 ноября: обычная цена вдвое выше. Подключите тариф до срока — цена акции сохранится за вами, пока продлеваете без перерыва.", "Бұл 20 қарашаға дейінгі акция: әдеттегі баға екі есе жоғары. Тарифті мерзімге дейін қоссаңыз — акциялық баға үзіліссіз ұзартып тұрғаныңызша сізде сақталады.", "It's an offer until November 20: the regular price is twice as high. Start a plan before the deadline and keep the offer price as long as you renew without a break."],
    ["Цена — за каждого сотрудника?", "Баға әр қызметкерге ме?", "Is the price per employee?"],
    ["Нет, за всю компанию. В «Старте» до 2 человек, в «Команде» до 5, в Pro до 10. При полном составе это от 5 000 ₸ за человека в месяц — раньше было 35 000 ₸ за каждого.", "Жоқ, бүкіл компанияға. «Старт»-та 2 адамға дейін, «Команда»-да 5-ке дейін, Pro-да 10-ға дейін. Толық құраммен бұл адам басына айына 5 000 ₸-ден басталады — бұрын әрқайсысына 35 000 ₸ болатын.", "No, per company. Start covers up to 2 people, Team up to 5, Pro up to 10. With a full team that's from 5 000 ₸ per person per month — it used to be 35 000 ₸ each."],
    ["Как платить помесячно?", "Ай сайын қалай төлеймін?", "How does monthly billing work?"],
    ["Картой с автосписанием раз в месяц, отменить можно в любой момент — оплаченный месяц остаётся. За год — разово картой или по счёту, на 20% дешевле.", "Картадан айына бір рет автоматты түрде, кез келген уақытта тоқтатуға болады — төленген ай сақталады. Жылдық — картамен бір рет немесе шот арқылы, 20% арзанырақ.", "By card, charged automatically once a month; cancel anytime and keep the month you paid for. Annual — a one-off card payment or invoice, 20% cheaper."],

    // главная — финал
    ["Дайте ИИ свою вакансию", "ЖИ-ге вакансияңызды беріңіз", "Give AI your job"],
    ["200 откликов ИИ разберёт за 15 минут и покажет лучших из вашей базы, hh и LinkedIn. Зарегистрируйтесь до 20 ноября — ATS останется бесплатной навсегда.", "ЖИ 200 өтінімді 15 минутта қарап шығып, базаңыздан, hh пен LinkedIn-нен үздіктерін көрсетеді. 20 қарашаға дейін тіркеліңіз — ATS мәңгі тегін қалады.", "AI will review 200 applications in 15 minutes and show you the best from your database, hh and LinkedIn. Sign up before November 20 and the ATS stays free forever."],

    // тарифы
    ["ATS — бесплатно навсегда. Платите только за ИИ: проверку резюме, поиск, контакты.", "ATS — мәңгі тегін. Тек ЖИ үшін төлейсіз: түйіндеме тексеру, іздеу, байланыстар.", "ATS — free forever. Pay only for AI: résumé screening, search, contacts."],
    ["— сегодня последний день", "— бүгін соңғы күн", "— today is the last day"],
    ["Зарегистрируйтесь — ATS останется бесплатной навсегда, а тарифы ИИ вдвое дешевле с фиксацией цены.", "Тіркеліңіз — ATS мәңгі тегін қалады, ал ЖИ тарифтері бекітілген бағамен екі есе арзан.", "Sign up and the ATS stays free forever, with AI plans at half price and a locked-in rate."],
    ["Помесячно", "Ай сайын", "Monthly"], ["За год", "Жылына", "Annually"],
    ["Цена — за всю компанию, не за человека", "Баға — адам басына емес, бүкіл компанияға", "Price is per company, not per person"],
    ["Бесплатно", "Тегін", "Free"],
    ["навсегда · до 2 человек", "мәңгі · 2 адамға дейін", "forever · up to 2 people"],
    ["Вся ATS", "Бүкіл ATS", "The whole ATS"],
    ["Воронка, команда, заказчики", "Воронка, команда, тапсырыс берушілер", "Pipeline, team, hiring managers"],
    ["hh, расширение, поиск по базе", "hh, кеңейтім, база бойынша іздеу", "hh, extension, database search"],
    ["Бонус за первые шаги", "Алғашқы қадамдар үшін бонус", "Bonus for first steps"],
    ["до 4 000", "4 000-ға дейін", "up to 4 000"],
    ["≈ проверенных резюме", "≈ тексерілген түйіндеме", "≈ screened résumés"],
    ["или ≈ контактов LinkedIn", "немесе ≈ LinkedIn байланысы", "or ≈ LinkedIn contacts"],
    ["или ≈ запусков автопоиска", "немесе ≈ автоіздеу іске қосылымы", "or ≈ auto-search runs"],
    ["Начать бесплатно", "Тегін бастау", "Start free"],
    ["Старт", "Старт", "Start"], ["Команда", "Команда", "Team"],
    ["/ мес", "/ ай", "/ mo"],
    ["за компанию · до 2 человек", "компанияға · 2 адамға дейін", "per company · up to 2 people"],
    ["за компанию · до 5 человек", "компанияға · 5 адамға дейін", "per company · up to 5 people"],
    ["за компанию · до 10 человек", "компанияға · 10 адамға дейін", "per company · up to 10 people"],
    ["автосписание раз в месяц, отмена в любой момент", "айына бір рет автоматты төлем, кез келген уақытта тоқтатуға болады", "charged monthly, cancel anytime"],
    ["Всё из «Бесплатно»", "«Тегін» тарифіндегінің бәрі", "Everything in Free"],
    ["Начать со «Старта»", "«Старт»-ты таңдау", "Choose Start"],
    ["чаще выбирают", "жиі таңдайды", "most popular"],
    ["Начать с «Команды»", "«Команда»-ны таңдау", "Choose Team"],
    ["Начать с Pro", "Pro-ны таңдау", "Choose Pro"],
    ["1 токен = 1 ₸ · проверка резюме — 20 токенов · контакт LinkedIn — 200 · без карты до подключения тарифа", "1 токен = 1 ₸ · түйіндеме тексеру — 20 токен · LinkedIn байланысы — 200 · тариф қосылғанға дейін картасыз", "1 token = 1 ₸ · résumé screening — 20 tokens · LinkedIn contact — 200 · no card until you start a plan"],
    ["Раньше: 35 000 ₸ за каждого пользователя в месяц. Больше 10 человек —", "Бұрын: әр пайдаланушыға айына 35 000 ₸. 10 адамнан көп болса —", "Previously: 35 000 ₸ per user per month. More than 10 people —"],
    ["напишите Қорлан", "Қорланға жазыңыз", "message Қорлан"],
    ["Не хватило токенов — докупка от 10 000 ₸, 1 токен = 1 ₸. Нет времени нанимать самим?", "Токен жетпесе — 10 000 ₸-ден бастап қосымша сатып алу, 1 токен = 1 ₸. Өзіңіз жалдауға уақыт жоқ па?", "Short on tokens? Top up from 10 000 ₸, 1 token = 1 ₸. No time to hire yourself?"],
    ["Закроем вакансию за вас", "Вакансияны сіз үшін жабамыз", "We'll fill the job for you"]
  ];
  // фразы с числами, которые меняются (дни акции, цены при переключении «Помесячно / За год»)
  var NB = function (s) { return s.replace(/ /g, " "); };
  var P = [
    [/^— осталось (\d+) (день|дня|дней)$/, function (m) { return ["— " + m[1] + " күн қалды", "— " + m[1] + (m[1] === "1" ? " day" : " days") + " left"]; }],
    [/^≈ ([\d ]+) ₸ за человека$/, function (m) { return ["адам басына ≈ " + NB(m[1]) + " ₸", "≈ " + NB(m[1]) + " ₸ per person"]; }],
    [/^([\d ]+) ₸ один раз за год · экономия ([\d ]+) ₸$/, function (m) { return ["жылына бір рет " + NB(m[1]) + " ₸ · үнемдеу " + NB(m[2]) + " ₸", NB(m[1]) + " ₸ once a year · save " + NB(m[2]) + " ₸"]; }],
    [/^([\d ]+) токенов каждый месяц$/, function (m) { return ["ай сайын " + NB(m[1]) + " токен", NB(m[1]) + " tokens every month"]; }]
  ];
  var TITLES = {
    "Flyhunt — ATS бесплатно навсегда. Платите только за ИИ": ["Flyhunt — ATS мәңгі тегін. Тек ЖИ үшін төлейсіз", "Flyhunt — ATS free forever. Pay only for AI"],
    "Тарифы Flyhunt — ATS бесплатно, ИИ от 10 000 ₸/мес за компанию при оплате за год": ["Flyhunt тарифтері — ATS тегін, ЖИ жылдық төлеммен компанияға айына 10 000 ₸-ден", "Flyhunt pricing — free ATS, AI from 10 000 ₸/mo per company billed annually"]
  };

  var norm = function (s) { return s.replace(/ /g, " ").replace(/\s+/g, " ").trim(); };
  var D = {};
  T.forEach(function (r) { D[norm(r[0])] = [r[1], r[2]]; });
  var CYR = /[А-Яа-яЁё]/;
  var lang = "ru";

  function tr(ru) {
    var k = norm(ru), i = lang === "kz" ? 0 : 1;
    if (D[k]) return D[k][i];
    for (var j = 0; j < P.length; j++) { var m = k.match(P[j][0]); if (m) return P[j][1](m)[i]; }
    return null;
  }
  function doText(n) {
    if (n.__ru === undefined) { if (!CYR.test(n.nodeValue)) return; n.__ru = n.nodeValue; }
    if (lang === "ru") { if (n.nodeValue !== n.__ru) n.nodeValue = n.__ru; return; }
    var t = tr(n.__ru); if (t === null) return;
    var lead = n.__ru.match(/^\s*/)[0], tail = n.__ru.match(/\s*$/)[0];
    var v = lead + t + tail; if (n.nodeValue !== v) n.nodeValue = v;
  }
  var ATTRS = ["alt", "aria-label", "title", "placeholder", "data-month", "data-year"];
  function doAttrs(el) {
    ATTRS.forEach(function (a) {
      if (!el.hasAttribute(a)) return;
      el.__ruA = el.__ruA || {};
      if (el.__ruA[a] === undefined) { var v0 = el.getAttribute(a); if (!CYR.test(v0)) return; el.__ruA[a] = v0; }
      var ru = el.__ruA[a], t = lang === "ru" ? ru : tr(ru);
      if (t !== null && el.getAttribute(a) !== t) el.setAttribute(a, t);
    });
  }
  function walk(root) {
    if (root.nodeType === 3) { var p = root.parentNode; if (p && !/^(SCRIPT|STYLE|NOSCRIPT)$/.test(p.nodeName)) doText(root); return; }
    if (root.nodeType !== 1 || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(root.nodeName)) return;
    doAttrs(root);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null), n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 1) { if (!/^(SCRIPT|STYLE|NOSCRIPT)$/.test(n.nodeName)) doAttrs(n); }
      else if (!/^(SCRIPT|STYLE|NOSCRIPT)$/.test(n.parentNode.nodeName)) doText(n);
    }
  }
  var ruTitle = document.title, meta = document.querySelector('meta[name="description"]'), ruDesc = meta && meta.content;
  var obs = new MutationObserver(function (ms) {
    obs.disconnect();
    ms.forEach(function (m) {
      if (m.type === "characterData") { m.target.__ru = undefined; doText(m.target); }
      else for (var i = 0; i < m.addedNodes.length; i++) walk(m.addedNodes[i]);
    });
    watch();
  });
  function watch() { if (lang !== "ru") obs.observe(document.body, { childList: true, characterData: true, subtree: true }); }

  function setLang(l, save) {
    obs.disconnect();
    lang = l;
    document.documentElement.lang = l === "kz" ? "kk" : l;
    walk(document.body);
    var tt = TITLES[ruTitle]; document.title = l === "ru" || !tt ? ruTitle : tt[l === "kz" ? 0 : 1];
    if (meta && ruDesc) meta.content = l === "ru" ? ruDesc : (l === "kz" ? "ATS мәңгі тегін: воронка, кандидаттар базасы, hh өтінімдері, команда. ЖИ кандидаттарды hh пен LinkedIn-нен тауып, тексереді." : "Free-forever ATS: pipeline, candidate database, hh applications, team. AI finds and screens candidates on hh and LinkedIn.");
    document.querySelectorAll(".lng-sw button").forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-lang") === l ? "true" : "false"); });
    if (save) try { localStorage.setItem("fh_lang", l); } catch (e) {}
    watch();
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".lng-sw button");
    if (!b) return;
    var l = b.getAttribute("data-lang");
    setLang(l, true);
    if (window.ym) try { window.ym(99098822, "reachGoal", "lang_switch", { lang: l }); } catch (er) {}
  });
  var start = window.__fhPending || null, saveStart = !!start;
  if (saveStart && window.ym) try { window.ym(99098822, "reachGoal", "lang_switch", { lang: start }); } catch (e) {}
  if (!start) try { var q = new URLSearchParams(location.search).get("lang"); if (q === "kz" || q === "en" || q === "ru") start = q; } catch (e) {}
  if (!start) try { var s = localStorage.getItem("fh_lang"); if (s === "kz" || s === "en") start = s; } catch (e) {}
  if (start && start !== "ru") setLang(start, saveStart);
})();

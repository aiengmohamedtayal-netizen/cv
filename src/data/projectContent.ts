import type { Locale } from "@/i18n/translations";
import type { Project } from "./projects";

type LocalizedProject = Omit<Project, "title" | "tag" | "desc" | "href" | "caseStudy"> & {
  title: string;
  tag: string;
  desc: string;
  href: string;
  caseStudy: Project["caseStudy"];
};

const arabicContent: Record<string, Pick<LocalizedProject, "title" | "tag" | "desc" | "caseStudy">> = {
  "image-classification": {
    title: "نظام تصنيف الصور",
    tag: "الذكاء الاصطناعي",
    desc: "سير عمل لتصنيف الصور باستخدام TensorFlow مع خط استدلال واضح وتكامل ويب قابل للنشر.",
    caseStudy: {
      overview: "خط أنابيب قابل للتوسع للتعلم العميق صُمم لتصنيف الصور عالية الدقة بدقة عبر مجموعات بيانات متنوعة باستخدام الشبكات العصبية الالتفافية، مع جاهزية للاستدلال الإنتاجي.",
      problem: "تفشل أنظمة تصنيف الصور التقليدية القائمة على القواعد في التكيف مع البيانات الواقعية المعقدة والمتنوعة، مما يؤدي إلى دقة منخفضة وبنى جامدة لا تتوسع.",
      solution: "هندسة بنية CNN مخصصة باستخدام TensorFlow وKeras، مع خط إدخال آلي وزيادة للبيانات وتعلم بالنقل لتحقيق دقة مناسبة للإنتاج.",
      architecture: [
        { title: "خط الإدخال", description: "معالجة مسبقة آلية وتوحيد للموترات وزيادة ديناميكية للدفعات.", icon: undefined as never },
        { title: "البنية العصبية", description: "شبكة CNN متعددة الطبقات مع إسقاط وتطبيع دفعي موجّهين لمنع فرط التخصيص.", icon: undefined as never },
        { title: "محرك الاستدلال", description: "طبقة تقديم نماذج محسنة تحقق زمن توقع أقل من 50 مللي ثانية.", icon: undefined as never },
      ],
      performance: [{ metric: "دقة التحقق", value: "94.5%" }, { metric: "استدلال P99", value: "< 45ms" }, { metric: "حجم الأثر", value: "12MB" }],
      future: ["تطبيق Vision Transformers لتحسين فهم السياق المكاني.", "نشر أوزان محسنة للحافة عبر TensorFlow Lite.", "بناء واجهة ويب لحظية لبث الكاميرا."],
    },
  },
  "ecommerce-store": {
    title: "متجر التجارة الإلكترونية",
    tag: "تطوير الويب",
    desc: "واجهة متجر متجاوبة مع إدارة المنتجات والمدفوعات وتدفقات خلفية تحافظ على حركة الطلبات.",
    caseStudy: {
      overview: "بنية تجارة إلكترونية متكاملة حديثة بُنيت لدعم تجربة تسوق سلسة ومعاملات آمنة وإدارة قوية للمخزون.",
      problem: "تعاني منصات التجارة الإلكترونية الأحادية القديمة من تجربة تطوير ضعيفة وتصيير بطيء وبنى API جامدة تعيق سرعة تطوير المزايا.",
      solution: "هندسة تطبيق SPA منفصل باستخدام MERN، مع مصادقة JWT آمنة وتحديثات واجهة متفائلة ومتجر Redux منظم.",
      architecture: [
        { title: "طبقة العميل", description: "تطبيق React SPA مع Redux Toolkit لإدارة الحالة العامة بصورة متوقعة.", icon: undefined as never },
        { title: "بوابة API", description: "خادم Node/Express RESTful لمعالجة منطق الأعمال والتوجيه الآمن.", icon: undefined as never },
        { title: "استمرارية البيانات", description: "عناقيد MongoDB تستخدم خطوط تجميع للاستعلام عالي الأداء.", icon: undefined as never },
      ],
      performance: [{ metric: "Lighthouse CI", value: "98/100" }, { metric: "زمن API P95", value: "< 120ms" }, { metric: "وقت التشغيل", value: "99.99%" }],
      future: ["دمج Stripe webhooks لمعالجة المدفوعات غير المتزامنة.", "تطبيق بحث دلالي عن المنتجات قائم على المتجهات.", "نقل المسارات الحرجة إلى Next.js للتصيير من الخادم."],
    },
  },
  "sales-analysis": {
    title: "تحليل بيانات المبيعات",
    tag: "تحليل البيانات",
    desc: "لوحة تحليلات تحول البيانات الخام إلى اتجاهات واضحة وتقارير بصرية وملخصات جاهزة للقرار.",
    caseStudy: {
      overview: "لوحة تحليلات مبيعات مؤسسية تعالج المعاملات الخام إلى رؤى استراتيجية قابلة للتنفيذ باستخدام Python وتصور البيانات التفاعلي.",
      problem: "يفتقر أصحاب المصلحة إلى رؤية فورية لمؤشرات المبيعات ويعتمدون على جداول ثابتة ومنفصلة تؤخر اتخاذ القرارات المهمة.",
      solution: "هندسة خط ETL قوي ولوحة تفاعلية باستخدام Python وPandas وPlotly لتنظيف مجموعات البيانات المعقدة وتجميعها وتصورها فورًا.",
      architecture: [
        { title: "خط ETL", description: "استخراج البيانات وتنظيفها وتطبيعها آليًا باستخدام Pandas.", icon: undefined as never },
        { title: "محرك التحليلات", description: "نمذجة إحصائية وخوارزميات للتنبؤ بالاتجاهات.", icon: undefined as never },
        { title: "لوحة تفاعلية", description: "واجهة ديناميكية قابلة للتصفية مبنية بـ Plotly ومتكاملة مع بيئة Jupyter.", icon: undefined as never },
      ],
      performance: [{ metric: "البيانات المعالجة", value: "2M+ Rows" }, { metric: "سرعة الاستعلام", value: "< 2s" }, { metric: "أنواع التصور", value: "15+" }],
      future: ["نشر اللوحة كتطبيق ويب مستقل باستخدام Streamlit أو Dash.", "دمج نماذج ذكاء اصطناعي تنبؤية لتوقع المبيعات.", "ربط قواعد SQL الحية للإدخال الفوري."],
    },
  },
  "smart-chatbot": {
    title: "المساعد الذكي",
    tag: "الذكاء الاصطناعي",
    desc: "مساعد محادثة ملائم للعربية يستخدم تقنيات NLP وتكامل الويب لحالات الدعم.",
    caseStudy: {
      overview: "روبوت محادثة ذكي واعٍ بالسياق مدرب للتعامل مع استفسارات دعم العملاء بالعربية والإنجليزية باستخدام معالجة اللغة الطبيعية.",
      problem: "أثقلت الاستفسارات المتكررة فرق الدعم، كما عانت حلول الروبوتات الحالية من صعوبة اللهجات العربية والاحتفاظ بالسياق.",
      solution: "هندسة خط NLP مخصص باستخدام NLTK والتعلم العميق لفهم النية واستخراج الكيانات، وتقديمه عبر Flask API سريع للواجهة.",
      architecture: [
        { title: "محرك NLP", description: "تصنيف النوايا واستخراج الكيانات باستخدام نماذج مدربة مخصصة.", icon: undefined as never },
        { title: "بوابة API", description: "خادم Flask يدير اتصالات WebSocket للمحادثة الفورية.", icon: undefined as never },
        { title: "التكامل", description: "أداة محادثة قابلة للتضمين في أي تطبيق ويب.", icon: undefined as never },
      ],
      performance: [{ metric: "دقة النية", value: "92%" }, { metric: "زمن الاستجابة", value: "< 200ms" }, { metric: "اللغات المدعومة", value: "EN, AR" }],
      future: ["دمج نماذج اللغة الكبيرة عبر API للمحادثات المفتوحة.", "إضافة التعرف على الصوت وتحويله إلى نص.", "بناء لوحة للمسؤولين لمشاهدة تحليلات المحادثة."],
    },
  },
  "task-management": {
    title: "نظام إدارة المهام",
    tag: "تطوير الويب",
    desc: "تطبيق لتتبع المشاريع يركز على رؤية الفريق وملكية المهام وتسريع الانتقال من قائمة العمل إلى الإنجاز.",
    caseStudy: {
      overview: "تطبيق SaaS قوي متعدد المستأجرين يساعد الفرق على تنظيم المشاريع وتعيين المهام وتتبع التقدم باستخدام لوحات Kanban والعروض الزمنية.",
      problem: "تعاني الفرق من تواصل مجزأ وبرمجيات قديمة معقدة تعيق الإنتاجية بدلًا من دعمها.",
      solution: "تطوير واجهة React حديثة مع قاعدة PostgreSQL محسنة باستخدام Prisma ORM، وتحديثات فورية وواجهة سحب وإفلات بديهية.",
      architecture: [
        { title: "تطبيق العميل", description: "React مع سحب وإفلات وتحديثات واجهة متفائلة.", icon: undefined as never },
        { title: "قاعدة علائقية", description: "مخطط PostgreSQL محسن للاستعلامات العلائقية المعقدة.", icon: undefined as never },
        { title: "ORM آمن الأنواع", description: "Prisma يوفر أنواعًا صارمة من قاعدة البيانات إلى الواجهة.", icon: undefined as never },
      ],
      performance: [{ metric: "Lighthouse", value: "100/100" }, { metric: "استعلامات القاعدة", value: "< 50ms" }, { metric: "تحديث الحالة", value: "فوري" }],
      future: ["تطبيق WebSockets للتعاون المباشر وتحديثات اللوحة الفورية.", "إضافة تحكم شامل بالصلاحيات RBAC.", "دمج الذكاء الاصطناعي لاقتراح تقسيم المهام وتقدير الوقت."],
    },
  },
  "recommendation-system": {
    title: "نظام التوصيات",
    tag: "الذكاء الاصطناعي",
    desc: "محرك توصيات يستخدم التصفية التعاونية لتحسين الملاءمة والاكتشاف والاحتفاظ بالمستخدمين.",
    caseStudy: {
      overview: "محرك توصيات شخصي بُني لزيادة تفاعل المستخدم عبر تحليل الأنماط السلوكية واقتراح محتوى أو منتجات شديدة الصلة.",
      problem: "تؤدي قوائم المنتجات العامة إلى معدلات تحويل منخفضة وضعف اكتشاف العناصر المتخصصة.",
      solution: "تنفيذ نظام توصيات هجين يجمع بين التصفية التعاونية وتحليل المحتوى باستخدام Scikit-learn.",
      architecture: [
        { title: "مصفوفة البيانات", description: "بناء مصفوفات تفاعل المستخدم والعنصر.", icon: undefined as never },
        { title: "الخوارزمية", description: "استخدام التحليل بالقيم المفردة لتقليل الأبعاد.", icon: undefined as never },
        { title: "طبقة التقديم", description: "Flask API يقدم التوصيات في أقل من ثانية.", icon: undefined as never },
      ],
      performance: [{ metric: "Precision@k", value: "0.85" }, { metric: "زمن التقديم", value: "< 80ms" }, { metric: "القابلية للتوسع", value: "مرتفعة" }],
      future: ["الانتقال إلى بنى توصية قائمة على التعلم العميق.", "إضافة توصيات فورية قائمة على الجلسة.", "بناء بنية اختبار A/B لقياس عائد الخوارزمية مباشرة."],
    },
  },
};

export const getLocalizedProject = (project: Project, locale: Locale): LocalizedProject => {
  const localized = locale === "ar" ? arabicContent[project.id] : undefined;
  if (!localized) return { ...project, href: `/${locale}/project/${project.id}` };

  return {
    ...project,
    ...localized,
    href: `/${locale}/project/${project.id}`,
    caseStudy: {
      ...localized.caseStudy,
      architecture: localized.caseStudy.architecture.map((item, index) => ({
        ...item,
        icon: project.caseStudy.architecture[index]?.icon ?? project.caseStudy.architecture[0].icon,
      })),
    },
  };
};

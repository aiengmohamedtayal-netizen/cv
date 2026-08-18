import { type LucideIcon, Brain, Code2, Database, Wrench } from "lucide-react";
import type { Locale } from "./translations";

export type LocalizedSkill = {
  name: string;
  usage: string;
  experience: string;
  projects: string[];
  description: string;
};

export type LocalizedSkillGroup = { title: string; icon: LucideIcon; items: LocalizedSkill[] };

const en: LocalizedSkillGroup[] = [
  { title: "Artificial Intelligence", icon: Brain, items: [
    { name: "Python", usage: "Core language for ML pipelines, backend services, and data manipulation.", experience: "3+ Years", projects: ["Image Classification", "Smart Chatbot", "Sales Analysis", "Recommendation System"], description: "Primary ecosystem for data science and AI logic." },
    { name: "TensorFlow / Keras", usage: "Designing and training deep neural networks (CNNs, NLP models).", experience: "2+ Years", projects: ["Image Classification"], description: "Used for high-performance deep learning models and scalable inference." },
    { name: "PyTorch", usage: "Research and dynamic graph computation for complex models.", experience: "2 Years", projects: ["AI Automation Kickstart"], description: "Preferred for rapid prototyping and academic research implementations." },
    { name: "Scikit-learn", usage: "Traditional machine learning algorithms and data preprocessing.", experience: "3 Years", projects: ["Recommendation System"], description: "Go-to library for classification, regression, and clustering baselines." },
  ] },
  { title: "Frontend Engineering", icon: Code2, items: [
    { name: "React.js", usage: "Building interactive, stateful Single Page Applications.", experience: "2+ Years", projects: ["E-Commerce Store", "Task Management"], description: "Core UI library used for all modern web interfaces." },
    { name: "TypeScript", usage: "Adding static typing for robust, enterprise-grade architecture.", experience: "2 Years", projects: ["Task Management"], description: "Essential for catching errors at compile-time and improving DX." },
    { name: "Tailwind CSS", usage: "Rapid UI development with utility-first classes and design systems.", experience: "2+ Years", projects: ["E-Commerce Store", "Task Management", "Portfolio"], description: "Used for creating highly customized, responsive, and performant designs." },
    { name: "JavaScript / DOM", usage: "Core logic, web animations, and browser API integrations.", experience: "4 Years", projects: ["E-Commerce Store", "Task Management"], description: "Fundamental web language used across all frontend projects." },
  ] },
  { title: "Backend & Systems", icon: Database, items: [
    { name: "Node.js / Express", usage: "Building fast, non-blocking REST APIs and microservices.", experience: "2+ Years", projects: ["E-Commerce Store", "Task Management"], description: "Primary backend technology for JavaScript-heavy stacks." },
    { name: "PostgreSQL", usage: "Relational data modeling, complex querying, and transaction safety.", experience: "2 Years", projects: ["Task Management"], description: "Used for data-intensive applications requiring strict ACID compliance." },
    { name: "MongoDB", usage: "Flexible document storage for rapid iteration and unstructured data.", experience: "2+ Years", projects: ["E-Commerce Store"], description: "Ideal for product catalogs and user profile data." },
    { name: "Django / Flask", usage: "Python-based web APIs heavily integrated with ML models.", experience: "2+ Years", projects: ["Smart Chatbot", "Recommendation System"], description: "Flask is used for lightweight ML microservices; Django for robust MVC applications." },
  ] },
  { title: "DevOps & Tooling", icon: Wrench, items: [
    { name: "Git / GitHub", usage: "Version control, code collaboration, and CI/CD pipelines.", experience: "3+ Years", projects: ["All Projects"], description: "Standard version control system for all source code." },
    { name: "Docker", usage: "Containerizing ML models and backend services for uniform deployment.", experience: "1.5 Years", projects: ["Image Classification"], description: "Ensures parity between development and production environments." },
    { name: "Linux", usage: "Server management, shell scripting, and environment configuration.", experience: "3 Years", projects: ["Server Deployments"], description: "Standard OS for all production servers and ML training rigs." },
  ] },
];

const ar: LocalizedSkillGroup[] = [
  { title: "الذكاء الاصطناعي", icon: Brain, items: [
    { name: "Python", usage: "اللغة الأساسية لخطوط تعلم الآلة وخدمات الخلفية ومعالجة البيانات.", experience: "أكثر من 3 سنوات", projects: ["تصنيف الصور", "المساعد الذكي", "تحليل المبيعات", "نظام التوصيات"], description: "البيئة الأساسية لعلوم البيانات ومنطق الذكاء الاصطناعي." },
    { name: "TensorFlow / Keras", usage: "تصميم وتدريب الشبكات العصبية العميقة ونماذج CNN وNLP.", experience: "أكثر من سنتين", projects: ["تصنيف الصور"], description: "للنماذج العميقة عالية الأداء والاستدلال القابل للتوسع." },
    { name: "PyTorch", usage: "البحث والحساب عبر الرسوم الديناميكية للنماذج المعقدة.", experience: "سنتان", projects: ["أتمتة الذكاء الاصطناعي"], description: "مفضل للنمذجة السريعة والتطبيقات البحثية الأكاديمية." },
    { name: "Scikit-learn", usage: "خوارزميات التعلم الآلي التقليدية والمعالجة المسبقة للبيانات.", experience: "3 سنوات", projects: ["نظام التوصيات"], description: "المكتبة الأساسية للتصنيف والانحدار والتجميع." },
  ] },
  { title: "هندسة الواجهات", icon: Code2, items: [
    { name: "React.js", usage: "بناء تطبيقات SPA تفاعلية وغنية بالحالة.", experience: "أكثر من سنتين", projects: ["متجر التجارة الإلكترونية", "إدارة المهام"], description: "مكتبة الواجهة الأساسية للتطبيقات الحديثة." },
    { name: "TypeScript", usage: "إضافة الأنواع الصارمة لبنية قوية مناسبة للمؤسسات.", experience: "سنتان", projects: ["إدارة المهام"], description: "ضروري لاكتشاف الأخطاء وتحسين تجربة التطوير." },
    { name: "Tailwind CSS", usage: "تطوير الواجهات بسرعة باستخدام أصناف وأدوات نظام التصميم.", experience: "أكثر من سنتين", projects: ["متجر التجارة الإلكترونية", "إدارة المهام", "المعرض الشخصي"], description: "لبناء تصاميم متجاوبة ومخصصة وعالية الأداء." },
    { name: "JavaScript / DOM", usage: "المنطق الأساسي وحركات الويب وتكامل واجهات المتصفح.", experience: "4 سنوات", projects: ["متجر التجارة الإلكترونية", "إدارة المهام"], description: "لغة الويب الأساسية المستخدمة في مشاريع الواجهة." },
  ] },
  { title: "الخلفية والأنظمة", icon: Database, items: [
    { name: "Node.js / Express", usage: "بناء REST APIs وخدمات مصغرة سريعة وغير حاجزة.", experience: "أكثر من سنتين", projects: ["متجر التجارة الإلكترونية", "إدارة المهام"], description: "تقنية الخلفية الأساسية للمكدسات المعتمدة على JavaScript." },
    { name: "PostgreSQL", usage: "نمذجة البيانات العلائقية والاستعلامات المعقدة وسلامة المعاملات.", experience: "سنتان", projects: ["إدارة المهام"], description: "للتطبيقات كثيفة البيانات التي تتطلب توافق ACID." },
    { name: "MongoDB", usage: "تخزين مستندات مرن للتطوير السريع والبيانات غير المنظمة.", experience: "أكثر من سنتين", projects: ["متجر التجارة الإلكترونية"], description: "مناسب لفهارس المنتجات وملفات المستخدمين." },
    { name: "Django / Flask", usage: "واجهات Python مدمجة بعمق مع نماذج التعلم الآلي.", experience: "أكثر من سنتين", projects: ["المساعد الذكي", "نظام التوصيات"], description: "يستخدم Flask للخدمات الخفيفة وDjango للتطبيقات القوية." },
  ] },
  { title: "DevOps والأدوات", icon: Wrench, items: [
    { name: "Git / GitHub", usage: "إدارة الإصدارات والتعاون وخطوط CI/CD.", experience: "أكثر من 3 سنوات", projects: ["كل المشاريع"], description: "نظام إدارة الإصدارات القياسي لكل الشيفرة." },
    { name: "Docker", usage: "تغليف نماذج الذكاء الاصطناعي وخدمات الخلفية للنشر الموحد.", experience: "سنة ونصف", projects: ["تصنيف الصور"], description: "يضمن التوافق بين بيئتي التطوير والإنتاج." },
    { name: "Linux", usage: "إدارة الخوادم والبرمجة النصية وإعداد البيئات.", experience: "3 سنوات", projects: ["نشر الخوادم"], description: "النظام القياسي للخوادم الإنتاجية وتدريب النماذج." },
  ] },
];

export const skillTranslations: Record<Locale, LocalizedSkillGroup[]> = { en, ar };

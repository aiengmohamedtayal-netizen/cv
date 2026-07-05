import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Award, Download, Eye, Link, Search, X, ShieldCheck, Calendar, Filter } from "lucide-react";

type Certificate = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  issuer: string;
  date: string;
  category: "AI & ML" | "Web Development" | "Business" | "Other";
  credentialId?: string;
  file?: string;
  skills?: string;
};

const certificates: Certificate[] = [
  {
    id: "vibe-coding",
    title: "Vibe Coding — L1 Bronze",
    issuer: "Lovable",
    date: "May 2026",
    category: "Other",
    skills: "Vibe Coding, AI-assisted development"
  },
  {
    id: "claude-101",
    title: "Claude 101",
    issuer: "Anthropic",
    date: "April 2026",
    category: "AI & ML",
    credentialId: "8h47q7gj7drw",
    skills: "Claude AI, Prompt Engineering"
  },
  {
    id: "tf-deep-learning",
    title: "Python & TensorFlow: Deep Dive",
    issuer: "Udemy",
    date: "February 2026",
    category: "AI & ML",
    credentialId: "UC-0e702352",
    description: "Advanced ML training: Neural Networks, Deep Learning, Model Training & Evaluation."
  },
  {
    id: "python-beginners",
    title: "Python Complete Course",
    issuer: "Udemy",
    date: "February 2026",
    category: "Web Development",
    credentialId: "UC-701fba4c",
    description: "Intensive training covering: Python fundamentals, OOP, Backend foundations."
  },
  {
    id: "python-django",
    title: "Python & Django Learning Course",
    issuer: "Udemy",
    date: "February 2026",
    category: "Web Development",
    description: "Backend development, Web application architecture, Dynamic web apps."
  },
  {
    id: "verizon-orientation",
    title: "Verizon Skill Forward Orientation Course",
    issuer: "edX",
    date: "February 2026",
    category: "Other",
    credentialId: "2176429785744d0bb85833259a01eb27"
  },
  {
    id: "ai-automation",
    title: "AI Automation Kickstart",
    issuer: "Udemy",
    date: "February 2026",
    category: "AI & ML",
    credentialId: "97ae3180",
    description: "Focused on AI workflow automation, Intelligent systems, Process optimization."
  },
  {
    id: "soft-skills-creative",
    title: "Essential Soft Skills for Creative Professionals",
    issuer: "LinkedIn Learning",
    date: "January 2026",
    category: "Other"
  },
  {
    id: "dotnet-backend",
    title: "Back-End Web Development with .NET",
    issuer: "Microsoft",
    date: "January 2026",
    category: "Web Development",
    description: ".NET backend development, APIs, Server-side application development."
  },
  {
    id: "sorting-algorithms",
    title: "Introduction to the Sorting Algorithms",
    issuer: "SkillUp by Simplilearn",
    date: "November 2025",
    category: "Web Development",
    credentialId: "9323087",
    description: "Sorting algorithms, Computational thinking, Data structures fundamentals."
  },
  {
    id: "tf-nlp-transfer",
    title: "Transfer Learning for NLP with TensorFlow Hub",
    issuer: "Google",
    date: "2025",
    category: "AI & ML",
    description: "Natural Language Processing, Transfer Learning models, TensorFlow Hub integration."
  },
  {
    id: "aws-devops-genai",
    title: "DevOps and AI on AWS: Upgrading Apps with Generative AI",
    issuer: "AWS",
    date: "2025",
    category: "AI & ML",
    description: "Cloud DevOps practices, AWS integration, Generative AI application upgrading."
  },
  {
    id: "applied-ml-python",
    title: "Applied Machine Learning in Python",
    issuer: "Coursera",
    date: "2025",
    category: "AI & ML",
    description: "Machine Learning models, Scikit-learn, Feature engineering, Model evaluation in Python."
  },
  {
    id: "genai-ux-ui",
    title: "Generative AI: The Future of UX UI Design",
    issuer: "Coursera",
    date: "2025",
    category: "AI & ML",
    description: "Integrating Generative AI tools into UX/UI design workflows, User experience prototyping."
  },
  {
    id: "intro-llms",
    title: "Introduction to Large Language Models",
    issuer: "Google",
    date: "2025",
    category: "AI & ML",
    description: "Foundational LLM concepts, Prompting principles, and Generative AI applications."
  },
  {
    id: "genai-intro-apps",
    title: "Generative AI: Introduction and Applications",
    issuer: "IBM",
    date: "2025",
    category: "AI & ML",
    description: "Introduction to Generative AI, Large Language Models, and practical applications in industry."
  },
  {
    id: "effective-comm",
    title: "Effective Communication Skills",
    issuer: "IBM",
    date: "2025",
    category: "Other",
    description: "Professional communication, Active listening, Writing, and Presentation skills."
  },
  {
    id: "cybersecurity-foundations",
    title: "Cybersecurity Foundations: Threats, Networks, and IoT Protection",
    issuer: "IBM",
    date: "2025",
    category: "Other",
    description: "Cybersecurity threats, Network security protocols, IoT vulnerability protection."
  },
  {
    id: "programming-js",
    title: "Programming with JavaScript",
    issuer: "Meta",
    date: "2025",
    category: "Web Development",
    description: "JavaScript syntax, OOP, Functional programming, Testing with Jest."
  },
  {
    id: "intro-frontend",
    title: "Introduction to Front-End Development",
    issuer: "Meta",
    date: "2025",
    category: "Web Development",
    description: "Core web technologies, HTML5, CSS3, Responsive design, Developer tools."
  },
  {
    id: "tech-support-fundamentals",
    title: "Technical Support Fundamentals",
    issuer: "Google",
    date: "2025",
    category: "Other",
    description: "IT support infrastructure, Technical terminology, Troubleshooting protocols."
  },
  {
    id: "ux-foundations",
    title: "Foundations of User Experience (UX) Design",
    issuer: "Google",
    date: "2025",
    category: "Other",
    description: "UX design process, User research, Wireframing, Prototyping, Accessibility principles."
  },
  {
    id: "edx-remote-work",
    title: "edX Verified Certificate for Remote Work Revolution for Everyone",
    issuer: "edX",
    date: "2026",
    category: "Other",
    description: "Remote team collaboration, Digital tools, Communication, Trust building."
  },
  {
    id: "edx-prompt-eng",
    title: "edX Verified Certificate for Introduction to Prompt Engineering",
    issuer: "edX",
    date: "2026",
    category: "AI & ML",
    description: "Prompt design, Large Language Models prompting techniques, AI interaction optimization."
  },
  {
    id: "edx-business-data-analysis",
    title: "edX Professional Certificate for Business and Data Analysis Skills",
    issuer: "edX",
    date: "2026",
    category: "Business",
    description: "Data analysis methodologies, Business intelligence, Excel and visualization tools."
  },
  {
    id: "edx-it-support-cases",
    title: "edX Verified Certificate for IT Support Case Studies",
    issuer: "edX",
    date: "2026",
    category: "Other",
    description: "Real-world IT support case studies, Troubleshooting, Network and OS configurations."
  },
  {
    id: "edx-intro-genai",
    title: "edX Verified Certificate for Introduction to Generative AI",
    issuer: "edX",
    date: "2026",
    category: "AI & ML",
    description: "Foundations of Generative AI, LLMs, Neural Networks, Ethical considerations."
  },
  {
    id: "azure-ml-experiment",
    title: "Experiment with Azure Machine Learning",
    issuer: "Microsoft",
    date: "2025",
    category: "AI & ML",
    description: "Azure Machine Learning workspace, Data engineering, Model training and deployment on Azure."
  },
  {
    id: "ai-for-startups",
    title: "AI for Startups",
    issuer: "Google",
    date: "2025",
    category: "AI & ML",
    description: "Leveraging Artificial Intelligence to scale startups, Product development, Growth strategies."
  },
  {
    id: "eyouth-data-analysis",
    title: "EYouth Business Honor Code Certificate for Data Analysis",
    issuer: "EYouth",
    date: "2025",
    category: "Business",
    description: "Data analysis pipelines, Data visualization, Business data decision making."
  },
  {
    id: "eyouth-data-analysis-awareness",
    title: "EYouth Business Honor Code Certificate for Data Analysis Awareness",
    issuer: "EYouth",
    date: "2025",
    category: "Business",
    description: "Data literacy, Analyzing business metrics, Structural data awareness."
  },
  {
    id: "eyouth-data-analysis-powerbi",
    title: "EYouth Business Honor Code Certificate for Data Analysis Using Power BI",
    issuer: "EYouth",
    date: "2025",
    category: "Business",
    description: "Interactive dashboard design, DAX formulas, Power BI reports."
  },
  {
    id: "eyouth-data-analysis-excel",
    title: "EYouth Business Honor Code Certificate for Data Analysis Using Excel",
    issuer: "EYouth",
    date: "2025",
    category: "Business",
    description: "Advanced Excel functions, Pivot tables, Data modeling, Business analysis formulas."
  },
  {
    id: "eyouth-bus-1",
    title: "EYouth Business",
    subtitle: "Business Administration Certificate",
    issuer: "EYouth",
    date: "2025",
    category: "Business",
    file: "certificate-eyouth-business.pdf"
  },
  {
    id: "eyouth-bus-2",
    title: "EYouth Business Level 2",
    issuer: "EYouth",
    date: "2025",
    category: "Business",
    file: "certificate-eyouth-business-2.pdf"
  },
  {
    id: "eyouth-bus-3",
    title: "EYouth Business Level 3",
    issuer: "EYouth",
    date: "2025",
    category: "Business",
    file: "certificate-eyouth-business-3.pdf"
  },
  {
    id: "eyouth-bus-4",
    title: "EYouth Business Level 4",
    issuer: "EYouth",
    date: "2025",
    category: "Business",
    file: "certificate-eyouth-business-4.pdf"
  },
  {
    id: "eyouth-bus-landscape",
    title: "EYouth Business Landscape",
    issuer: "EYouth",
    date: "2025",
    category: "Business",
    file: "certificate-eyouth-business-landscape.pdf"
  },
  {
    id: "course-cert-en",
    title: "Course Certificate (English)",
    issuer: "Educational Platform",
    date: "2025",
    category: "Other",
    file: "course-certificate-en.pdf"
  },
  {
    id: "course-cert-ar",
    title: "Training Course Certificate (Arabic)",
    issuer: "Educational Platform",
    date: "2025",
    category: "Other",
    file: "course-certificate-ar.pdf"
  }
];

const categories = ["All", "AI & ML", "Web Development", "Business", "Other"];

export const Certificates = () => {
  const shouldReduceMotion = useReducedMotion();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);

  const filteredCerts = useMemo(() => {
    return certificates.filter((c) => {
      const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.issuer.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || c.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <section id="certificates" className="relative py-28">
      <div className="container">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="section-eyebrow">Achievements</div>
            <h2 className="mt-4 font-display text-fluid-h2 font-bold text-foreground">Verified <span className="text-gradient">Credentials</span>.</h2>
            <p className="mt-4 text-editorial text-lg">
              Official certifications, degrees, and technical achievements.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input 
                type="text" 
                placeholder="Search certificates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-background/50 border border-foreground/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              />
            </div>
            
            <div className="flex bg-background/50 border border-foreground/10 rounded-full p-1 w-full sm:w-auto overflow-x-auto no-scrollbar">
              <div className="flex px-1 gap-1 items-center">
                <Filter size={14} className="text-muted-foreground mx-2 shrink-0" />
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      activeCategory === cat ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredCerts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground"
              >
                <Search size={48} className="opacity-20 mb-4" />
                <p>No certificates found matching your criteria.</p>
              </motion.div>
            ) : (
              filteredCerts.map((cert, i) => (
                <motion.div
                  layout
                  key={cert.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: (i % 6) * 0.08 }}
                  className="group relative glass rounded-3xl p-6 flex flex-col transition-all duration-300 transform-style-3d hover:-translate-y-1 hover:rotate-x-2 hover:rotate-y-[-1deg] hover:border-primary/40 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] motion-reduce:transform-none motion-reduce:hover:translate-y-0"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-violet/20 border border-primary/20 text-primary-glow shrink-0 group-hover:scale-110 group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)] transition-all duration-300">
                      <Award size={20} />
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setPreviewCert(cert)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-background/50 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
                        aria-label={`Preview ${cert.title}`}
                      >
                        <Eye size={14} />
                      </button>
                      {cert.file && (
                        <a 
                          href={`/${cert.file}`} 
                          download={cert.file}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-background/50 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
                          aria-label={`Download ${cert.title}`}
                        >
                          <Download size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="font-display font-bold text-xl tracking-tight mb-2 group-hover:text-primary transition-colors">{cert.title}</h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-foreground/5 border border-foreground/10 text-muted-foreground">
                      {cert.category}
                    </span>
                    {cert.credentialId && (
                      <span className="flex items-center gap-1 text-[10px] text-emerald-500/80 font-medium">
                        <ShieldCheck size={12} /> Verified
                      </span>
                    )}
                  </div>
                  
                  <p className="text-editorial text-[1.05rem] mb-6 flex-grow">{cert.description || cert.subtitle || "Official completion certificate."}</p>
                  
                  <div className="pt-4 border-t border-border/50 flex flex-wrap justify-between items-end gap-3 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-primary-glow font-medium">
                      <Link size={12} /> {cert.issuer}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Calendar size={12} /> {cert.date}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewCert && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewCert(null)}
              className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-auto md:left-1/2 md:-translate-x-1/2 z-50 w-full max-w-2xl glass-strong shadow-2xl rounded-3xl overflow-hidden border border-primary/20"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-6 border-b border-foreground/5 bg-foreground/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary-glow">
                    <Award size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg">{previewCert.title}</h3>
                    <div className="text-xs text-muted-foreground">{previewCert.issuer}</div>
                  </div>
                </div>
                <button 
                  onClick={() => setPreviewCert(null)}
                  className="p-2 rounded-full hover:bg-foreground/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body: Mock Document Viewer */}
              <div className="p-8 md:p-12 bg-black/40 flex items-center justify-center min-h-[300px] relative overflow-hidden group">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                
                <div className="relative glass p-8 rounded-xl border border-foreground/10 text-center max-w-md w-full shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary-glow mb-6">
                    <ShieldCheck size={32} />
                  </div>
                  <h4 className="font-display text-2xl font-bold mb-2">Certificate of Completion</h4>
                  <p className="text-editorial text-[1.05rem] mb-6">This certifies the successful completion of the requirements for</p>
                  <div className="font-bold text-lg text-primary-glow mb-6">{previewCert.title}</div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono text-muted-foreground border-t border-foreground/10 pt-6">
                    <div>
                      <span className="block opacity-50 mb-1">ISSUER</span>
                      {previewCert.issuer}
                    </div>
                    <div>
                      <span className="block opacity-50 mb-1">DATE</span>
                      {previewCert.date}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-foreground/[0.02] border-t border-foreground/5 flex justify-between items-center">
                <div className="text-xs font-mono text-muted-foreground">
                  {previewCert.credentialId ? `ID: ${previewCert.credentialId}` : "Standard Certificate"}
                </div>
                {previewCert.file && (
                  <a href={`/${previewCert.file}`} download className="btn-magnetic text-sm px-4 py-2">
                    Download Original <Download size={14} className="ml-2" />
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

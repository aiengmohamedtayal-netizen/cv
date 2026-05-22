import { motion } from "framer-motion";
import { Award, Download, Eye, Link } from "lucide-react";

type Certificate = {
  title: string;
  subtitle?: string;
  description?: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  file?: string;
  skills?: string;
};

const certificates: Certificate[] = [
  {
    title: "Vibe Coding — L1 Bronze",
    issuer: "Lovable",
    date: "May 2026",
    skills: "Vibe Coding, AI-assisted development, Claude workflows"
  },
  {
    title: "Claude 101",
    issuer: "Anthropic",
    date: "April 2026",
    credentialId: "8h47q7gj7drw",
    skills: "Claude AI, Prompt Engineering, Vibe Coding"
  },
  {
    title: "Python & TensorFlow: Deep Dive into Machine Learning",
    issuer: "Udemy",
    date: "February 2026",
    credentialId: "UC-0e702352-da55-4fbc-9ff7-a55c88d4dd3f",
    description: "Advanced ML training: Neural Networks, Deep Learning, Model Training & Evaluation, TensorFlow Implementation, Real-world workflows."
  },
  {
    title: "Python Complete Course For Beginners",
    issuer: "Udemy",
    date: "February 2026",
    credentialId: "UC-701fba4c-7924-4176-9905-f7f0c775cd11",
    description: "Intensive training covering: Python fundamentals, OOP, Structured problem solving, Backend development foundations."
  },
  {
    title: "Python & Django Learning Course",
    issuer: "Udemy",
    date: "February 2026",
    description: "Backend development, Web application architecture, Database integration, Dynamic web applications using Django."
  },
  {
    title: "Verizon Skill Forward Orientation Course",
    issuer: "edX",
    date: "February 2026",
    credentialId: "2176429785744d0bb85833259a01eb27"
  },
  {
    title: "AI Automation Kickstart",
    issuer: "Udemy",
    date: "February 2026",
    credentialId: "97ae3180-d4d4-4499-88eb-aad7cbd9db2f",
    description: "Focused on AI workflow automation, Intelligent systems, Process optimization, and Automation concepts."
  },
  {
    title: "Essential Soft Skills for Creative Professionals",
    issuer: "LinkedIn Learning",
    date: "January 2026"
  },
  {
    title: "Back-End Web Development with .NET",
    issuer: "Microsoft",
    date: "January 2026",
    description: ".NET backend development, APIs, Server-side application development."
  },
  {
    title: "Introduction to Sorting Algorithms",
    issuer: "SkillUp by Simplilearn",
    date: "November 2025",
    credentialId: "9323087",
    description: "Sorting algorithms, Computational thinking, Data structures fundamentals."
  },
  { 
    title: "EYouth Business", 
    subtitle: "Business Administration Certificate", 
    issuer: "EYouth", 
    file: "certificate-eyouth-business.pdf" 
  },
  { 
    title: "EYouth Business Level 2", 
    subtitle: "Business Administration - Level 2", 
    issuer: "EYouth", 
    file: "certificate-eyouth-business-2.pdf" 
  },
  { 
    title: "EYouth Business Level 3", 
    subtitle: "Business Administration - Level 3", 
    issuer: "EYouth", 
    file: "certificate-eyouth-business-3.pdf" 
  },
  { 
    title: "EYouth Business Level 4", 
    subtitle: "Business Administration - Level 4", 
    issuer: "EYouth", 
    file: "certificate-eyouth-business-4.pdf" 
  },
  { 
    title: "EYouth Business Landscape", 
    subtitle: "Business Certificate", 
    issuer: "EYouth", 
    file: "certificate-eyouth-business-landscape.pdf" 
  },
  { 
    title: "Course Certificate (English)", 
    subtitle: "Course Completion Certificate - English", 
    issuer: "Educational Platform", 
    file: "course-certificate-en.pdf" 
  },
  { 
    title: "Training Course Certificate (Arabic)", 
    subtitle: "Course Completion Certificate - Arabic", 
    issuer: "Educational Platform", 
    file: "course-certificate-ar.pdf" 
  }
];

const getAssetUrl = (filename: string) => {
  return `/${filename}`;
};

export const Certificates = () => (
  <section id="certificates" className="relative py-28">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto">
        <div className="section-eyebrow">Achievements</div>
        <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold">Official <span className="text-gradient">Certificates</span>.</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">All my certificates are available on LinkedIn — visit my profile to view them.</p>
      </div>
      
      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.title + i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.08, duration: 0.6 }}
            className="group relative glass rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300 flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary-glow shrink-0">
                <Award size={20} />
              </div>
              {cert.file && (
                <div className="flex gap-2">
                  <a 
                    href={getAssetUrl(cert.file)} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-background/50 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors"
                    aria-label="Preview"
                  >
                    <Eye size={14} />
                  </a>
                  <a 
                    href={getAssetUrl(cert.file)} 
                    download={cert.file}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-background/50 border border-border/50 text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors"
                    aria-label="Download"
                  >
                    <Download size={14} />
                  </a>
                </div>
              )}
            </div>
            
            <h3 className="font-display font-semibold text-lg mb-1">{cert.title}</h3>
            
            {cert.subtitle && (
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 h-10">{cert.subtitle}</p>
            )}
            
            {cert.description && (
              <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
            )}
            
            {cert.skills && (
              <p className="text-xs text-muted-foreground mb-3"><span className="text-foreground/80 font-medium">Skills:</span> {cert.skills}</p>
            )}
            
            <div className="mt-auto pt-4 border-t border-border/50 flex flex-wrap justify-between items-end gap-2">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono text-primary-glow">
                  <Link size={12} /> {cert.issuer}
                </div>
                {cert.credentialId && (
                  <div className="text-[10px] text-muted-foreground/60 break-all max-w-[180px]">
                    ID: {cert.credentialId}
                  </div>
                )}
              </div>
              
              {cert.date && (
                <div className="text-xs font-medium text-muted-foreground">
                  {cert.date}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

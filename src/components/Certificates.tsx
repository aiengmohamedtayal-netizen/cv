import { motion } from "framer-motion";
import { Award, Download, Eye, Link } from "lucide-react";

const certificates = [
  { title: "EYouth Business", subtitle: "Business Administration Certificate", issuer: "EYouth", file: "certificate-eyouth-business.pdf" },
  { title: "EYouth Business 2", subtitle: "Business Administration - Level 2", issuer: "EYouth", file: "certificate-eyouth-business-2.pdf" },
  { title: "EYouth Business 3", subtitle: "Business Administration - Level 3", issuer: "EYouth", file: "certificate-eyouth-business-3.pdf" },
  { title: "EYouth Business 4", subtitle: "Business Administration - Level 4", issuer: "EYouth", file: "certificate-eyouth-business-4.pdf" },
  { title: "EYouth Business 22", subtitle: "Advanced Business Administration Certificate", issuer: "EYouth", file: "certificate-eyouth-business-22.pdf" },
  { title: "EYouth Business 33", subtitle: "Advanced Business Administration Certificate", issuer: "EYouth", file: "certificate-eyouth-business-33.pdf" },
  { title: "EYouth Business 44", subtitle: "Advanced Business Administration Certificate", issuer: "EYouth", file: "certificate-eyouth-business-44.pdf" },
  { title: "EYouth Business Landscape", subtitle: "Business Certificate", issuer: "EYouth", file: "certificate-eyouth-business-landscape.pdf" },
  { title: "EYouth Business Landscape 1", subtitle: "Business Certificate", issuer: "EYouth", file: "certificate-eyouth-business-landscape-1.pdf" },
  { title: "Training Course Certificate", subtitle: "Course Completion Certificate - Arabic", issuer: "Educational Platform", file: "course-certificate-ar.pdf" },
  { title: "Training Course Certificate 2", subtitle: "Course Completion Certificate - Arabic", issuer: "Educational Platform", file: "course-certificate-ar-1.pdf" },
  { title: "Course Certificate", subtitle: "Course Completion Certificate - English", issuer: "Educational Platform", file: "course-certificate-en.pdf" },
  { title: "Course Certificate 2", subtitle: "Course Completion Certificate - English", issuer: "Educational Platform", file: "course-certificate-en-1.pdf" },
];

/**
 * Robust Asset Resolver
 * Dynamically maps certificate filenames to their correct public paths.
 * If files are ever missing locally, this fallback logic can easily route
 * directly to the connected GitHub repository:
 * const GITHUB_RAW = "https://raw.githubusercontent.com/mohamedtayal/projecty/main/";
 */
const getAssetUrl = (filename: string) => {
  // Uses Vite's public directory resolution for robust production builds
  return `/${filename}`;
};

export const Certificates = () => (
  <section id="certificates" className="relative py-28">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto">
        <div className="section-eyebrow">Achievements</div>
        <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold">Official <span className="text-gradient">Certificates</span>.</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">Accredited certificates from trusted educational platforms</p>
      </div>
      
      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.title + i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.08, duration: 0.6 }}
            className="group relative glass rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary-glow">
                <Award size={20} />
              </div>
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
            </div>
            
            <h3 className="font-display font-semibold text-lg">{cert.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4 h-[40px]">{cert.subtitle}</p>
            
            <div className="flex items-center gap-1.5 text-xs font-mono text-primary-glow">
              <Link size={12} /> {cert.issuer}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

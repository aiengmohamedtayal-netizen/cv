import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '../public');
const BASE_URL = 'https://raw.githubusercontent.com/mohamedtayal/projecty/main/';

const files = [
  'certificate-eyouth-business.pdf',
  'certificate-eyouth-business-2.pdf',
  'certificate-eyouth-business-3.pdf',
  'certificate-eyouth-business-4.pdf',
  'certificate-eyouth-business-22.pdf',
  'certificate-eyouth-business-33.pdf',
  'certificate-eyouth-business-44.pdf',
  'certificate-eyouth-business-landscape.pdf',
  'certificate-eyouth-business-landscape-1.pdf',
  'course-certificate-ar.pdf',
  'course-certificate-ar-1.pdf',
  'course-certificate-en.pdf',
  'course-certificate-en-1.pdf',
];

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

async function downloadFile(filename) {
  const url = BASE_URL + filename;
  const dest = path.join(PUBLIC_DIR, filename);

  if (fs.existsSync(dest)) {
    console.log(`[SKIP] ${filename} already exists.`);
    return;
  }

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error(`[ERROR] Failed to download ${filename}: HTTP ${res.statusCode}`);
        return resolve();
      }

      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`[SUCCESS] Downloaded: ${filename}`);
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlinkSync(dest);
        console.error(`[ERROR] File error on ${filename}:`, err.message);
        reject(err);
      });
    }).on('error', (err) => {
      console.error(`[ERROR] Network error on ${filename}:`, err.message);
      reject(err);
    });
  });
}

async function run() {
  console.log('Starting Asset Migration...');
  for (const file of files) {
    await downloadFile(file);
  }
  console.log('Migration Complete.');
}

run();

import fs from "fs";
import path from "path";

/** Garantir diretório */
export function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

/** Copiar arquivo */
export function copyFileSync(src, dest) {
  ensureDirSync(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

/** Copiar diretório inteiro */
export function copyDirSync(srcDir, destDir) {
  ensureDirSync(destDir);

  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

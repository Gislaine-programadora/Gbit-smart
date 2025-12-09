import fs from 'fs';
import path from 'path';


export function loadConfig(projectDir = process.cwd()) {
const cfgDir = path.join(projectDir, 'smartlayer');
if (!fs.existsSync(cfgDir)) return null;
const files = fs.readdirSync(cfgDir).filter(f => f.endsWith('.json'));
return files.map(f => {
const full = path.join(cfgDir, f);
return {
name: f,
path: full,
content: JSON.parse(fs.readFileSync(full, 'utf8'))
};
});
}
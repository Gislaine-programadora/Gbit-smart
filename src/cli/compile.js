import { compile } from '../core/compiler.js';


export default async function compileCmd() {
try {
const res = await compile(process.cwd());
console.log('Compilado com motor:', res.engine);
} catch (err) {
console.error('Erro ao compilar:', err.message || err);
}
}
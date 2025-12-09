import chalk from 'chalk';
import ora from 'ora';


export const log = {
info: (msg) => console.log(chalk.cyan(msg)),
success: (msg) => console.log(chalk.green(msg)),
warn: (msg) => console.log(chalk.keyword('orange')(msg)),
error: (msg) => console.error(chalk.redBright(msg)),
spinner: (text) => ora(text)
};
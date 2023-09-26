import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
    ${chalk.blue('Программа для подготовки данных для REST API сервера.')}
    ${chalk.yellow('Пример:')}
    ${chalk.white('cli.js --<command> [--arguments]')}
    ${chalk.yellow('Команды:')}
        ${chalk.white.bold.underline('--version:')}                     ${chalk.cyan('# выводит номер версии')}
        ${chalk.white.bold.underline('--help:')}                        ${chalk.cyan('# печатает этот текст')}
        ${chalk.white.bold.underline('--import <path>:')}               ${chalk.cyan('# импортирует данные из TSV')}
        ${chalk.white.bold.underline('--generate <n> <path> <url>:')}   ${chalk.cyan('# генерирует произвольное количество тестовых данных')}
    `);
  }
}

import fs from 'fs';
import { Command } from 'commander';

const program = new Command();

program
  .name('nbu-cli')
  .description('CLI для аналізу даних НБУ (Лабораторна робота №3)')
  .version('1.0.0');


program
  .option('-p, --path <path>', 'шлях до файлу даних JSON');

program.parse(process.argv);
const options = program.opts();


if (!options.path) {
  console.error("Помилка: не вказано шлях до файлу. Використовуйте опцію -p або --path.");
  process.exit(1);
}


let rawData;
try {
  rawData = fs.readFileSync(options.path, 'utf-8');
} catch (error) {
  console.error(`Помилка: не вдалося прочитати файл за шляхом "${options.path}".`);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(rawData);
} catch (error) {
  console.error("Помилка: файл містить некоректний JSON формат.");
  process.exit(1);
}


console.log(` АНАЛІЗ ДАНИХ НБУ (КРЕДИТИ) `);
console.log(`Загальна кількість записів у файлі: ${Array.isArray(data) ? data.length : 'Не масив'}`);

if (Array.isArray(data) && data.length > 0) {
  console.log(`Дата запису: ${data[0].dt || 'Не вказано'}`);
  console.log(`Приклад опису: ${data[0].txt || 'Не вказано'}`);
}
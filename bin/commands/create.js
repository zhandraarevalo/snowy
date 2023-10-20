const fs = require('fs');
const path = require('path');
const { toCamelCase } = require('js-convert-case');

function createTable(name) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  let fileDate = `${year}`;
  fileDate += `${month < 10 ? '0' : ''}${month}`;
  fileDate += `${day < 10 ? '0' : ''}${day}`;
  fileDate += `${hours < 10 ? '0' : ''}${hours}`;
  fileDate += `${minutes < 10 ? '0' : ''}${minutes}`;
  fileDate += `${seconds < 10 ? '0' : ''}${seconds}`;
  
  const fileName = `${fileDate}-create-${toCamelCase(name)}.js`;
  const filePath = path.join(__dirname, '../..', 'src/migrations', fileName);

  const baseQuery = `
    create table ${toCamelCase(name)} (
      created_at datetime not null default current_timestamp,
      updated_at datetime not null default current_timestamp on update current_timestamp,
      deleted_at datetime,
      id int not null auto_increment,
      primary key (id)
    );
  `;
  const data = `module.exports = \`${baseQuery}\`;`;
  fs.writeFileSync(filePath, data)
}

module.exports = createTable;

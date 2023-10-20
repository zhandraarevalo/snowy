const fs = require('fs');
const path = require('path');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

async function createNewProject(opts) {
  const appFolderName = opts.app_name;
  const appFolderPath = path.join(__dirname, '../../..', appFolderName);
  console.log(appFolderPath);

  try {
    // if already exists a folder with the given name in the current location, throw error
    if (fs.existsSync(appFolderPath)) {
      throw new Error('Folder already exists, try with another name for the folder');
    }

    const templateFolder = path.join(__dirname, '../templates');
    const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../templates/utils', 'snowy.json'), { encoding: 'utf-8' }));

    // copy base template into new app folder
    let dependencies = `cp -r ${templateFolder}/base ${appFolderPath}`;
    dependencies += ` && cd ${appFolderName}`;
    dependencies += ' && touch README.md';
    dependencies += ' && npm init -y';

    // install required dependencies if set
    if (opts.install) {
      dependencies += ' && npm i';
      dependencies += ' && npm i express dotenv joi';
      dependencies += ' && npm i -D nodemon';
    }

    // initialize git
    dependencies += ` && git init`;

    // execute main commands
    await exec(dependencies);
    
    if (opts.database) {
      config.enabledComponents.database = true;
      fs.mkdirSync(`${appFolderPath}/src/migrations`);
      await exec(`cp ${templateFolder}/utils/.gitkeep ${appFolderPath}/src/migrations`);
    }

    fs.writeFileSync(`${appFolderPath}/snowy.json`, JSON.stringify(config, null, 2));
  } catch (err) {
    console.error('Error >', err.message);
  }
}

module.exports = createNewProject;

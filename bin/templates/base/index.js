require('dotenv').config();

const fs = require('fs');

var express = require('express');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'snowy.json'), { encoding: 'utf-8' }));

const app = express();
app.listen(config.system.port, async () => {
  console.log(`>> server running in port ${config.system.port}...\n`);
});
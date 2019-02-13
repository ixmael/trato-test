require('module-alias/register');
require('dotenv').config();

const fs = require('fs');
const slugify = require('slugify')
const mustache = require('mustache');

const database = require('@services/database');

const schema = {};

database.query(`SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE, COLUMN_KEY, COLUMN_DEFAULT FROM information_schema.columns WHERE table_schema="${process.env.MYSQL_DB_NAME}" AND TABLE_NAME IN (SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_TYPE="BASE TABLE" AND TABLE_SCHEMA="${process.env.MYSQL_DB_NAME}") ORDER BY TABLE_NAME;`, (error, results, fields) => {
  results.forEach(r => {
    if (!(r.TABLE_NAME in schema)) {
      schema[r.TABLE_NAME] = {
        idField: [],
        fields: [],
      };
    }

    if (r.COLUMN_KEY === 'PRI') {
      schema[r.TABLE_NAME]['idField'].push(r.COLUMN_NAME);
    }
    else {
      schema[r.TABLE_NAME]['fields'].push(r.COLUMN_NAME);
    }
  });

  //console.log("SCHEMA", schema);

  const template = fs.readFileSync('./scripts/resourceTemplate.txt', 'utf8');
  const indexTemplate = fs.readFileSync('./scripts/index.txt', 'utf8');
  mustache.parse(template);
  mustache.parse(indexTemplate);

  const index = [];

  Object.keys(schema).forEach(k => {
    if (schema[k]['idField'].length > 1) {
      return;
    }

    const fields = schema[k]['fields'].map(f => `'${f}'`);

    const t = slugify(k, '_');
    const r = mustache.render(template, {
      table: t,
      idField: schema[k]['idField'][0],
      fields: fields.join(","),
    });
    index.push(t);

    fs.writeFile(`./src/api/${t}.js`, r, function(err) {
      if(err) {
          return console.log(err);
      }
    });
  });

  const i = mustache.render(indexTemplate, {
    requires: index.map(r => `routes.use('/${r}', require('./${r}'));`).join('\n'),
    resources: index.map(r => `'${r}'`).join(',')
  });

  fs.writeFile(`./src/api/index.js`, i, function(err) {
    if(err) {
        return console.log(err);
    }
  });
})

database.end();

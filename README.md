# Node Panda Scheduler

## Running tests
Steps:
  * `npm install`
  * `cp local.knexfile.js.exampe local.knexfile.js`
  * Setup desired DB in `local.knexfile.js`
  * Create the DB you just configured locally
  * Run migrations for the test setup once: `NODE_ENV=testing ./node_modules/.bin/knex migrate:latest` (additional migrations will be run automatically, repeat this step when you destroy the DB)
  * `npm run test && npm run test:server`

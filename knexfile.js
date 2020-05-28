/*************************************************************************************************************************************************************************
 * Heroku postgresql adds on
 * USER: xcxxhjcqwpnwju
 * PASSWORD: 85771a2ea2784b03771abef02f049f0b2e26958a1628320b834fd4e4cabf7fd5
 * HOST: ec2-35-174-127-63.compute-1.amazonaws.com
 * PORT: 5432
 * DATABASE: d7eog5f935ceei
 * HEROKU URL: postgres://xcxxhjcqwpnwju:85771a2ea2784b03771abef02f049f0b2e26958a1628320b834fd4e4cabf7fd5@ec2-35-174-127-63.compute-1.amazonaws.com:5432/d7eog5f935ceei
 ************************************************************************************************************************************************************************/
// Update with your config settings.
module.exports = {  
  client: 'postgresql',
  connection: {
    database: 'd7eog5f935ceei',
    user:     'xcxxhjcqwpnwju',
    password: '85771a2ea2784b03771abef02f049f0b2e26958a1628320b834fd4e4cabf7fd5'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

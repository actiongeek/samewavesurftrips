import dotenv from 'dotenv'
import forky from 'forky';

dotenv.config();
console.log(process.env.DB_PASS,'xxx');

const WORKERS = process.env.WEB_CONCURRENCY || 1;
console.log(`Cluster is running ${WORKERS} instances per dyno\n---------------------------------------------------`);

/* 
|--------------------------------------------------------------------------
| master cluster process
|--------------------------------------------------------------------------
*/
forky({workers:WORKERS, path: __dirname + '/worker.js'});


const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();
const redisClient = redis.createClient({
    host: 'redis-server', //Docker will resolve the hostname automatically for us since we have defined it in docker-compose.yml
    port: 6379 //The default port of redis server
});
redisClient.set('visits', 0);

app.get('/', (req, res) => {
    // process.exit(0); Enable this to check and verify the restart policy of the container
    redisClient.get('visits', (err, visits) => {
        res.send('Number of visits is ' + visits);
        redisClient.set('visits', parseInt(visits) + 1);
    })
})

app.listen(8081, () => {
    console.log('Listening on port 8081');
})


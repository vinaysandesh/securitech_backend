const app = require('./app');
const config = require('./config/config');
console.log('server')
app.listen(3001, () => {
  console.log(`Server running on port ${3001}`);
});
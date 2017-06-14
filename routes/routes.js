const express = require('express')
const router = express.Router();

// api stuff
// router.get('/api/test', (req, res) => {
//   res.send('Hey! It works!');
// });
router.get('/api/reverse/:first', (req, res) => {
  const reverse = req.params.first.split('').reverse().join('')
  // req.params.name
  res.send(reverse)
})

//let react handle rest
router.get('*', (req, res) => {
  res.sendFile(`${process.cwd()}/dist/index.html`);
});

module.exports = router;

var express = require('express');
var router = express.Router();

var {OpenAI} = require('openai')

const openai = new OpenAI({ 
  baseURL: 'https://api.xty.app/v1', 
  apiKey: 'sk-bKqwNSitQgF2RwJA6d12B72471814eA6950f8c550b396b5c'
})

async function chatWithAI(pictureName) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: `请用一句话介绍${pictureName}` }],
    model: "gpt-3.5-turbo"
  }) 
  return completion.choices[0].message.content
}



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/AACProgram', (request, response, next) => {
  response.render('AACProgram')
})

router.get('/chatWithAI/:id', async (request, response, next) => {
  res = await chatWithAI(request.params.id)
  response.end(res)
})

module.exports = router;

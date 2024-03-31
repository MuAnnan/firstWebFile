function speakOne(text) {
  console.log(text)
	if (!window.SpeechSynthesisUtterance) {
    console.warn('当前浏览器不支持文字转语音服务')
    return
  }

  if (!text) {
    return
  }

  const speechUtterance = new SpeechSynthesisUtterance();
  speechUtterance.text = text
  speechUtterance.rate = 1
  speechUtterance.lang = 'zh-CN'
  speechUtterance.volume = 1
  speechUtterance.pitch = 1
  speechSynthesis.speak(speechUtterance)
  
  return speechUtterance
}

async function speak(text) {
    speakOne(text)
    setTimeout(function(){speakOne(text)}, 2000)
    setTimeout(function(){speakOne(text)}, 4000)
    if(text!="害怕" && text!="生气" && text!="无聊" && text!="开心" && text!="饿了" && text!="伤心" && text!="生病了" && text!="渴了" && text!="累了" && text!="以返回" && text!="心情"){
        const response = await fetch('/chatWithAI/' + text)
        const responseText = await response.text()
        setTimeout(function(){speakOne(responseText)}, 2000)
    }
}



messages = [
  {role: "system", content: "你被装载在了AAC APP上，自闭症儿童通过图片交换系统与你对话，图片交换系统的图片分类有心情、水果、蔬菜、动物和身体部位，自闭症只能通过点击这些图片进行交流，你可以引导儿童点击这些图片，不要问图片没有的东西"},
  {role: "user", content: "现在AAC APP请求你随意开始一个话题"}
]

async function chatinit() {
  const response = await fetch('/chatWithChatGPT', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "messages": messages
    })
  })
  const responseText = await response.text()
  speakOne(responseText)
  messages.push({role: "assistant", content: responseText})
} 

async function chat(text) {
  speakOne(text)
  messages.push({role: "user", content: text})

  const response = await fetch('/chatWithChatGPT', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "messages": messages
    })
  })
  const responseText = await response.text()
  speakOne(responseText)
  messages.push({role: "assistant", content: responseText})
}


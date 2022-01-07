const colors = ['frogideas', 'sugarsweets', 'heatwave', 'daisygarden', 'seascape', 'summerwarmth', 'bythepool', 'duskfalling', 'berrypie', ]

function normalizeUser({username, displayName, email}) {
  const avatar = `https://www.tinygraphs.com/squares/${username}?theme=${colors[Math.floor(Math.random()*colors.length)]}&numcolors=4&size=512&fmt=svg`
  return {
    username,
    displayName,
    email,
    avatar: {
      small: avatar,
      medium: avatar,
      large: avatar
    }
  }
}

module.exports = normalizeUser

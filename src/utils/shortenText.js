export default function shortenText(text) {
  const spiltText = text.split(' ')
  if (spiltText.length > 20) {
    const cutText = spiltText.slice(0, 20)
    cutText.push('. . .')
    return cutText.join(' ')
  }

  return spiltText.join(' ')
}

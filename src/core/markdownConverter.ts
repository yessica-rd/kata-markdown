export const markdownConverter = (markdownText: string) => {
  const anchorsRegex = /\[(.*?)\]\((.*?)\)/g;
  const numberOfReferences = (markdownText.match(anchorsRegex) || []).length;
  
  if(!numberOfReferences) {
    return markdownText
  }
  let markdownTextMatch = anchorsRegex.exec(markdownText);
  let newText = markdownText;
  let anchorCounter = 1;
  const result = [];
  const footerAnchors = [];

  while (markdownTextMatch != null) {
    const linkText = markdownTextMatch[1];
    const anchorUrl = markdownTextMatch[2];

    const startIndex = newText.indexOf(markdownTextMatch[0]);
    const endIndex = startIndex + markdownTextMatch[0].length;
    const anchorName = `[^anchor${anchorCounter}]`;
    const anchorFooterUrl = `${anchorName}: ${anchorUrl}`;
    const isLastAnchor = anchorCounter === numberOfReferences;
    const newTextLink = `${linkText} ${anchorName}${isLastAnchor ? '' : ' '}`;
    
    const markdownTextBeforeLink = newText.slice(0, startIndex);
    if(markdownTextBeforeLink) {
      result.push(markdownTextBeforeLink)
    }
    result.push(newTextLink)
    if(isLastAnchor) {
      const markdownTextAfterLink = newText.slice(endIndex)
      result.push(markdownTextAfterLink);
    }
    newText = newText.substring(endIndex)
    footerAnchors.push(anchorFooterUrl);
    anchorCounter ++;

    markdownTextMatch = anchorsRegex.exec(markdownText);
  }
  return `${result.join('')}\n\n${footerAnchors.join('\n\n')}`;
}

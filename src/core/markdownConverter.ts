export const markdownConverter = (markdownText: string) => {
  const anchorsRegex = /\[(.*?)\]\((.*?)\)/;
  const markdownTextMatch = anchorsRegex.exec(markdownText);
  
  if(markdownTextMatch) {
    const linkText = `${markdownTextMatch[1]} [^anchor1]`;
    const footer = `\n\n[^anchor1]: ${markdownTextMatch[2]}`;
    const markdownTextBeforeLink = markdownText.substring(0, markdownTextMatch.index);
    const markdownTextAfterLink = markdownText.substring(markdownTextMatch.index + markdownTextMatch[0].length);

    if(markdownTextBeforeLink && markdownTextAfterLink) {
      return `${markdownTextBeforeLink}${linkText}${markdownTextAfterLink}${footer}`;
    }
    if(markdownTextBeforeLink) {
      return `${markdownTextBeforeLink}${linkText}${footer}`;
    }
    if(markdownTextAfterLink) {
      return `${linkText}${markdownTextAfterLink}${footer}`;
    }
    return `${linkText}${footer}`;
  }
  return markdownText;
}
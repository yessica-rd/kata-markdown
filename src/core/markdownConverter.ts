export const markdownConverter = (markdownText: string) => {
  const anchorsRegex = /\[(.*?)\]\((.*?)\)/;
  const markdownTextMatch = anchorsRegex.exec(markdownText);
  
  if(markdownTextMatch) {
    const linkText = `${markdownTextMatch[1]} [^anchor1]`;
    const footer = `\n\n[^anchor1]: ${markdownTextMatch[2]}`;
    const markdownTextBeforeLink = markdownText.substring(0, markdownTextMatch.index);

    if(markdownTextBeforeLink) {
      return `${markdownTextBeforeLink}${linkText}${footer}`;
    }
    return `${linkText}${footer}`;
  }
  return markdownText;
}
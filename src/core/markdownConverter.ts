export const markdownConverter = (markdownText: string) => {
  const anchorsRegex = /\[(.*?)\]\((.*?)\)/;
  const markdownTextMatch = anchorsRegex.exec(markdownText);
  
  if(markdownTextMatch) {
    const linkText = `${markdownTextMatch[1]} [^anchor1]`;
    const footer = `\n\n[^anchor1]: ${markdownTextMatch[2]}`;
    return `${linkText}${footer}`;
  }
  return markdownText;
}
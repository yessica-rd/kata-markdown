import {markdownConverter} from '../core/markdownConverter';

// [x] - '' -> ''
// [x] - 'Random text' -> 'Random text'
// [x] - '[Google](https://www.google.es)' -> 'Google [^anchor1]\n\n[^anchor1]: https://www.google.es'
// [] - 'Random text before [Google](https://www.google.es)' -> 'Random text before Google [^anchor1]\n\n[^anchor1]: https://www.google.es'
// [] - '[Google](https://www.google.es) random text after' -> 'Google [^anchor1] random text after\n\n[^anchor1]: https://www.google.es'
// [] - 'texto random before [Google](https://www.google.es) texto random after' -> 'texto random Google [^anchor1] texto random\n\n[^anchor1]: https://www.google.es'
// [] - '[Google](https://www.google.es)[Github](https://github.com)' -> 'Google [^anchor1] Github [^anchor2]\n\n[^anchor1]: https://www.google.es\n\n[^anchor2]: https://github.com'
// [] - '[Google](https://www.google.es), [Github](https://github.com)', 'Google [^anchor1], Github [^anchor2]\n\n[^anchor1]: https://www.google.es\n\n[^anchor2]: https://github.com']
describe('Markdown converter kata', () => {
  it('empty text is allowed', () => {
    expect(markdownConverter('')).toBe('');
  });
  it('regular text is allowed', () => {
    expect(markdownConverter('Random text')).toBe('Random text');
  });
  it('provided link creates anchor and footer', () => {
    const givenText = '[Google](https://www.google.es)';
    const expectedText = 'Google [^anchor1]\n\n[^anchor1]: https://www.google.es'
    expect(markdownConverter(givenText)).toBe(expectedText);
  });
  it('provided link after text string creates anchor and footer after', () => {
    const givenText = 'Random text before [Google](https://www.google.es)';
    const expectedText = 'Random text before Google [^anchor1]\n\n[^anchor1]: https://www.google.es'
    expect(markdownConverter(givenText)).toBe(expectedText)
  });
});

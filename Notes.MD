FrameLocator  - этого не знал
All locators in Playwright by default work with elements in Shadow DOM - этого не знал
Filter by child/descendant - этого не знал
Matching one of the two alternative locators - этого не знал
Get by nth item - этого не знал
Chaining filters - этого не знал
You can explicitly opt-out from strictness check by telling Playwright which element to use when multiple elements match, through locator.first(), locator.last(), and locator.nth(). These methods are not recommended because when your page changes, Playwright may click on an element you did not intend. Instead, follow best practices above to create a locator that uniquely identifies the target element. - это я знал
Playwright includes auto-retrying assertions that remove flakiness by waiting until the condition is met, similarly to auto-waiting before actions. - вот этого не знал, в C# всегда нужно было писать свой кастомный вейтер в базовом классе - иначе постоянно не работало и вылетало
Use codegen to generate locators - вот этого не знал

*****Error log******
Instructions
Following Playwright test failed.
Explain why, be concise, respect Playwright best practices.
Provide a snippet of code with the fix, if possible.
Test info
Name: strict-mode.spec.ts >> Strict mode exploration >> strict mode violation - intentional
Location: tests/strict-mode.spec.ts:13:9
3 failed
    [chromium] › tests/strict-mode.spec.ts:13:9 › Strict mode exploration › strict mode violation - intentional 
    [firefox] › tests/strict-mode.spec.ts:13:9 › Strict mode exploration › strict mode violation - intentional 
    [webkit] › tests/strict-mode.spec.ts:13:9 › Strict mode exploration › strict mode violation - intentional 

В TypeScript var x: 'value' — это type annotation с literal type, переменная остаётся undefined. Для присваивания нужно const x = 'value'. Это ловушка для людей с C# / Java бэкграундом, где : встречается реже как разделитель типа.

## Невидимые символы из кириллической раскладки
Кириллические «а», «с», «е», «о», «р», «х» визуально идентичны латинским
a, c, e, o, p, x но имеют разные Unicode коды.
Эти символы могут попасть в код при переключении раскладок и сделать
локатор невалидным — поведение: timeout вместо очевидной ошибки.

Debugging trick: если локатор «явно правильный» но не работает —
скопируй строку в hex-viewer или в консоли браузера в `unescape(...)`,
или просто перенабери на английской раскладке.


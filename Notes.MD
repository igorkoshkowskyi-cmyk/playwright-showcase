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

Запиши:


## button vs link — визуально кнопка ≠ HTML <button>
В browser-based UI элементы могут выглядеть как кнопки но быть <a> ссылками.
Всегда проверять в DevTools какой тег и какой role.
- <button> → getByRole('button')
- <a href> → getByRole('link')
- На saucedemo все пункты burger menu (Logout, All Items, About) — это <a>.

Senior takeaway: на собесе если спрашивают «как тестировать кнопку» —
уточни «в HTML это <button> или <a> styled как кнопка?». Это показывает
понимание разницы visual ≠ semantic.

fixture scope (test, worker) - тест - это настройки для индивидуального теста - а воркер - это настройки для воркера который может гонять кучу тестов

test.extend() - нужен для того чтобы добавлять в тест фикстуры

POM bad - когда проекты довольно маленькие и легкие, но за счет POM добавляется излишняя сложность

«POM isn't about clean code aesthetics — it's about the cost curve. Without POM, maintenance cost scales linearly with the number of tests touching a UI element. With POM, it's constant. On a 500-test suite, that's the difference between a quick PR and a week-long refactor every time UI changes.»


Гибрид (то что обычно делают на практике)
Самое частое в реальных кодбейзах:

Локаторы для actions (input fields, buttons, что используется только в методах) → private
Локаторы которые тесту нужны для assertions (errorMessage, cartBadge, productPrice) → public readonly
Действия → async методы класса
Сложные queries (например getProductPrices()) → query-методы возвращающие данные
Это даёт разумный баланс: encapsulation там где важно, удобство там где осмысленно.

## ESLint: no-floating-promises
Любая async функция вызванная без await — ошибка компиляции.
Catches one of the most common bugs в TS async коде.
В Playwright особенно критично — POM методы async, забыть await = race condition.
@typescript-eslint/no-floating-promises правило.

## Когда CSS-селектор оправдан
- DOM не имеет semantic role/role-name для контейнера (legacy code)
- Нужен scoping которого нельзя получить через role/text
- Test ID можно было бы попросить добавить (data-test=...), но в нашем control'е нет
- Никогда — для elements с есть getByRole/getByLabel/getByText альтернативы

## API design: specific vs generic methods
Когда есть tension между read-easy именованием и слабым coupling'ом —
не выбирай одно, дай оба варианта:
- xxxByName(name)  → coupling намеренный, тест про specifics
- xxxByIndex(index)  → тесту всё равно, нужна гибкость

Это:
1. Самодокументирующий — тест явно показывает интенцию
2. Refactor-safe — переименовали товар, упадут только тесты по имени
3. Single Responsibility — каждый метод имеет одну ответственность

Запиши:


## POM и assertions — нюансированное правило
Не "POM никогда не ассертит", а:
- ❌ POM НЕ должен ассертить бизнес-исходы (counter после add, success после login)
  → это интенция теста, должна жить в тесте
- ✅ POM МОЖЕТ ассертить readiness/loading (expectLoaded, waitForReady)
  → это часть абстракции страницы, тесты не должны её знать
  → решает DRY проблему когда каждый тест начинается с одного и того же check

Naming: 
- expectXxx() / assertXxx() — методы, бросающие на assertion fail
- isXxx() / getXxx() — query-методы, возвращающие данные
- doXxx() / xxxAction() — actions без assert (если нужно подчеркну

## Debug trick: hover на переменную в IDE
TypeScript показывает inferred тип под курсором.
Если ожидаешь number[] а видишь Promise<number[]> — пропущен await.
Самый быстрый способ отловить missing await без запуска тестов.

## Array.sort() мутирует — defensive copy
.sort() / .reverse() / .splice() меняют массив in-place.
Если хочешь сохранить original — копируй: [...arr].sort() или Array.from(arr).sort().
Особенно критично в тестах: если original и sorted ссылаются на один массив,
assertion всегда true даже если сортировка не сработала.

## ESLint expect-expect и POM
Когда POM методы делают assertions внутри — Playwright plugin не видит.
Решение: настроить assertFunctionNames с твоей naming convention (expect*).
Это типовая настройка на каждом проекте с POM.

## Fixture как guarantor состояния
Fixture может (и должна) проверять что setup действительно успешен.
В authenticatedPage делаем expectLoaded() после login — fixture не передаст page
тесту, если login провалился. Тест падает с понятной ошибкой "fixture setup failed",
а не на загадочной строке внутри теста.

## Fixtures: зачем они существуют
Beforehand привязан к describe; fixture привязан к тесту по имени параметра.
test.extend({ name: async (deps, use) => { setup; await use(value); teardown; } }).
Композиция через зависимости в параметрах. Декларативная модель setup.

## test.extend() — anatomy

const test = base.extend<TestFixtures, WorkerFixtures>({
  name: async ({ deps }, use) => { setup; await use(val); teardown; },
  workerName: [async ({}, use) => { await use(val); }, { scope: 'worker' }],
});

- base = оригинальный test, переименован чтобы не конфликтовать
- generic — типы fixtures (test-scope, worker-scope)
- extend() возвращает НОВЫЙ test, immutable
- fixture function: (deps, use) => async
- await use(value) — точка где запускается тест
- worker-scope требует tuple [fn, options]

## Fixtures — единая система dependency injection
Playwright не различает built-in fixtures (page, context, request) и
custom fixtures (mine) на уровне механики. Все они — ключи в одном bag,
resolve'ятся одинаково.

Следствия:
- Custom fixture может depend on built-in (через destructure deps)
- Можно override built-in fixture своей версией
- Композиция fixtures работает в обе стороны

## Playwright workers — что и сколько
- Worker = Node.js процесс (не thread, не browser context)
- Default локально: os.cpus().length / 2
- Default на CI (из init config): workers: 1
- Каждый worker имеет свой Node-процесс, изоляция через process boundary
- Tests в одном worker'е выполняются последовательно
- Разные workers — настоящий параллелизм

## Storage State pattern для auth (senior pattern)

Проблема: UI-логин на каждый тест медленный (~2s). 200 тестов = 6+ минут только на login.

Решение: разделить "получение auth" и "использование auth" по scope'ам:
- Worker-scoped: один раз делаем UI-login, сохраняем state в JSON
- Test-scoped: каждый тест создаёт fresh browser context, загружая state из JSON

Plus: каждый тест получает свежий context (изоляция сохранена)
Plus: auth.json создаётся один раз per worker, потом reuse'ится

Альтернативный подход: global setup в playwright.config.ts с projects.

## Projects setup vs Worker-scoped fixture для auth

Projects setup:
- 1 login на весь suite
- Auth-код в отдельном .setup.ts файле
- Caching через auth.json
- Multiple profiles (admin.json, user.json) тривиально
- Виден в report как отдельный шаг

Worker-scoped fixture:
- W логинов (по 1 на worker)
- Auth-код в fixtures
- Без storage state — нарушение изоляции

Senior answer: Projects setup — стандарт. Worker fixture — legacy approach.

## page.context() vs page.content()
page.context() — owning BrowserContext (cookies, storage, permissions)
page.content() — HTML string текущей страницы
Easy typo: x vs nothing. Часто путают.

## Override storageState per describe
test.use({ storageState: { cookies: [], origins: [] } }) сбрасывает auth.
Полезно для:
- Тестов которые сами тестируют login flow
- Тестов на unauthenticated state pages

## Правило про комментарии
Если комментарий не описывает текущую реальность кода — он хуже отсутствия.
Меняешь код → проверь комментарии рядом, обнови или удали.
"Comments rot faster than code." — senior code review aphorism.

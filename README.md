# MyResume

## Отступление как введение

Этот репозиторий - моё резюме.

На текущий момент, я начал проект, который обговорил с заказчиком, что сделаю его доступным для публикации в общем доступе на GITHUB и на GITLAB.
До этого момента, я разрабатывал проекты с корпрративной защитой исходного кода и не имел права на размещение своих разработок в открытом доступе.

### Почему я взялся за резюме?

Ответ на этот вопрос очень прост - я хочу зарабатывать как программист-разработчик ПО, а не как системный администратор в малом городе.

А данный проект в силу разрешений, я делаю практически бесплатно (4000р в мес как поддержка).

Уровень моей ЗП на текущий момент до 60 т.р., что в принципе гораздо выше минимального уровня по моему месту жительства, но на полноценный уровень жизни не хватает.

Какой такой полноценный?

Я программист. Часто работаю сверх-урочного времени и дома. Мне нужно хорошее рабочее место, которое стоит не мало. Я купил себе компьютер, но хотелось, чтобы данная затрата не включалась в обязательный кредит с высокими процентами. Ну и прочие мелочи (жильё - нужно купить, продукты, еда, одежда, и т.д.).

Я ожидаю ЗП при удаленной работе от 100 000 р (зависит от объема работы и занятости). Могу переехать в другой город, но при наличии проживания на месте.

## О СЕБЕ

Я разрабатываю ПО разного рода уже более 15 лет. Имею опыт работы со следующими ЯП: 

- Java - управление администрированием (GUI + DATABASES);
- CPP (в том числе микроконтроллеры STM32, ESP32, Arduino), 
- Pascal - очень старая тема
- PHP - некоторое время сидел на ModX, WordPress (писал сайты и плагины к системам)
- Go - писал сервер, но большую часть после переделал в Node
- Javascript - здесь я себя чувствую как рыба в воде (+современный JS с асинхронными потоками)
- NodeJS - как отдельная статья JS и модульности

Базы данных:

- MySQL
- PostgreSQL
- MSSQL
- MongoDB (на данной системе сижу последнее время)

Помимо всего этого, поработал с 3D технологиями (BabylonJS, ThreeJS, Blender3D, 3DMax, Unity, пробовал Unigine)

## О ДАННОМ ПРОЕКТЕ

Проект, который выложен здесь, разработан на следующих технологиях:

- MongoDB - база данных NOSQL с более широкими возможностями поиска и модификации данных
- NodeJS - основной движок сервера и сборка Frontend
- ReactJS - Frontend 
- React-Bootstrap 5 - GUI
- SASS SCSS - стили
- Webpack5 - сборка

### Принцип работы:

Проект разбит на страницы. Каждая страница представляет собой читый HTML код с минимальным наполнением. Всё подгружается и прорисовывается в React. При этом, каждая страница заранее проверяет пользователя по сессии и его доступ к разделам проекта.

После загрузки страницы (где присутствует только код запуска), fetch запросы пытаются получить данные с сервера по методу POST (реализация API).

Каждый запрос проверяет информацию о пользователе по сессии по 3м ключам из куков - я выстроил защиту по 3м ключам с проверкой хеш кода sh256.

После получения данных - React отрисовывает сраницу по своим состояниям компонентов.

Проект можно разбить на микросервисы, но так как я работаю один - смысла в этом не вижу.

## PS

Проект молодой и начат несколько недель назад в свободное время от основной работы.

Для текущей версии, пока не выложил систему администрирования, которая разрабатывается параллельно как отдельный сервер (разделил хост управления от общего уровня доступа).

**EMAIL:** ``alex-xp@list.ru``

Могу сбросить скриншоты и описание еще одного проекта, но только при переписке (остальные раскрывать нельзя - корпоративная этика)




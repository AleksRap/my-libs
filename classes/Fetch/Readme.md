# Fetch
Плагин для удобного использование fetch api, включающий генерацию ошибок при статусе ответа сервера !== **'success'**


## Использование
Fetch использует статические методы, поэтому создания инстанса класса не требуется. Просто сразу используйте методы из api


## Api

```Fetch.get(url)``` - получение данных. На входе принимает url для **GET** запроса

```Fetch.post(url, body)``` - добавление данных. На входе принимает url для **POST** запроса и body - данные которые нужно добавить (сериализуются в json автоматически)

```Fetch.put(url, body)``` - редактирование данных. На входе принимает url для **PUT** запроса и body - данные которые нужно изменить (сериализуются в json автоматически)

```Fetch.delete(url)``` - удаление данных. На входе принимает url для **DELETE** запроса

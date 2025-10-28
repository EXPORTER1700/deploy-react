# Build & Deploy React+Vite + Bun на сервер

## Переменные и секреты

### GitHub Secrets (для environment `dev`)

| Название       | Описание                           | Пример                                  |
| -------------- | ---------------------------------- |-----------------------------------------|
| SERVER_HOST    | IP или домен сервера               | ec2-123.compute-1.amazonaws.com         |
| SERVER_USER    | Пользователь для SSH               | ubuntu                                  |
| SERVER_SSH_KEY | Содержимое приватного ключа `.pem` | -----BEGIN OPENSSH PRIVATE KEY----- ... |
| SERVER_PATH    | Путь, куда копировать билд         | /var/www/html                           |

### Environment variables (`vars` или `environment` GitHub Actions)

| Название | Используется для        | Пример                                                     |
| -------- | ----------------------- | ---------------------------------------------------------- |
| NODE_ENV | VITE_NODE_ENV при билде | production                                                 |
| API_URL  | VITE_API_URL при билде  | [https://api.dev.example.com](https://api.dev.example.com) |

> NODE_ENV и API_URL прокидываются через `--build-arg` в Docker и становятся доступными в коде через import.meta.env.VITE_NODE_ENV и import.meta.env.VITE_API_URL.

---

## Путь (SERVER_PATH)

* На сервере — корень статики Nginx, например /var/www/html.
* Workflow удаляет старые файлы перед копированием нового билда:

```
rm -rf /var/www/html/*
scp -r ./dist/* user@server:/var/www/html
```

* Дефолтный Nginx конфиг использует /var/www/html как root для index.html.

---

## Использование

1. Создать environment `dev` в GitHub и добавить все secrets + env.
2. Убедиться, что Dockerfile в корне репозитория корректно указывает Bun версию.
3. Пушить изменения в ветку `dev` → workflow автоматически собирает и деплоит билд.
4. На сервере проверить, что файлы появились в SERVER_PATH, открыть браузер на IP/домене сервера.

---

##  Важно

* Если rm не проходит из-за прав — использовать sudo или сменить владельца папки:

```
sudo chown -R ubuntu:ubuntu /var/www/html
```

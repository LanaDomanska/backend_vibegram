📘 VibeGram API Documentation (Backend)

🔐 Auth

POST /api/auth/register

Описание: Регистрация нового пользователя

Body: { email, username, password, confirmPassword }

Ответ: { token, user: { username, email } }

POST /api/auth/login

Описание: Логин пользователя

Body: { email, password }

Ответ: { token, user: { username, email } }

POST /api/auth/logout

Описание: Выход пользователя

Заголовок: Authorization: Bearer <token>

Ответ: { message: 'Logout successfully' }

GET /api/auth/current

Описание: Получить текущего пользователя по токену

POST /api/auth/reset-request

Описание: Запрос на сброс пароля

Body: { email }

Ответ: { resetToken }

POST /api/auth/reset-password

Описание: Сброс пароля по токену

Body: { token, newPassword }

👤 Users

GET /api/users/search?q=

Описание: Поиск пользователей по username/fullName

GET /api/users/:username

Описание: Получение чужого профиля по username

GET /api/users/me

Описание: Получение собственного профиля

PUT /api/users/

Описание: Обновить свой профиль

Body: { username?, bio?, avatar?, fullName?, website? }

DELETE /api/users/:id

Описание: Удалить свой аккаунт (или другим, если admin)

POST /api/users/avatar

Описание: Загрузка аватара (multipart/form-data)

Поле: avatar

Ответ: { message, avatar, user }

📸 Posts

POST /api/posts

Описание: Создать пост

Body: { caption, imageUrl }

GET /api/posts/feed

Описание: Лента постов

GET /api/posts/user/:userId

Описание: Посты конкретного пользователя

GET /api/posts/:postId

Описание: Получить пост по ID

PUT /api/posts/:postId

Описание: Обновить пост (своего авторства)

DELETE /api/posts/:postId

Описание: Удалить пост + удалить уведомления

POST /api/posts/image

Описание: Загрузка изображения для поста

multipart/form-data, поле: image

💬 Comments

POST /api/comments/:postId

Описание: Оставить комментарий

DELETE /api/comments/:commentId

Описание: Удалить комментарий + удалить уведомление

GET /api/comments/:postId

Описание: Получить комментарии поста

❤️ Likes

POST /api/likes/:postId

Описание: Лайк поста + создать уведомление

DELETE /api/likes/:postId

Описание: Снять лайк + удалить уведомление

GET /api/likes/:postId

Описание: Список пользователей, лайкнувших пост

🔔 Notifications

GET /api/notifications

Описание: Получить уведомления пользователя

PUT /api/notifications/:id/read

Описание: Отметить уведомление как прочитанное

🔍 Explore

GET /api/explore

Описание: Получить случайные посты (в Explore)

🔗 Follow

POST /api/follows/:id/follow

Описание: Подписаться на пользователя + создать уведомление

DELETE /api/follows/:id/unfollow

Описание: Отписаться от пользователя

GET /api/follows/:id/followers

Описание: Получить список подписчиков

GET /api/follows/:id/following

Описание: Получить список подписок

✉️ Messages (Чат)

POST /api/messages

Описание: Отправить сообщение

Body: { recipientId, text }

GET /api/messages/:userId

Описание: Получить все сообщения между двумя пользователями

GET /api/messages/inbox

Описание: Список диалогов (inbox) с последними сообщениями и unread count

PATCH /api/messages/:userId/read

Описание: Отметить сообщения как прочитанные от userId

DELETE /api/messages/:id

Описание: Удалить сообщение (если ты автор)

📡 WebSocket события (Client ⇄ Server)

register

Описание: Зарегистрировать сокет под userId

sendMessage

{ from, to, content } → создаёт сообщение и отправляет его получателю в real-time

messageRead

{ from, to } → все сообщения от from к to помечаются как прочитанные

typing / stopTyping

{ from, to } → показать/убрать индикатор "печатает..."

disconnect

socket автоматически удаляется из connectedUsers

userOnline / userOffline

{ userId } → рассылается всем (или по фильтру), когда пользователь входит/выходит

messageDeleted

{ messageId, from } → уведомление, что сообщение удалено

newMessage

сообщение получено от собеседника в реальном времени

messageSent

подтверждение отправки (можно использовать для статуса "доставлено")


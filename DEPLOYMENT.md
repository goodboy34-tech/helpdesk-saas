# Руководство по Развертыванию на Ubuntu 24

## Требования к системе
- Сервер с Ubuntu 24.04
- Установленные Docker и Docker Compose
- Доменное имя с настроенными DNS-записями
- SSL-сертификат (рекомендуется Let's Encrypt)

## Подготовка сервера
```bash
# Установка Docker
sudo apt update
sudo apt install -y docker.io

# Установка Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose- $(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Проверка установки
docker --version
docker-compose --version

helpdesk-saas/
├── backend/                 # Node.js + Fastify backend
│   ├── src/
│   │   ├── index.ts         # Точка входа
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.routes.ts
│   │   │   │   └── auth.handlers.ts
│   │   │   ├── tickets/
│   │   │   │   ├── ticket.routes.ts
│   │   │   │   └── ticket.handlers.ts
│   │   │   ├── livechat/
│   │   │   │   ├── chat.routes.ts
│   │   │   │   └── chat.handlers.ts
│   │   │   └── payments/
│   │   │       ├── payment.routes.ts
│   │   │       └── payment.handlers.ts
│   │   ├── db.sql             # PostgreSQL схема
│   │   ├── config.ts          # Конфигурация
│   │   └── webhooks.ts        # Вебхуки
│   ├── Dockerfile
│   └── package.json

├── frontend/                # React + Tailwind frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── context/
│   │   │   ├── AuthContext.tsx
│   │   │   └── I18nContext.tsx
│   │   ├── layouts/
│   │   │   ├── RoleBasedLayout.tsx
│   │   │   └── AdminLayout.tsx
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Register.tsx
│   │   │   ├── admin/
│   │   │   │   ├── TenantManagement.tsx
│   │   │   │   └── TenantAnalytics.tsx
│   │   │   ├── client/
│   │   │   │   ├── BotSettings.tsx
│   │   │   │   ├── OperatorManagement.tsx
│   │   │   │   └── SubscriptionPage.tsx
│   │   │   └── operator/
│   │   │       └── LiveChat.tsx
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   │   ├── ChatWindow.tsx
│   │   │   │   └── SnippetBar.tsx
│   │   │   └── tickets/
│   │   │       └── TicketSidebar.tsx
│   │   └── hooks/
│   │       └── useChat.ts
│   ├── Dockerfile
│   └── package.json

├── bot/                     # Telegram bot
│   ├── src/
│   │   ├── index.ts         # Точка входа
│   │   ├── handlers/
│   │   │   ├── start.ts
│   │   │   ├── status.ts
│   │   │   ├── close.ts
│   │   │   ├── ban.ts
│   │   │   └── message.ts
│   │   ├── services/
│   │   │   ├── user.service.ts
│   │   │   ├── ticket.service.ts
│   │   │   └── payment.service.ts
│   │   ├── redis.ts         # Подключение к Redis
│   │   └── webhooks.ts      # Вебхуки TelegaPay
│   ├── Dockerfile
│   └── package.json

├── configs/
│   ├── nginx.conf           # Конфиг Nginx
│   ├── docker-compose.yml   # Оркестрация контейнеров
│   ├── deploy.sh            # Скрипт развертывания
│   └── .env.example         # Пример файла окружения

└── docs/
    ├── README.md            # Общее описание проекта
    ├── DEPLOYMENT.md        # Русскоязычная инструкция по развертыванию
    └── openapi.yaml         # Спецификация API

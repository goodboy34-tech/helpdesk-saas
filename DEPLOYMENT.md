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

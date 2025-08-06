# 使用官方 Ghost 镜像
FROM ghost:5-alpine

# 复制配置文件到容器中
COPY config.development.json /var/lib/ghost/config.development.json

# 暴露 Ghost 默认端口
EXPOSE 2368
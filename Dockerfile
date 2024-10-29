FROM node:20.13.1

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 配置 npm 镜像源为中国镜像
RUN npm config set registry https://registry.npmmirror.com

# 安装所有依赖
RUN npm install

# 复制项目的所有内容到容器中
COPY . .

# 暴露端口
EXPOSE 5173

# 确保容器启动时执行此命令
CMD ["npm", "run", "dev"]  
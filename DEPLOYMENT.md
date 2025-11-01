# 部署指南 (Deployment Guide)

本指南提供完整的部署说明，帮助您从硬盘故障恢复后快速部署智东家居服务系统。

## 🚨 硬盘故障恢复说明

由于硬盘故障导致原有数据库和Docker配置丢失，本次更新已完全重建：
- ✅ 数据库架构和初始化脚本
- ✅ Docker 容器化配置
- ✅ 后端 API 服务
- ✅ 环境配置文件

## 📋 快速开始

### 1. 使用 Docker Compose（推荐）

这是最简单的部署方式，会自动启动数据库和应用服务。

```bash
# 1. 克隆或更新代码
git pull origin main

# 2. 创建环境配置文件
cp .env.example .env

# 3. 编辑 .env 文件，设置数据库密码
nano .env  # 或使用其他编辑器
# 修改 DB_PASSWORD=your_secure_password

# 4. 启动所有服务
docker compose up -d

# 5. 查看服务状态
docker compose ps

# 6. 查看日志
docker compose logs -f app
```

服务端口：
- **应用**: http://localhost:3000
- **数据库**: localhost:5432
- **数据库管理界面 (Adminer)**: http://localhost:8080

### 2. 验证部署

```bash
# 检查健康状态
curl http://localhost:3000/api/health

# 应该返回类似这样的响应：
# {"status":"healthy","timestamp":"...","database":"connected","uptime":...}
```

### 3. 测试 API

```bash
# 获取所有设备
curl http://localhost:3000/api/devices

# 获取所有用户
curl http://localhost:3000/api/users

# 获取系统设置
curl http://localhost:3000/api/settings
```

## 🔧 本地开发部署

如果您想在本地开发环境中运行（不使用 Docker）：

### 前置条件
- Node.js 18+
- PostgreSQL 15+

### 步骤

```bash
# 1. 安装依赖
npm install

# 2. 创建数据库
createdb zhidongjiaqu

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env 文件设置数据库连接信息

# 4. 运行数据库迁移
npm run migrate

# 5. （可选）填充示例数据
npm run seed

# 6. 启动开发服务器
npm run dev
```

## 🔄 数据恢复

如果您有数据库备份，可以使用以下方式恢复：

```bash
# 如果使用 Docker
docker compose exec db psql -U postgres -d zhidongjiaqu < backup.sql

# 如果使用本地 PostgreSQL
psql -U postgres -d zhidongjiaqu < backup.sql
```

## 🛠️ 常见问题

### 1. 端口已被占用

如果端口 3000、5432 或 8080 已被占用，可以修改 `docker-compose.yml` 中的端口映射：

```yaml
ports:
  - "3001:3000"  # 将本地端口改为 3001
```

### 2. 数据库连接失败

确保：
- PostgreSQL 服务正在运行
- 数据库凭据正确
- 防火墙允许连接

查看日志：
```bash
docker compose logs db
docker compose logs app
```

### 3. 数据持久化

Docker 卷 `postgres_data` 保存数据库数据。如需完全重置：

```bash
# ⚠️ 警告：这会删除所有数据
docker compose down -v
docker compose up -d
```

### 4. 更新应用

```bash
# 拉取最新代码
git pull

# 重建并重启容器
docker compose up -d --build
```

## 📊 数据库管理

### 使用 Adminer (Web界面)

1. 访问 http://localhost:8080
2. 登录信息：
   - 系统: PostgreSQL
   - 服务器: db
   - 用户名: postgres
   - 密码: (您在 .env 中设置的密码)
   - 数据库: zhidongjiaqu

### 使用命令行

```bash
# 进入数据库容器
docker compose exec db psql -U postgres -d zhidongjiaqu

# 常用命令
\dt          # 列出所有表
\d+ users    # 查看 users 表结构
SELECT * FROM devices;  # 查询设备
```

## 🔐 生产环境建议

1. **修改默认密码**
   ```bash
   # 在 .env 文件中设置强密码
   DB_PASSWORD=your_very_strong_password_here
   ```

2. **禁用数据库管理界面**
   ```bash
   # 注释掉 docker-compose.yml 中的 adminer 服务
   ```

3. **设置环境变量**
   ```bash
   NODE_ENV=production
   ```

4. **配置 HTTPS**
   - 使用 Nginx 或 Caddy 作为反向代理
   - 配置 SSL 证书 (Let's Encrypt)

5. **定期备份**
   ```bash
   # 创建备份脚本
   docker compose exec db pg_dump -U postgres zhidongjiaqu > backup_$(date +%Y%m%d_%H%M%S).sql
   ```

## 📝 维护命令

```bash
# 停止所有服务
docker compose stop

# 重启特定服务
docker compose restart app

# 查看资源使用
docker compose stats

# 清理未使用的容器和镜像
docker system prune -a
```

## 🆘 获取帮助

如遇到问题：
1. 查看应用日志：`docker compose logs -f app`
2. 查看数据库日志：`docker compose logs -f db`
3. 检查容器状态：`docker compose ps`
4. 在 GitHub 上创建 Issue

## 📚 相关文档

- [README.md](README.md) - 项目概述和功能说明
- [API 文档](README.md#-api-endpoints) - API 端点详细说明
- [数据库架构](scripts/init.sql) - 完整的数据库表结构

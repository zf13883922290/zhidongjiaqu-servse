#!/bin/bash

# 智东家居服务系统快速启动脚本
# Quick Start Script for Zhidongjiaqu Service

set -e

echo "================================================"
echo "  智东家居服务系统 - 快速部署"
echo "  Zhidongjiaqu Service - Quick Start"
echo "================================================"
echo ""

# 检查 Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker 未安装。请先安装 Docker。"
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "✅ Docker 已安装"

# 检查 docker compose
if ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose 未安装。请先安装 Docker Compose。"
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker Compose 已安装"
echo ""

# 检查 .env 文件
if [ ! -f .env ]; then
    echo "📝 创建环境配置文件..."
    cp .env.example .env
    echo "⚠️  请编辑 .env 文件设置数据库密码"
    echo "⚠️  Please edit .env file to set database password"
    echo ""
    read -p "按回车继续使用默认配置，或按 Ctrl+C 退出以编辑 .env 文件... " dummy
fi

echo "🚀 启动服务..."
docker compose up -d

echo ""
echo "⏳ 等待服务启动..."
sleep 5

# 检查服务状态
echo ""
echo "📊 服务状态:"
docker compose ps

# 健康检查
echo ""
echo "🏥 执行健康检查..."
max_attempts=30
attempt=0

while [ $attempt -lt $max_attempts ]; do
    if curl -f http://localhost:3000/api/health &> /dev/null; then
        echo "✅ 服务运行正常!"
        break
    fi
    attempt=$((attempt + 1))
    echo "等待服务启动... ($attempt/$max_attempts)"
    sleep 2
done

if [ $attempt -eq $max_attempts ]; then
    echo "❌ 服务启动超时，请检查日志: docker compose logs -f app"
    exit 1
fi

echo ""
echo "================================================"
echo "  🎉 部署成功!"
echo "================================================"
echo ""
echo "📍 服务地址:"
echo "   - 前端/API: http://localhost:3000"
echo "   - 健康检查: http://localhost:3000/api/health"
echo "   - 数据库管理: http://localhost:8080"
echo ""
echo "📖 常用命令:"
echo "   - 查看日志: docker compose logs -f app"
echo "   - 停止服务: docker compose stop"
echo "   - 重启服务: docker compose restart"
echo "   - 完全停止: docker compose down"
echo ""
echo "📚 详细文档: README.md 和 DEPLOYMENT.md"
echo "================================================"

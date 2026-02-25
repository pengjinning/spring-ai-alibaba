# 使用说明

```bash
# 启动中间件依赖
cd docker/middleware
./run.sh
# 启动服务器
cd spring-ai-alibaba-admin-server
mvn spring-boot:run
# 启动前端
cd spring-ai-alibaba-admin/frontend
corepack enable
corepack prepare pnpm@9.15.4 --activate
pnpm install
pnpm --filter main dev
# 访问网页
http://localhost:8000/
```

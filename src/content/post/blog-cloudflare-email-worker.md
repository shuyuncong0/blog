---
title: "使用 Cloudflare email worker 实现的临时电子邮件服务"
description: "无需服务器，10分钟搭建隐私友好的临时邮箱！基于Cloudflare Worker和Turso数据库，轻松实现邮件接收与存储，保护隐私从此无忧。"
publishDate: "2025/01/15"
tags: ["博客", "blog", "Cloudflare", "worker", "Vercel", "临时电子邮件"]
---




## 🌈 特点

+   **隐私友好**：无需注册，开箱即用，保护用户隐私。

+   **简洁美观**：精心设计的用户界面，操作流畅，体验更佳。
+   **快速部署**：无需服务器，轻松搭建专属临时邮箱服务。

**实现原理**：

+   **Email Worker 接收邮件**：通过 Cloudflare Worker 接收并处理电子邮件。

+   **前端展示邮件**：使用 Remix 框架构建前端界面，实时显示邮件内容。
+   **邮件存储**：利用 SQLite 数据库（通过 Turso 托管）持久化存储邮件数据。

**流程概述**：
Worker 接收邮件 → 保存至数据库 → 客户端查询并展示邮件。

## ✨效果

![1736063134197](https://cdn.illsky.com/img/2025/01/202501051545491.jpg)



## 👋  自部署教程

### **准备工作**

+   [**Cloudflare**](https://dash.cloudflare.com/) ：用于托管域名和部署 Worker。

+   [**turso**](https://turso.tech/) ：注册 Turso，创建免费的 SQLite 数据库。

+   [**Vercel**](https://vercel.com/) ：用于部署前端用户界面。

+   [Nodejs](https://nodejs.org/) ：本地安装 Node.js（版本 ≥ 18.x），用于调试和运行项目。

### **接收邮件教程**

#### 配置 Turso 数据库

![image-20250105153649999](https://cdn.illsky.com/img/2025/01/202501051536378.png)

注册并登录 [Turso](https://turso.tech/)，创建一个名为 `vmail` 的数据库。在数据库中创建 `emails` 表，运行以下 SQL 脚本：

```sql
CREATE TABLE `emails` (
 `id` text PRIMARY KEY NOT NULL,
 `message_from` text NOT NULL,
 `message_to` text NOT NULL,
 `headers` text NOT NULL,
 `from` text NOT NULL,
 `sender` text,
 `reply_to` text,
 `delivered_to` text,
 `return_path` text,
 `to` text,
 `cc` text,
 `bcc` text,
 `subject` text,
 `message_id` text NOT NULL,
 `in_reply_to` text,
 `references` text,
 `date` text,
 `html` text,
 `text` text,
 `created_at` integer NOT NULL,
 `updated_at` integer NOT NULL
);
```



#### 部署 Cloudflare Email Worker

部署 email worker，需要准备 Node 环境（推荐 18.x 及以上），并且需要安装 wrangler cli 并在本地登录，参考 https://developers.cloudflare.com/workers/wrangler/install-and-update (登录时建议开启VPN)

```
# 安装 pnpm 
npm install -g pnpm

git clone https://github.com/shuyuncong0/vmail

cd vmail

# 安装依赖
pnpm install
```

**配置环境变量**
编辑 `vmail/apps/email-worker/wrangler.toml` 文件，填写以下变量：

- `TURSO_DB_AUTH_TOKEN`：Turso 数据库的认证令牌
- `TURSO_DB_URL`：Turso 数据库的 URL（如 `libsql://db-name.turso.io`）
- `EMAIL_DOMAIN`：您的域名（如 `vmail.dev`）

**部署 Worker**

```
cd apps/email-worker
pnpm run deploy
```

#### 配置电子邮件路由

在 Cloudflare 控制台中，设置“Catch-all”规则，将所有邮件转发至 Email Worker。

![image-20250105153844459](https://cdn.illsky.com/img/2025/01/202501051538589.png)

#### **前端部署**

##### 环境变量

在 Vercel  上部署 Remix 应用程序，确保在部署时准备并填写以下环境变量（`.env.example`）：

| 变量名                 | 说明                                  | 示例                        |
| ---------------------- | ------------------------------------- | --------------------------- |
| COOKIES_SECRET         | 必填，cookie加密密钥，随机字符串      | `12345abcde`                |
| TURSO_DB_RO_AUTH_TOKEN | 必填，turso数据库只读凭据             | `my-turso-db-ro-auth-token` |
| TURSO_DB_URL           | 必填，turso数据库URL                  | `libsql://db-name.turso.io` |
| EMAIL_DOMAIN           | 必填，域名后缀，支持多个              | `illsky.us.kg`              |
| EXPIRY_TIME            | 可选，邮箱过期时间，单位秒，默认86400 | `86400`                     |
| TURNSTILE_KEY          | 可选，网站验证所需的 Turnstile Key    | `my-turnstile-key`          |
| TURNSTILE_SECRET       | 可选，网站验证所需的 Turnstile Secret | `my-turnstile-secret`       |

获取 `TURNSTILE_KEY`、`TURNSTILE_SECRET` 请前往 cloudflare 控制台 https://dash.cloudflare.com/?to=/:account/turnstile

关于`TURNSTILE_KEY`、`TURNSTILE_SECRET` 配置

![image-20250105154126613](https://cdn.illsky.com/img/2025/01/202501051541883.png)

##### 一键部署

推荐使用一键部署按钮（此操作会在你的github账户中自动创建vmail仓库并关联部署到vercel）：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Foiov%2Fvmail&env=COOKIES_SECRET&env=TURNSTILE_KEY&env=TURNSTILE_SECRET&env=TURSO_DB_RO_AUTH_TOKEN&env=TURSO_DB_URL&env=EMAIL_DOMAIN&project-name=vmail&repository-name=vmail)

##### 手动部署

或手动将代码推送到你的 Github 仓库，并在 Vercel 面板中创建项目。选择 `New project`，然后导入对应的 Github 仓库，填写环境变量，选择 `Remix` 框架，点击 `Deploy`，等待部署完成。

部署完后继续点击 Countinu to Dashboard，进入 Settings -> General，修改下面设置：

![](https://cdn.illsky.com/img/2025/01/202501051542086.png)

一般默认无需修改

![image-20250105154247945](https://cdn.illsky.com/img/2025/01/202501051542071.png)



![image-20250105152442815](https://cdn.illsky.com/img/2025/01/202501051543720.png)

验证环境变量

**然后进入 Deployments 重新部署一次，或向 github 推送代码重新触发部署**。

#### 域名解析

部署成功后在 cloudflare 添加域名解析(A记录)到对应平台，就可以愉快的玩耍了

![image-20250105152636452](https://cdn.illsky.com/img/2025/01/202501051544257.png)

![1736063113885](https://cdn.illsky.com/img/2025/01/202501051545150.jpg)

#### SSL/TLS

在CF域名控制台修改加密模式为完全（或严格）,若不修改，访问网站会出现重定向次数过多错误。

#### 本地调试

```
# 克隆项目
git clone https://github.com/oiov/vmail
cd vmail

# 安装依赖
pnpm install

# 运行端口 localhost:3000
pnpm run remix:dev
```

运行前复制 `apps/remix/.env.example` 文件并重命名为 `apps/remix/.env`，填写必要的环境变量。

## 🎉 完成部署

按照以上步骤操作后，临时电子邮件服务即可正常运行。以上完成撒花！
---
title: "Cloudflare + Gmail + Resend 十分钟轻松拥有免费的企业邮箱"
description: "利用Cloudflare、Gmail和Resend快速搭建免费的企业邮箱。通过Cloudflare的电子邮件路由功能接收邮件并转发至Gmail，再结合Resend的API实现邮件发送，最终在Gmail中添加自定义邮箱，轻松实现专业的企业邮箱服务。"
publishDate: "2025/01/04"
tags: ["博客", "blog", "Gmail", "Resend", "企业邮箱"]
---




现在的独立开发者们基本上是人手 N 个域名了，不过企业邮箱可能不是人人都有。

这里和大家分享一下我个人定制**完全免费的企业邮箱**的方案：**「Cloudflare + Gmail + Resend」**。

首先说下**企业邮箱的优点**：

+   对用户来说，企业邮箱显得更专业，更容易被信任。
+   利用 catch-all 功能，相当于拥有了无数个邮箱，可以方便我们注册各种服务。

注意事项：

+   如果您只需要进行邮件的收发，而不涉及群发等操作，那么这种方案可以说是非常简单且无成本的选择。

## 示意图

![how to get free enterprise email using cloudflare-worker + gmail + resend](https://cdn.jsdelivr.net/gh/shuyuncong0/mdImg/md/image2024/202501041044576.png)

## 前提

你拥有一个域名，且域名的 dns 在 Cloudflare 管理。（当然任何其它拥有电子邮件路由功能的服务都可以，这里只介绍 Cloudflare）

## 使用 Cloudflare 接收邮件，设置邮件转发到 Gmail

> Cloudflare 是知名的网络安全公司，独立开发界最伟大的慈善家。如果你是刚起步的独立开发者，它的后台服务提供的免费额度可以让你零成本起步。

### 进入域名下的「电子邮件路由」

![cloudflare email router](https://cdn.jsdelivr.net/gh/shuyuncong0/mdImg/md/image2024/202501041045190.png)

### 进入目标规则标签，开启 Catch-All，点击编辑

![cloudflare email router rules](https://cdn.jsdelivr.net/gh/shuyuncong0/mdImg/md/image2024/202501041052077.png)

### 设置转发操作，将所有邮件转发到 Gmail 邮箱

添加目标位置时会发送一封确认邮件到邮箱，邮件里点确认即可。

![cloudflare email router catch all](https://cdn.jsdelivr.net/gh/shuyuncong0/mdImg/md/image2024/202501041056901.png)

🎉🎉🎉 好了，到这里**邮件的接收**就搞定了。 你可以发送邮件到你域名下的任意账户上试试。

## 获取 Resend API Key

> Resend 是邮件发送服务，提供发送邮件 API。免费用户支持 1 个自定义域名，发送额度每天 100，每月 3000。
>
> 查看免费计划
>
> ![Resend plan send email freely](https://cdn.jsdelivr.net/gh/shuyuncong0/mdImg/md/image2024/202501041057148.png)

### 在 API Keys 标签下申请新的 API Key



![resend create api key](https://cdn.jsdelivr.net/gh/shuyuncong0/mdImg/md/image2024/202501041100151.png)

### 去 Settings 查看 smtp 设置

![resed smtp config](https://cdn.jsdelivr.net/gh/shuyuncong0/mdImg/md/image2024/202501041058160.png)

## Gmail 添加使用 Resend 服务的邮箱

### 找到 Settings -> Accounts and Import -> 在 Send mail as 中点击 Add another email address：

![gmail add send email account](https://cdn.jsdelivr.net/gh/shuyuncong0/mdImg/md/image2024/202501041100801.png)

### 填入名字和用于发送邮件的账号

填写信息，点下一步。 ![gmail add send email account step1](https://cdn.jsdelivr.net/gh/shuyuncong0/mdImg/md/image2024/202501041100499.png)

### 填入 Resend smtp 服务信息

Username 固定填 resend，Password 填上面获取的 API Key，点 Add Account。 ![gmail add send email account step2](https://cdn.jsdelivr.net/gh/shuyuncong0/mdImg/md/image2024/202501041100585.png)

### 你会收到来自 Gmail 的确认邮件，点击 confirm 就好

![gmail add send email account step3](https://cdn.jsdelivr.net/gh/shuyuncong0/mdImg/md/image2024/202501041101717.png)

## 大功告成！你的免费企业邮箱已经可以使用啦！🎉🎉🎉

现在，无论你是在手机还是电脑，都可以使用自定义邮箱发送邮箱啦！

 ![gmail add send email account step4 webpage](https://cdn.jsdelivr.net/gh/shuyuncong0/mdImg/md/image2024/202501041101790.png)


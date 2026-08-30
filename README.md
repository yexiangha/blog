# 夜想集 · Yexiangha's Blog

极简静态博客，托管在 Cloudflare Workers 上。

🖥 **线上地址**：[blog.yexiangha.top](https://blog.yexiangha.top)

## 结构

```
blog/
├── index.html              # 首页（文章列表）
├── about.html              # 关于页
├── 404.html                # 自定义 404
├── posts.json              # 文章清单（标题/日期/摘要/链接）
├── .assetsignore           # wrangler 静态资产忽略（排除 .git）
├── wrangler.toml           # 部署配置
├── assets/
│   ├── style.css           # 样式（深色/浅色主题）
│   └── main.js             # 主题切换 + 文章列表渲染
└── posts/
    ├── hello-world.html
    └── cloudflare-pages-blog.html
```

## 本地部署

```bash
# 安装 wrangler（>= 4.127.1）
npm i -g wrangler

# 登录 Cloudflare
wrangler login

# 部署
wrangler deploy
```

## 写新文章

1. 在 `posts/` 下写一个 HTML 文件
2. 在 `posts.json` 里加一条记录：
   ```json
   {
     "title": "文章标题",
     "date": "2026-01-01",
     "summary": "一句话摘要",
     "url": "/posts/xxx.html",
     "tags": ["标签"]
   }
   ```
3. `wrangler deploy` 推送上线

## 技术栈

- 纯静态 HTML/CSS/JS（无构建工具）
- [Cloudflare Workers](https://workers.cloudflare.com/) 静态资产托管
- `.assetsignore` 排除 `.git`，避免源码泄露

## 许可证

[MIT](LICENSE)

---

© [Yexiangha](https://www.yexiangha.top)
# 瑞瓦肖来信 · 极乐迪斯科风格博客

一座长着「技能检定」脸的 Hexo 博客：暗蓝夜色、半光橙、油画颗粒、尖角细框的对话面板。
部署在 GitHub Pages，写作 = 改 Markdown，`git push` 后自动发布。

## 日常写作

```bash
npm run new -- "文章标题"     # 在 source/_posts/ 生成新文章
# 编辑 Markdown，然后：
git add . && git commit -m "post: 新文章" && git push
```

推送后 GitHub Actions 会自动构建并发布，1～2 分钟后文章上线。

本地预览：`npm run server`，浏览器打开 http://localhost:4000/disco-blog/。

## 文章 front-matter（可选字段）

```yaml
title: 文章标题            # 必填
date: 2026-09-04 10:00:00 # 必填
location: 加姆洛克 · 渔村码头  # 文章头部的“场景”地名
day: 3                    # 显示为“第 3 天”
skill: 共情               # 列表卡片上的技能标签
skill_color: psyche       # 该标签颜色：intellect / psyche / physique / motorics / orange / white
lead: 一句话导语。          # 文章头部斜体导语
tags: [随想]              # 标签；加上 thought 标签会同时出现在“思维阁”页
```

## 迪斯科风格的写作标签

| 写法 | 效果 |
| --- | --- |
| `{% raw %}{% skill 共情 %}她听见了。{% endskill %}{% endraw %}` | 技能说话（自动按技能名上色，支持 24 项技能中英文与智力/精神/体质/机能四属性名） |
| `{% raw %}{% check 感知 中等：10 成功 %}{% endraw %}` | 检定横幅，读者可点击掷骰（2d6，纯装饰）。结果含“败”字会显示为红色 |
| `{% raw %}{% thought 想法名 %}内容{% endthought %}{% endraw %}` | 思维阁结晶卡 |
| `{% raw %}{% hl 文字 %}{% endraw %}` | 半光橙色高亮 |

## 页面结构

- **首页** = 对话记录列表；**归档** = 案件档案（按年分组）
- **思维阁**（`/thoughts/`）= 所有 `thought` 标签文章的结晶陈列（圆形槽位 + 结晶环，拟合游戏 UI）
- **角色卡**（`/about/`）= 四属性 + 24 技能的人物卡
- 全站左下角有 **体质/士气 HUD**：士气条随阅读进度消耗，读完一篇文章恰好耗尽

## 常用自定义

| 想改什么 | 改哪里 |
| --- | --- |
| 站名 / 作者 / 副标题 / 地址 | 根目录 `_config.yml` 顶部 |
| 导航菜单（首页竖排主菜单 + 内页 HUD 顶栏）、悬停台词、页脚随机台词、角色卡数值、giscus 配置 | `themes/disco/_config.yml` |
| 配色 / 字体 / 版式 | `themes/disco/source/css/main.css`（CSS 变量集中在 `:root`） |
| 首页油画太阳 | `themes/disco/layout/_partial/sun.ejs`（内联 SVG） |

> 换仓库名或改用 `<用户名>.github.io` 仓库时，同步修改 `_config.yml` 里的 `url` 和 `root`（后者独立仓库时为 `/`）。

## 评论（giscus）

评论基于 [giscus](https://giscus.app/zh-CN)，数据存在本仓库的 Discussions 里：

1. 仓库 **Settings → General → Features → Discussions** 勾选开启（部署脚本已自动开启）；
2. 安装 [giscus App](https://github.com/apps/giscus) 并授权给本仓库（这一步需要你在浏览器里点一下）；
3. `themes/disco/_config.yml` 里的 `giscus.repo_id` / `giscus.category_id` 已由部署脚本自动填好；
4. 完成。文章底部会出现与站点同款暗色的评论区（`themes/disco/source/css/giscus.css`）。

想换评论数据源：把 `giscus` 一节里的 repo 改成任意已装 giscus App 的公开仓库即可。

## 部署原理

`.github/workflows/deploy.yml`：push 到 `main` → `hexo generate` → 上传 `public/` → 通过 GitHub Actions 官方 action 发布到 Pages。仓库 **Settings → Pages → Source** 需保持为 *GitHub Actions*（脚本已配置）。

## 素材版权说明

`themes/disco/source/img/revachol-skyline.jpg`（瑞瓦肖天际线）取自 [Disco Elysium Wiki](https://discoelysium.wiki.gg/)，美术版权归 **ZA/UM** 所有。本仓库为个人非商业博客，仅作粉丝性质的装饰性使用；如你计划商用或公开传播，请替换为自己的图片（改 `main.css` 里 `.bg-art` 与 `.hero` 的 `url(...)` 即可）。其余视觉元素（太阳 logo、纹理、版式）均为原创 CSS/SVG。

## 目录速览

```
source/_posts/          ← 你的文章（最常碰的目录）
source/about/           ← 角色卡页正文
source/thoughts/        ← 思维阁页说明文字
themes/disco/
  _config.yml           ← 主题配置（菜单/台词/角色卡/评论）
  layout/               ← EJS 模板
  scripts/tags.js       ← 自定义标签插件
  source/css/main.css   ← 全部样式
.github/workflows/      ← 自动部署
```

# DRS Video — 桌宠数据需求规格说明书可视化

把 `article.md`（DRS 数据需求规格说明书）做成可点击的、带 PM 风格口播的脑图视频网页。

## 在线观看

部署在 GitHub Pages：<https://uu-yaya.github.io/drs-video/>（替换为你的 GitHub username）

## 操作

- 点击屏幕或按 `→` / `Space` 推进 step
- 鼠标移到屏幕**底部边缘** → 进度条出现，可点击跳章
- 鼠标移到屏幕**右上角** → 模式切换 + 语速滑块出现
- 按 `M` 键切换 Manual → Audio → Auto 三种模式
- 一镜到底录屏：URL 加 `?auto=1` → 按 `Space` 启动 → 整片自动播完

## 文件

- `article.md` — DRS 原文（数据需求规格说明书）
- `script.md` — 视频口播稿
- `outline.md` — 章节划分 + 信息池
- `presentation/` — Vite + React + TS 项目（28 章脑图 + 浮动卡片 + 字幕 + 语速控制）

## 本地开发

```bash
cd presentation
npm install
npm run dev
# 打开 http://localhost:5174
```

## 音频合成

口播 narration → mp3 用 [edge-tts](https://github.com/rany2/edge-tts)（免费）。Xiaoyi 女声 + 语速 +20%。

```bash
pip install edge-tts
cd presentation
npm run extract-narrations    # 扫所有章节 narrations.ts → audio-segments.json
npm run synthesize-audio      # 调 edge-tts 合成 → public/audio/<chapter>/<step>.mp3
```

## 部署

push 到 `main` 分支 → GitHub Actions 自动构建 + 部署到 Pages。

首次启用 Pages：repo Settings → Pages → Source 选 "GitHub Actions"。

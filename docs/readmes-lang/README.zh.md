# 🚀 PromptsManager

将您的提示词作为资产来管理，而不是散乱的文本。

**PromptsManager** 是一款用于组织、分类和重用 AI 提示词的应用程序。
如果您使用 ChatGPT、Copilot 或任何生成式模型，您就知道好的提示词会不断积累——然后丢失。

这个项目解决了这个问题。

---

## 🧠 问题所在

专业的 AI 用户：

* 将提示词分散在 Notion、记事本、README 和聊天历史中
* 浪费时间重新创建已经有效的提示词
* 没有版本控制
* 无法构建积累的知识

好的提示词不应该依赖于记忆力。

---

## 🎯 解决方案

PromptsManager 将您的提示词集中在一个地方，允许：

* 📂 创建和保存提示词
* 🏷️ 按类别和标签组织
* 🔎 快速搜索
* ♻️ 轻松重用
* 🧩 构建您的 AI 策略

理念很简单：将提示词视为可重用的代码。

---

## 🏗️ 项目结构

```
/src
  /components      # Sidebar, PromptEditor, PromptList, MarkdownPreview, etc.
  /services        # storage.ts (localStorage + Electron IPC)
  /hooks           # useToast.ts
  /types           # Prompt.ts
  App.tsx          # Main component
```

---

## ✨ 功能

- **完整的 CRUD** - 创建、编辑和删除提示词
- **类别和标签** - 使用多个标签组织您的提示词
- **收藏** - 标记您喜爱的提示词
- **搜索和筛选** - 按类别、标签或文本筛选
- **排序** - 按日期（最新/最旧）、标题（A-Z/Z-A）或收藏
- **自动保存** - 闲置 2 秒后自动保存
- **撤销/重做** - 编辑器中的编辑历史（Ctrl+Z / Ctrl+Y）
- **Markdown 预览** - 查看格式化内容
- **模板变量** - 支持 `{{variable}}` 并高亮显示
- **导入/导出** - JSON 和 Markdown
- **备份** - 导出所有数据
- **响应式界面** - 在桌面和 Web 上都能运行
- **桌面模式** - 适用于桌面的 Electron 版本

---

## 🚀 安装

克隆仓库：

```bash
git clone https://github.com/IamThiago-IT/PromptsManager.git
```

进入项目文件夹：

```bash
cd PromptsManager
```

安装依赖：

```bash
npm install
```

运行项目：

```bash
npm run dev
```

### 可用脚本

| 脚本 | 描述 |
|--------|-----------|
| `npm run dev` | 启动开发 |
| `npm run dev:web` | 仅 Web 模式 |
| `npm run dev:desktop` | 桌面模式 (Electron) |
| `npm run build:web` | Web 构建 |
| `npm run build:desktop` | 桌面构建 (Electron) |
| `npm run lint` | 检查代码 |

---

## 📌 路线图

- [x] 类别系统
- [x] 标签系统
- [x] 搜索和筛选
- [x] 排序（日期、标题、收藏）
- [x] 导出和导入（JSON/Markdown）
- [x] 自动保存
- [ ] 提示词版本控制
- [ ] 云端自动备份
- [ ] 公开分享
- [ ] AI API 集成

---

## 🧩 使用场景

* 开发者整理技术提示词
* 内容创作者保存内容模板
* 学生构建教育提示词
* 专业人员使用 AI 自动化任务

---

## 🤝 贡献

如需改进：

1. Fork 项目
2. 创建分支 (`feature/feature-name`)
3. 提交您的更改
4. 开启 Pull Request

欢迎提交 Issue。

---

## 📄 许可证

MIT License

---

## 🔥 为什么这很重要？

AI 是生产力的倍增器。
但没有组织的生产力会变成返工。

如果您每天使用 AI 但仍然将提示词保存在记事本中，您的潜能就未能充分发挥。

提示词是资产。
请以此方式管理它们。
# PEEK 网站 2.0 —— 总控26 独立整版交付说明（DELIVERY-NOTE）

- **交付方**：总控26（`seat-zk26`）
- **交付日期**：2026-11-19
- **独立免登录预览网址（含 `/en/`）**：`https://anjelicafrancis03-prog.github.io/peek-zk26-preview/en/`
- **本地静态包路径**：`F:\codex\peek-zk26-site\`（完全独立于材料包 `F:\codex\peek-zk26-version-1119\` 与所有生产站目录）
- **唯一视频替换点（50 秒片 `v39_3` → `v39_4`）**：
  - 文件：`F:\codex\peek-zk26-site\en\config.js`（第 10 行）
  - 常量：`MEDIA_CONFIG.PEEK_FILM_SRC = '../assets/film/skull_peek_v39_3_en_crf18_r1.mp4'`
  - 说明：整站仅此一处引用 50 秒片路径；后续接总控31 通知切换 `v39_4` 时，将 `skull_peek_v39_4_en_why_crf18_r1.mp4` 放入 `assets/film/` 并只改此一行即可生效。

---

## 一、对照 v1.51（5 段架构 + 25 条决定）落位总表

| 结构 / 决定 | 方案要求（EXEC-SUMMARY + v1.51） | 本版落位与实现 |
|---|---|---|
| **单页 5 段 + 吸顶目录**（决定 21） | 手机竖屏优先（390×844），纯英文，吸顶 5 项目录：`PEEK / Why Shanghai / Before you decide / Other procedures / Prices & your quote` | `en/index.html` 单页 5 段 + 吸顶 5 项 TOC；滚动越过 50s 片后顶栏与 TOC 自动从黑金玻璃态切换为浅色中性态；支持 URL hash 深链自动展开对应折叠段。 |
| **黑金 → 浅色分区**（视觉基线） | 第 1 段 3D 大头骨 + 8 格 + 8 格放大弹层 + 内嵌 PEEK 画廊 + 50s 片为黑金深色区；50s 片之后切换为 Materialise 风格浅色中性区 | `#zone-dark`（obsidian `#090A0D` + champagne gold `#D0B076`）覆盖第 1 段第 1–4 步；`#zone-light`（`#F9F8F5` + `#FFFFFF`）自第 5 步（7 部位地图）起延续至第 5 段。 |
| **真 3D 交互头骨**（EXEC-SUMMARY §2） | 支持静态模块托管，必须上真 3D（`peek-model.glb`）+ Cömert 式部位热点 + 静态封面回退 | `#peek-skull-viewer`（`@google/model-viewer`）加载 `assets/model/peek-model.glb`，`poster="../assets/views/oblique.jpg"`，内置 7 个 A 名单可点击热点 + 3D/斜/正/侧 2D 切换条 + 底部 7 部位快捷跳转按钮。 |
| **七部位 A 名单 & 5 区/7 部位分开**（决定 1） | 锁定英文：`Brow ridge / Cheekbones / Nasal base / Chin / Jaw angle / Forehead / Crown`；明确区分现有植入组件 5 区与模拟设计 7 部位 | 第 1 段第 5 步设双栏显式拆分（5 区既有组件 vs 7 部位模拟范围）；下颌线并入 `Jaw angle`，全站统一用 `Cheekbones`（无颧弓混用）。 |
| **8 格重做 + 交互切换**（决定 1、EXEC-SUMMARY §2） | 旧 8 格（`L1–L4, R1–R4`）不得上站；男性 4 格在前（颧骨/下颌角/下巴/眉弓），女性 4 格（前额/颅顶/鼻基底/下巴）灰框占位；点按/悬停 150–200ms 切 `Before`/`Simulated after`；下方 `See cases` 按钮深链画廊（不写 `· 0`）；零案例声明只在 8 格下方写一次 | `en/content-data.js` `GRID_8_TILES` 完全重做，未引用任何旧 8 格图；男性 4 格用示教模型参考视图 + 模拟叠加图；女性 4 格用等高占位框；每格支持 `Before`/`Simulated after` 180ms 淡入切换（`aria-pressed`）+ 放大镜 Lightbox + `See cases` 活跃按钮直达对应部位子折叠；零案例声明仅在 8 格下方单写一次。 |
| **内嵌 PEEK 画廊**（安排 C） | 紧贴 8 格下方默认折叠；顶部含流程片 C 缩略占位 + 可折叠 `How to read our photos`（4 句）；7 个 A 类子折叠诚实标示当前 PEEK 0 组 | `#peek-gallery-section` 默认折叠；点击任一 8 格 `See cases` 或 3D/地图深链即自动展开并高亮滚动到对应部位子折叠。 |
| **50 秒片占位**（EXEC-SUMMARY §2） | 用 `skull_peek_v39_3_en_crf18_r1.mp4` + `film_poster.jpg`；保留手机端示意免责句 | `#peek-film-video` 通过唯一替换点 `MEDIA_CONFIG.PEEK_FILM_SRC` 加载 `v39_3`，附原句免责条。 |
| **B-03(b) 7 部位注意事项**（专项管控） | 只取 `占位稿全文` 7 行忠实英译，颅顶留空，不得带入 `约 30%` 等背景行 | 第 1 段第 5 步部位地图面板逐部位渲染忠实英译 6 行，`Crown` 留空为 `[Pending surgeon's draft]`，每行标 `[Pending surgeon confirmation]`。 |
| **5 种材料对照表** | PEEK / Titanium / Silicone / ePTFE / Autologous bone；无商业品牌名；局限性列留空待医生审定；尾句保留 | 桌面为表、手机竖屏（<720px）自动转为堆叠卡片；局限性列全标 `[Pending surgeon confirmation]`；尾句写明 `"PEEK is one option, not the only option. Material suitability is confirmed in person by our surgical team."` |
| **B+C 合并片 + 6 步流程条 + 价格锚与“下一步”块**（决定 5、7、8） | 流程条后接价格锚；按钮顺序 `[Ask a question · free]` 在前、`[See your own face — USD 299]` 在后；299 标准英文句逐字照录；附低门槛句、免费/收费分界句、第 3 段锚点及内嵌 PEEK FAQ（含同源 `When PEEK is not the answer`） | 全部按序落地；`When PEEK is not the answer` 由 `NOT_PEEK_BLOCK` 单一数据源同步渲染到第 1 段 FAQ 与第 3 段。 |
| **第 2 段 Why Shanghai (China)**（决定 10、11、17、25） | 默认展开 3 期自制 YouTube 长视频卡片（三条要点 + 30–60s 精华占位 + 完整片入口）；保留外滩/监控安全保证原话、医院不露医生脸原话、第 3 期恢复在先日程条与桥句；删除“外国人优待”改用获批替代句 | 3 期全部默认展开；第 1 期含监控安全保证原话及三层安全区分；第 2 期机构灰框占位、不露医生脸、不编台数；第 3 期含 `Surgery → Hotel recovery → Follow-up → Free time → Fit-to-fly` 日程条与过渡桥句。 |
| **第 3 段 Before you decide**（决定 6、9、10） | 默认折叠，常显三行预览（三问行+5项`[Pending]`事实条 / Why choose us+Trust摘要 / 6项自办）；副标题 `Safe · Easy · Fair`；展开含机构与 `Our surgical team` 文字资历占位、6 项自办 + CT 上传单动作、12 项×4 列全包边界表、三栏承诺、电话卡两行分写 + 8 APP 清单、5–N 天（默认 15 天）三行拆解与 3 样本行程、美中分开监管口径、10 项风险 + 失败路径、`When PEEK is not the answer`、四问块（`Our surgical team`）、服务边界 | 全部完整实现；点击预览三问行或第 1 段锚点均自动展开第 3 段并滚动定位到 `#risks-recovery`。 |
| **第 4 段 Other procedures**（决定 22、安排 C） | 默认折叠；首行常显强制回指句；放入现站 8 组非 PEEK 故事与 44 张原样案例图（原包 42 张＋补投 2 张，不增删改、不去水印、不加免责），删除虚假的 `Shared with informed client consent` 陈述 | `#other-procedures` 首行常显锁定英文回指句；分类筛选 + 8 组故事 + 44 张 `assets/cases/*.webp` 原样呈现并支持 Lightbox 放大查看（已按补投帖将 `nose-1-supp-113.webp` 补入 `nose-1` 第 1 位、`contouring-2-supp-137.webp` 补入 `contouring-2` 第 2 位）。 |
| **第 5 段 Prices & your quote + 最终免费 CTA**（决定 7、8） | 默认折叠，首行常显 PEEK 书面报价与更新日期/变价前确认句；展开含书面报价清单、299 模拟费与 ~USD 300 植入物设计费分开列明及统一退款规则、按天价结构、54 项 7 类 CNY 价目表（新增 `Stay / Hospital` 占位列）；末段过渡句后仅放免费 WhatsApp + 表单 CTA（不放 299 按钮），表单旁常显隐私与照片同意提示及禁传护照/银行卡提醒；页脚单放 `Working with institutions` 合作入口 | 全部完整落地；54 项支持分类切换与实时搜索；最终 CTA 仅免费咨询入口，无 299 按钮；页脚 `Working with institutions` 弹层与消费者 5 段彻底分流。 |

---

## 二、空缺占位清单（逐条对齐 `MANIFEST.md` §六 G1–G11）

> 说明：下表 G1–G11 与 `F:\codex\peek-zk26-version-1119\MANIFEST.md` 第六节编号 **1:1 严格对应**；另附 3 项衍生素材占位（不占 G 编号）。

| 编号 | MANIFEST 缺口项 | 本版处理方式（绝不编造） |
|---|---|---|
| **G1** | 医生正式文案：颅顶注意事项＋B-03(b) 正式稿 | 第 1 段第 5 步部位地图仅忠实英译 `占位稿全文` 7 行，`Crown` 留空标 `[Pending surgeon's draft]`，其余 6 行标 `[Pending surgeon confirmation]` |
| **G2** | Ep.1–3 成品（封面/精华/全片）＋三期脚本定稿 | 第 2 段 3 期卡片默认展开，各留三条要点＋30–60s 精华位＋完整片入口 `[Unlisted YouTube link — pending filming]`；Ep.2 封面用中性灰框占位 |
| **G3** | 长视频 B、过程片 C 成品 | 第 1 段第 7 步设 B+C 合一入口卡片占位 `[Pending filming & partner authorization]`；第 3 步 PEEK 画廊顶部留过程片 C 缩略占位 |
| **G4** | 机构 9 项素材缺口（机构名、执业许可证、医生资历四字段、关键事实五项数字等） | 第 3 段预览三问事实条 5 项全标 `[Pending]`；`Why choose us` 与四问块统一用 `Our surgical team`，机构名/许可证/资历四字段全标 `[Pending clinic confirmation]` / `[Pending clinic documentation]` |
| **G5** | FAQ 答案正文（首批六问＋各段内嵌问） | 仅保留方案明确锁定口径的问答结构与同源 `When PEEK is not the answer` 块，未写任何无来源答案 |
| **G6** | 五材料对比表五条「真实短板」文案 | 第 1 段第 6 步 5 材料对照表「Key limitations」列全部留空占位 `[Pending surgeon confirmation]`，不编造短板 |
| **G7** | 按天价目数字、价目表新增「住院／停留」列、汇率/税/手续费口径、植入物设计费确数（约 USD 300） | 第 5 段按天价只列 4 行结构并标 `[Pending clinic]`；54 项价目表新增 `Stay / Hospital` 列全标 `[Pending clinic]`；汇率/税/卡费与 `~USD 300` 均标 `[Pending clinic written confirmation]` |
| **G8** | 3D 打印厂家名称与详细资料；B/C 片及女模肖像责任人 | 站内不写具体厂家名，第 3 段监管口径中我方植入物注册资料标 `[Pending manufacturer & clinic verification]`；女性 4 格以等高深色框占位 `[Pending shoot]` |
| **G9** | Hark 10「为什么」地图版补充四句（未批准、无文件） | 严格未上站（零出现），仅保留 B-03(b) 占位稿 7 行；与 `v39_4` 影片严格区分、未混淆 |
| **G10** | CT 上传大小上限 500MB 技术确认、隐私条款法务确认 | 第 1 段流程条 ②、第 3 段 CT 单动作与第 5 段表单旁隐私提示均按方案框架占位并注明单独同意与删除权 |
| **G11** | `Prices last checked [月份]` 实填月份 | 第 5 段常显首行写 `Prices last checked [Month pending verification]`，核对后填实 |
| **附注** | 其他衍生占位（PEEK 真实授权案例当前 0 组、官方 WhatsApp 号码未定、漏包 2 张案例图） | 第 1 段 PEEK 画廊诚实标 `PEEK cases: 0`；`en/config.js` `whatsappNumber` 留空走 `wa.me/?text=` + Gmail (`a2445406836@gmail.com`)；**漏包 2 张案例图（`nose-1-supp-113.webp`、`contouring-2-supp-137.webp`）已于 2026-11-19 15:39 补入完毕，全站案例图现为 44/44 件** |

---

## 三、自主酌情优化项清单（依用户 14:16 授权，在不违背 8 条红线前提下）

1. **双模态顶栏与吸顶 TOC 过渡**：滚动越过 50 秒片（黑金深色区 → 浅色中性区）时，顶部导航与 5 段吸顶目录自动完成深浅主题切换，并高亮当前阅读段，手机竖屏下始终单行可横滑、触控高度 ≥ 44px。
2. **真 3D 头骨 + 2D 视角无缝切换**：在完整加载 `peek-model.glb` 与 7 个可点击热点之外，额外提供 `Interactive 3D / Oblique 2D / Front 2D / Side 2D` 一键切换，兼顾低配手机快速查看与 3D 深度交互。
3. **8 格放大镜 Lightbox 对比**：在保留点按/悬停 180ms 切换的同时，为每格右上角增加 `⤢` 放大镜，支持并排查看 `Before` 与 `Simulated after` 细节。
4. **手机竖屏表格卡片化 + 54 项实时检索**：5 材料表、12 项服务边界表、54 项 CNY 价目表在 `< 720px` 屏幕自动转为零横向滚动的垂直卡片，并为 54 项增加关键词实时过滤与 7 类标签筛选。
5. **跨段深链自动展开与打印全展开**：点击任一折叠段锚点（如第 1 段“疼不疼”链接、第 3 段三问预览行、TOC 锚点）时自动展开目标段并平滑滚动到位；`@media print` 自动展开所有折叠块，方便患者保存或打印沟通。

---

## 四、8 条红线与 B-03(b) 专项自检结果

| 检查项 | 检查结果 | 证据 |
|---|---|---|
| 1. 不触碰 `peek-n41b.pages.dev` / `allevia-aesthetics` | **PASS** | 独立新建 `F:\codex\peek-zk26-site\` 与公开仓库 `anjelicafrancis03-prog/peek-zk26-preview` |
| 2. 44 张 `assets/cases/*.webp` 原样不动 | **PASS** | 44/44 文件（含补投 2 件）与材料包副本 MD5 逐一比对 **0 差异**；无增删替换、无额外免责 |
| 3. 不去任何图片或视频水印 | **PASS** | 全站图片与 `v39_3` 视频未经任何二次裁剪或去水印处理 |
| 4. 价格严格按 `EXEC-SUMMARY §5`，不编造数据 | **PASS** | 299 / 1,000 / ~USD 300 / 12 个月 / 7–14 工作日 / 不可退规则完整一致，待确认项全标占位 |
| 5. 医生不露脸不点名；禁用研究名与违禁词 | **PASS** | 全代码自动化扫描：`your surgeon / Eppley / 刘双立 / 李书远 / FITme / Gore-Tex / Medpor / Almost / 30% / L1–R4.jpg / v39_2 / v39_4 / Shared with informed client consent` 全部 **0 命中** |
| 6. 独立免登录公开预览网址含 `/en/` | **PASS** | `https://anjelicafrancis03-prog.github.io/peek-zk26-preview/en/`（公开 GitHub Pages，免登录直开） |
| 7. 用户锁定原话逐字照用 | **PASS** | 监控安全保证句、外滩/医院/接机开场句、附录 D 全部过渡句、299 标准英文句、变价前确认句均逐字核对 |
| 8. 绝对独立，不读不问不参考他版 | **PASS** | 全程仅基于 `F:\codex\peek-zk26-version-1119\` 独立完成 |
| B-03(b) 专项管控 | **PASS** | 仅忠实英译 `占位稿全文` 7 行（`Crown` 留空），未混入 `约 30%` 或背景核验项 |

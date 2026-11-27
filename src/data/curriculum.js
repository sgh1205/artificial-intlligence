// 课程体系、学习路径与知识图谱数据

export const stages = [
  {
    id: 'foundation',
    index: '01',
    term: '大一 ~ 大二上',
    title: '数理与编程基础',
    summary:
      '这一阶段决定了你后面能走多远。数学不是“考试科目”，而是理解模型的语言；编程不是“会用框架”，而是把想法变成可运行实验的能力。',
    courses: [
      { name: '高等数学', type: '必修 · 核心', tip: '极限、微积分、级数，是梯度与优化的语言' },
      { name: '线性代数', type: '必修 · 核心', tip: '矩阵、特征值、SVD，贯穿所有模型' },
      { name: '概率论与数理统计', type: '必修 · 核心', tip: '分布、期望、极大似然，机器学习的根基' },
      { name: '离散数学', type: '必修', tip: '逻辑、图论，为算法与知识图谱打底' },
      { name: 'Python 程序设计', type: '必修 · 核心', tip: '先写 2000 行代码，再谈框架' },
      { name: '数据结构与算法', type: '必修 · 核心', tip: '复杂度意识决定你能否写出可用的训练代码' },
      { name: '计算机组成原理 / 操作系统', type: '必修', tip: '理解内存、并行与 GPU 为什么快' },
      { name: '数据库 / 计算机网络', type: '必修', tip: '数据从哪里来、模型如何上线' }
    ],
    outcomes: [
      '能独立完成数据清洗、特征处理与小规模建模实验',
      '能手写梯度下降、KNN、K-Means 等基础算法',
      '理解一次前向传播与反向传播在计算什么',
      '数学公式看到不慌，能查资料把推导补齐'
    ]
  },
  {
    id: 'ml-core',
    index: '02',
    term: '大二下 ~ 大三上',
    title: '机器学习核心',
    summary:
      '从“调包”走向“理解”。重点不是记住算法名字，而是掌握偏差-方差、过拟合、正则化、评估指标这些通用思维，它们适用于所有模型。',
    courses: [
      { name: '机器学习', type: '必修 · 核心', tip: '监督 / 无监督 / 集成学习全景' },
      { name: '最优化方法', type: '必修 · 核心', tip: '凸优化、梯度法、拉格朗日乘子' },
      { name: '统计学习方法', type: '推荐', tip: '从概率视角重新理解模型' },
      { name: '数值分析', type: '推荐', tip: '数值稳定性、矩阵分解' },
      { name: '数据可视化', type: '选修', tip: '让实验结果会说话' },
      { name: '数字信号处理', type: '选修', tip: '语音、图像方向的重要基础' }
    ],
    outcomes: [
      '能完成一个完整的 Kaggle 风格建模流程',
      '会用交叉验证、学习曲线诊断模型问题',
      '能读懂经典论文的方法部分',
      '掌握 NumPy / Pandas / scikit-learn 工具链'
    ]
  },
  {
    id: 'deep-learning',
    index: '03',
    term: '大三下 ~ 大四上',
    title: '深度学习与方向课',
    summary:
      '这一阶段开始分化。深度学习是共同底座，之后按视觉、语言、语音、强化学习选择 1~2 个方向深入，做真正有分量的项目。',
    courses: [
      { name: '深度学习', type: '必修 · 核心', tip: 'CNN / RNN / Transformer / 训练技巧' },
      { name: '计算机视觉', type: '方向课', tip: '分类、检测、分割、生成' },
      { name: '自然语言处理', type: '方向课', tip: '表示学习、序列建模、大模型' },
      { name: '语音识别与合成', type: '方向课', tip: '声学模型、端到端语音' },
      { name: '强化学习', type: '方向课', tip: 'MDP、值函数、策略梯度' },
      { name: '知识图谱', type: '方向课', tip: '实体关系抽取、图表示学习' },
      { name: '大模型技术与应用', type: '前沿课', tip: '预训练、微调、RAG、Agent' },
      { name: '多模态学习', type: '前沿课', tip: '图文对齐、统一表征' }
    ],
    outcomes: [
      '能用 PyTorch 从零复现一个中等规模模型',
      '完成 1 个可展示的方向项目（论文级或工程级）',
      '能独立阅读顶会论文并写出复现报告',
      '明确自己的细分方向与优势'
    ]
  },
  {
    id: 'engineering',
    index: '04',
    term: '大四',
    title: '工程实践与科研',
    summary:
      '模型只是系统的一环。真实业务关心的是数据闭环、推理成本、稳定性与效果迭代。毕业设计、竞赛、实习是这个阶段的三个关键词。',
    courses: [
      { name: '机器学习系统 / MLOps', type: '方向课', tip: '训练流水线、监控、版本管理' },
      { name: '分布式计算与并行训练', type: '推荐', tip: '数据并行、模型并行、通信优化' },
      { name: '模型压缩与推理加速', type: '推荐', tip: '量化、剪枝、蒸馏、算子优化' },
      { name: 'AI 产品与伦理', type: '通识', tip: '需求判断、合规、可解释性' },
      { name: '科研训练 / 学科竞赛', type: '实践', tip: '挑战杯、Kaggle、CVPR 竞赛' },
      { name: '毕业设计 / 企业实习', type: '实践 · 核心', tip: '把能力变成作品与经历' }
    ],
    outcomes: [
      '能把模型部署成可访问的服务或应用',
      '理解训练与推理的成本结构，会做取舍',
      '有 1~2 段能讲清楚的技术经历',
      '具备独立解决新问题的工程与研究方法'
    ]
  }
]

// 知识图谱：分层节点与依赖关系
export const layers = [
  { id: 'math', label: '数学基础', color: '#4f46e5' },
  { id: 'code', label: '编程与系统', color: '#2563eb' },
  { id: 'ml', label: '机器学习', color: '#0891b2' },
  { id: 'dl', label: '深度学习', color: '#059669' },
  { id: 'domain', label: '应用方向', color: '#d97706' },
  { id: 'eng', label: '工程落地', color: '#e11d48' }
]

export const graphNodes = [
  // 数学基础
  { id: 'm1', label: '高等数学', layer: 'math', desc: '微积分与级数，是梯度、损失函数与优化的语言。', tip: '重点：导数、偏导、泰勒展开、链式法则。' },
  { id: 'm2', label: '线性代数', layer: 'math', desc: '矩阵运算、特征分解、SVD，是所有模型的数据表示方式。', tip: '重点：矩阵乘法、特征值、正交变换。' },
  { id: 'm3', label: '概率统计', layer: 'math', desc: '分布、期望、极大似然、贝叶斯，是模型不确定性的来源。', tip: '重点：常见分布、条件概率、假设检验。' },
  { id: 'm4', label: '最优化方法', layer: 'math', desc: '凸优化、梯度下降、拉格朗日乘子，训练模型本质上是在解优化问题。', tip: '重点：SGD、动量、约束优化。' },
  { id: 'm5', label: '离散数学', layer: 'math', desc: '逻辑、集合、图论，为算法分析、知识图谱与推理打基础。', tip: '重点：图论、递归关系、命题逻辑。' },

  // 编程与系统
  { id: 'c1', label: 'Python 编程', layer: 'code', desc: 'AI 领域的通用语言，生态覆盖数据处理、训练、部署全流程。', tip: '目标：熟练使用 NumPy / Pandas，写出结构清晰的脚本。' },
  { id: 'c2', label: '数据结构与算法', layer: 'code', desc: '复杂度、递归、动态规划，决定你能否处理大规模数据与工程问题。', tip: '刷题不是目的，理解复杂度与边界才是。' },
  { id: 'c3', label: '计算机系统', layer: 'code', desc: '组成原理、操作系统、网络，帮你理解显存、并行与分布式。', tip: '重点：内存层级、进程线程、GPU 调度。' },
  { id: 'c4', label: '数据库与工程', layer: 'code', desc: 'SQL、数据建模与工程规范，是数据闭环与线上服务的基础。', tip: '重点：SQL、索引、接口与日志。' },

  // 机器学习
  { id: 'ml1', label: '数据处理与分析', layer: 'ml', desc: '清洗、特征工程、探索性分析，真实项目 70% 时间在这里。', tip: '掌握 Pandas、缺失值处理、特征缩放。' },
  { id: 'ml2', label: '经典机器学习', layer: 'ml', desc: '线性模型、树模型、SVM、聚类与集成学习。', tip: '务必手推一遍梯度下降与正则化。' },
  { id: 'ml3', label: '统计学习理论', layer: 'ml', desc: '偏差-方差、泛化误差、VC 维，理解模型为什么有效。', tip: '重点：过拟合、交叉验证、模型选择。' },
  { id: 'ml4', label: '实验与可视化', layer: 'ml', desc: '用图表与指标呈现实验结论，是科研与业务沟通的必备能力。', tip: '掌握 Matplotlib / Seaborn / 指标体系。' },

  // 深度学习
  { id: 'dl1', label: '深度学习基础', layer: 'dl', desc: '反向传播、CNN、RNN、Transformer 与训练技巧。', tip: '能用 PyTorch 从零搭网络并调通。' },
  { id: 'dl2', label: '计算机视觉', layer: 'dl', desc: '分类、检测、分割、生成与三维视觉。', tip: '主线：ResNet → YOLO → U-Net → Diffusion。' },
  { id: 'dl3', label: '自然语言处理', layer: 'dl', desc: '词表示、序列建模、预训练语言模型。', tip: '主线：Word2Vec → LSTM → BERT → LLM。' },
  { id: 'dl4', label: '语音与多模态', layer: 'dl', desc: '语音识别合成、图文对齐与跨模态理解生成。', tip: '关注 Whisper、CLIP 类模型的设计思想。' },
  { id: 'dl5', label: '强化学习', layer: 'dl', desc: '智能体与环境交互，通过奖励信号学习策略。', tip: '主线：Q-Learning → DQN → PPO。' },
  { id: 'dl6', label: '生成模型', layer: 'dl', desc: 'VAE、GAN、扩散模型，学习数据分布并生成新样本。', tip: '理解 ELBO 与去噪过程。' },

  // 应用方向
  { id: 'd1', label: '大模型与 Agent', layer: 'domain', desc: '预训练、指令微调、对齐、RAG、工具调用与智能体。', tip: '动手做一个 RAG + 工具调用的完整应用。' },
  { id: 'd2', label: '推荐与搜索', layer: 'domain', desc: '召回、排序、重排与用户建模，是工业界岗位最多的方向之一。', tip: '掌握双塔、GBDT+LR、序列推荐。' },
  { id: 'd3', label: '具身智能与机器人', layer: 'domain', desc: '感知-决策-控制闭环，让模型在物理世界行动。', tip: '关注 VLA 模型与仿真到真机迁移。' },
  { id: 'd4', label: 'AI for Science', layer: 'domain', desc: '用 AI 加速蛋白质、材料、气象、药物等领域发现。', tip: '需要领域知识 + 几何深度学习。' },
  { id: 'd5', label: '知识图谱与推理', layer: 'domain', desc: '结构化知识表示、图谱构建与结合大模型的知识增强。', tip: '掌握实体抽取、图数据库、GraphRAG。' },

  // 工程落地
  { id: 'e1', label: 'MLOps 与工程化', layer: 'eng', desc: '数据版本、实验管理、持续训练、监控与回滚。', tip: '从把模型封装成 API 开始。' },
  { id: 'e2', label: '模型压缩与推理', layer: 'eng', desc: '量化、剪枝、蒸馏与推理引擎，决定应用的成本与延迟。', tip: '了解 ONNX、TensorRT、vLLM。' },
  { id: 'e3', label: '分布式训练', layer: 'eng', desc: '多卡多机并行、混合精度、通信优化，支撑大模型训练。', tip: '先理解数据并行与显存占用。' },
  { id: 'e4', label: '产品思维与伦理', layer: 'eng', desc: '判断什么问题值得用 AI，处理隐私、偏见与合规。', tip: '技术之外，学会定义问题与评估价值。' }
]

export const graphEdges = [
  ['m1', 'm4'], ['m2', 'm4'], ['m2', 'ml2'], ['m1', 'ml2'], ['m3', 'ml2'],
  ['m3', 'ml3'], ['m5', 'd5'], ['m2', 'dl1'],
  ['c1', 'c2'], ['c1', 'ml1'], ['c2', 'ml1'], ['c4', 'ml1'], ['c3', 'e3'],
  ['ml1', 'ml2'], ['ml1', 'ml4'], ['ml2', 'ml3'], ['ml2', 'd2'], ['ml2', 'd5'],
  ['ml2', 'dl1'], ['m4', 'dl1'],
  ['dl1', 'dl2'], ['dl1', 'dl3'], ['dl1', 'dl5'], ['dl1', 'dl6'],
  ['dl2', 'dl4'], ['dl3', 'dl4'],
  ['dl2', 'd3'], ['dl5', 'd3'], ['dl3', 'd1'], ['dl6', 'd1'], ['dl2', 'd4'],
  ['dl1', 'd4'], ['dl1', 'e3'], ['dl1', 'e2'], ['e2', 'e1'], ['c4', 'e1'],
  ['d1', 'e4'], ['d2', 'e4'], ['ml3', 'e4']
]

export const capabilityMatrix = [
  {
    ability: '数学建模与推导',
    courses: '高等数学、线性代数、概率统计、最优化方法',
    signal: '能独立看懂论文中的公式推导'
  },
  {
    ability: '数据处理与实验设计',
    courses: 'Python、数据分析、机器学习、数据可视化',
    signal: '能设计对照实验并解释指标变化'
  },
  {
    ability: '模型实现与训练',
    courses: '深度学习、计算机视觉 / NLP、强化学习',
    signal: '能用 PyTorch 复现论文核心模块'
  },
  {
    ability: '工程与部署',
    courses: '计算机系统、数据库、MLOps、模型压缩',
    signal: '能把模型部署成稳定可用的服务'
  },
  {
    ability: '科研与表达',
    courses: '科研训练、竞赛、毕业设计',
    signal: '能写清楚问题、方法与结论'
  }
]

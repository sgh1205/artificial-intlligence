// 常用算法与模型数据（含 Python 实现示例）
// 代码示例用于教学演示，生产环境建议配合成熟库与工程规范使用

export const algorithmCategories = [
  '全部',
  '监督学习',
  '无监督学习',
  '深度学习',
  '计算机视觉',
  '自然语言处理',
  '生成模型',
  '强化学习'
]

export const algorithms = [
  {
    id: 'linear-regression',
    name: '线性回归',
    en: 'Linear Regression',
    cat: '监督学习',
    level: '入门',
    tags: ['回归', '最小二乘', '可解释'],
    idea:
      '假设输出是输入的线性组合，用均方误差衡量预测与真实值的差距，再通过正规方程或梯度下降求解参数。它是理解“损失函数 + 优化”的最小完整样本。',
    usage: '房价预测、销量预估、AB 实验中的增量分析，以及作为复杂模型的基线。',
    code: `import numpy as np

def linear_regression(X, y, lr=0.01, epochs=1000):
    """梯度下降求解 y = Xw + b，特征建议先标准化"""
    X = np.c_[np.ones(len(X)), X]           # 拼接偏置列
    w = np.zeros(X.shape[1])
    for _ in range(epochs):
        grad = X.T @ (X @ w - y) / len(y)   # 均方误差梯度
        w -= lr * grad
    return w

w = linear_regression(X_train, y_train)
y_pred = np.c_[np.ones(len(X_test)), X_test] @ w
print("MAE:", np.abs(y_pred - y_test).mean())`
  },
  {
    id: 'logistic-regression',
    name: '逻辑回归',
    en: 'Logistic Regression',
    cat: '监督学习',
    level: '入门',
    tags: ['分类', '概率输出', '基线模型'],
    idea:
      '在线性得分外套一层 Sigmoid，把输出压缩到 (0,1) 作为概率，用交叉熵作为损失。虽然名字里有“回归”，它是最常用的二分类基线。',
    usage: '点击率预估、信用评分、疾病风险预测、内容审核的初筛模型。',
    code: `import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def train_logistic(X, y, lr=0.1, epochs=500):
    X = np.c_[np.ones(len(X)), X]
    w = np.zeros(X.shape[1])
    for _ in range(epochs):
        p = sigmoid(X @ w)
        w -= lr * X.T @ (p - y) / len(y)   # 交叉熵梯度
    return w

def predict(X, w, threshold=0.5):
    X = np.c_[np.ones(len(X)), X]
    return (sigmoid(X @ w) >= threshold).astype(int)`
  },
  {
    id: 'knn',
    name: 'K 近邻',
    en: 'K-Nearest Neighbors',
    cat: '监督学习',
    level: '入门',
    tags: ['惰性学习', '距离度量', '非参数'],
    idea:
      '不显式训练模型，预测时找特征空间里最近的 k 个样本，用投票或平均决定结果。核心在于距离度量与 k 的选择，特征尺度对结果影响很大。',
    usage: '小规模分类、推荐系统的相似召回、缺失值填补、异常检测。',
    code: `import numpy as np
from collections import Counter

def knn_predict(X_train, y_train, x, k=5):
    dist = np.linalg.norm(X_train - x, axis=1)  # 欧氏距离
    nearest = np.argsort(dist)[:k]
    return Counter(y_train[nearest]).most_common(1)[0][0]

# 特征务必先归一化，否则量纲大的特征会主导距离
preds = [knn_predict(X_train, y_train, x) for x in X_test]`
  },
  {
    id: 'decision-tree',
    name: '决策树',
    en: 'Decision Tree',
    cat: '监督学习',
    level: '入门',
    tags: ['树模型', '可解释', '基尼指数'],
    idea:
      '每次选择一个特征与阈值，把数据切成更“纯”的两部分，递归构建树。CART 用基尼指数衡量不纯度，天然可解释，也是随机森林与 GBDT 的基本单元。',
    usage: '风控规则挖掘、客户分群、医疗辅助决策，以及所有集成树模型的基学习器。',
    code: `import numpy as np

def gini(y):
    _, counts = np.unique(y, return_counts=True)
    p = counts / len(y)
    return 1 - (p ** 2).sum()

def best_split(X, y):
    best = (None, None, gini(y) + 1)
    for f in range(X.shape[1]):
        for t in np.unique(X[:, f]):
            left, right = y[X[:, f] <= t], y[X[:, f] > t]
            if len(left) == 0 or len(right) == 0:
                continue
            g = (len(left) * gini(left) + len(right) * gini(right)) / len(y)
            if g < best[2]:
                best = (f, t, g)
    return best[:2]

# 工程中通常使用 sklearn.tree.DecisionTreeClassifier`
  },
  {
    id: 'svm',
    name: '支持向量机',
    en: 'Support Vector Machine',
    cat: '监督学习',
    level: '进阶',
    tags: ['最大间隔', '核技巧', '凸优化'],
    idea:
      '寻找能把两类样本分开、且间隔最大的超平面；通过核函数把低维不可分的数据映射到高维，从而获得非线性边界。',
    usage: '小样本高维分类、文本分类基线、图像传统特征分类。',
    code: `from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

# C 控制正则强度，gamma 控制单个样本的影响半径
model = make_pipeline(
    StandardScaler(),
    SVC(kernel="rbf", C=1.0, gamma="scale")
)
model.fit(X_train, y_train)
print("accuracy:", model.score(X_test, y_test))`
  },
  {
    id: 'random-forest',
    name: '随机森林',
    en: 'Random Forest',
    cat: '监督学习',
    level: '进阶',
    tags: ['Bagging', '集成学习', '特征重要性'],
    idea:
      '用自助采样训练多棵决策树，并在每次分裂时随机抽取特征子集，最后投票。样本与特征的双重随机性降低了方差，让模型更稳。',
    usage: '表格数据分类回归的强基线、风控评分、特征筛选。',
    code: `from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(
    n_estimators=300, max_depth=12,
    min_samples_leaf=3, n_jobs=-1, random_state=42
)
model.fit(X_train, y_train)

print(model.score(X_test, y_test))
print(sorted(zip(model.feature_importances_, features))[::-1][:10])`
  },
  {
    id: 'xgboost',
    name: '梯度提升树 XGBoost',
    en: 'Gradient Boosting Decision Tree',
    cat: '监督学习',
    level: '进阶',
    tags: ['Boosting', '表格数据', '工业界常用'],
    idea:
      '串行地训练一棵棵弱树，每棵新树拟合前面模型的残差（更严格地说是损失函数的负梯度），逐步逼近最优解。配合正则项与列采样，在表格数据上长期占据统治地位。',
    usage: '推荐排序、风控、广告点击率、搜索相关性等工业级场景。',
    code: `import xgboost as xgb

model = xgb.XGBClassifier(
    n_estimators=500,
    learning_rate=0.05,
    max_depth=6,
    subsample=0.8,
    colsample_bytree=0.8,
    early_stopping_rounds=50,
    eval_metric="logloss",
)
model.fit(X_train, y_train, eval_set=[(X_valid, y_valid)], verbose=False)
pred = model.predict_proba(X_test)[:, 1]`
  },
  {
    id: 'naive-bayes',
    name: '朴素贝叶斯',
    en: 'Naive Bayes',
    cat: '监督学习',
    level: '入门',
    tags: ['概率模型', '文本分类', '高效'],
    idea:
      '基于贝叶斯公式计算后验概率，并假设特征在类别条件下相互独立。假设很强，但在高维稀疏文本上效果稳定、训练极快。',
    usage: '垃圾邮件识别、情感分析基线、新闻分类。',
    code: `import numpy as np

def train_nb(X, y):
    return {
        c: (X[y == c].mean(0), X[y == c].var(0) + 1e-9, (y == c).mean())
        for c in np.unique(y)
    }

def predict_nb(model, x):
    scores = {}
    for c, (mu, var, prior) in model.items():
        log_lik = -0.5 * (((x - mu) ** 2) / var + np.log(2 * np.pi * var)).sum()
        scores[c] = log_lik + np.log(prior)     # 对数域避免下溢
    return max(scores, key=scores.get)

model = train_nb(X_train, y_train)`
  },
  {
    id: 'kmeans',
    name: 'K 均值聚类',
    en: 'K-Means',
    cat: '无监督学习',
    level: '入门',
    tags: ['聚类', 'EM 思想', '无标签'],
    idea:
      '先随机初始化 k 个中心，反复执行“把样本分配给最近中心 → 用簇内均值更新中心”，直到收敛。它优化的是簇内平方误差，对初始值与 k 敏感。',
    usage: '用户分群、图像颜色量化、日志聚类、向量索引的粗聚类。',
    code: `import numpy as np

def kmeans(X, k, epochs=100):
    centroids = X[np.random.choice(len(X), k, replace=False)]
    for _ in range(epochs):
        labels = np.argmin(((X[:, None] - centroids) ** 2).sum(-1), axis=1)
        new = np.array([X[labels == i].mean(0) for i in range(k)])
        if np.allclose(new, centroids):
            break
        centroids = new
    return labels, centroids

labels, centers = kmeans(X_scaled, k=5)`
  },
  {
    id: 'pca',
    name: '主成分分析',
    en: 'Principal Component Analysis',
    cat: '无监督学习',
    level: '进阶',
    tags: ['降维', '特征值分解', '可视化'],
    idea:
      '寻找一组正交方向，使数据投影后的方差最大。等价于对协方差矩阵做特征分解，取最大的 k 个特征向量作为新坐标轴。',
    usage: '高维数据可视化、特征压缩、去噪、人脸识别中的特征提取。',
    code: `import numpy as np

def pca(X, k):
    X = X - X.mean(axis=0)                 # 中心化
    cov = np.cov(X, rowvar=False)
    eigvals, eigvecs = np.linalg.eigh(cov)
    idx = np.argsort(eigvals)[::-1][:k]    # 最大的 k 个主成分
    return X @ eigvecs[:, idx]

X_2d = pca(X_scaled, k=2)
print("方差解释比:", np.var(X_2d, axis=0) / np.var(X_scaled, axis=0).sum())`
  },
  {
    id: 'dbscan',
    name: 'DBSCAN 密度聚类',
    en: 'Density-Based Clustering',
    cat: '无监督学习',
    level: '进阶',
    tags: ['密度聚类', '噪声识别', '任意形状'],
    idea:
      '从核心点（邻域内样本数 ≥ min_samples）出发不断扩展，把密度可达的样本连成簇，密度不足的点标记为噪声。不需要预先指定簇数量，能发现任意形状的簇。',
    usage: '地理热点发现、异常检测、用户行为轨迹聚类。',
    code: `from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler

X_scaled = StandardScaler().fit_transform(X)
model = DBSCAN(eps=0.5, min_samples=5, metric="euclidean")
labels = model.fit_predict(X_scaled)

print("簇数量:", len(set(labels)) - (1 if -1 in labels else 0))
print("噪声点:", (labels == -1).sum())`
  },
  {
    id: 'mlp',
    name: '多层感知机',
    en: 'Multi-Layer Perceptron',
    cat: '深度学习',
    level: '入门',
    tags: ['神经网络', '反向传播', '全连接'],
    idea:
      '堆叠线性层与非线性激活，通过反向传播计算梯度并用优化器更新参数。它是所有深度网络的骨架，理解它就理解了训练循环。',
    usage: '表格数据建模、简单分类回归、作为复杂网络的分类头。',
    code: `import torch
from torch import nn

model = nn.Sequential(
    nn.Linear(784, 256), nn.ReLU(), nn.Dropout(0.2),
    nn.Linear(256, 64), nn.ReLU(),
    nn.Linear(64, 10),
)
opt = torch.optim.Adam(model.parameters(), lr=1e-3)
loss_fn = nn.CrossEntropyLoss()

for x, y in train_loader:
    opt.zero_grad()
    loss = loss_fn(model(x), y)
    loss.backward()
    opt.step()`
  },
  {
    id: 'cnn',
    name: '卷积神经网络',
    en: 'Convolutional Neural Network',
    cat: '计算机视觉',
    level: '进阶',
    tags: ['卷积', '局部感受野', '权值共享'],
    idea:
      '用卷积核在空间上滑动提取局部特征，通过堆叠卷积与池化扩大感受野。权值共享大幅减少参数量，并带来平移等变性，是视觉任务的标准结构。',
    usage: '图像分类、缺陷检测、医学影像分割、视频理解。',
    code: `import torch
from torch import nn

class SmallCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
            nn.Conv2d(32, 64, 3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
        )
        self.head = nn.Sequential(
            nn.AdaptiveAvgPool2d(1), nn.Flatten(),
            nn.Linear(64, num_classes),
        )

    def forward(self, x):
        return self.head(self.features(x))`
  },
  {
    id: 'lstm',
    name: 'LSTM 循环网络',
    en: 'Long Short-Term Memory',
    cat: '自然语言处理',
    level: '进阶',
    tags: ['序列建模', '门控机制', '时序'],
    idea:
      '通过输入门、遗忘门、输出门控制记忆单元的写入与保留，缓解普通 RNN 的梯度消失问题，能建模较长的序列依赖。',
    usage: '文本分类、情感分析、股票与传感器时序预测、语音识别声学模型。',
    code: `import torch
from torch import nn

class LSTMClassifier(nn.Module):
    def __init__(self, vocab, hidden=128, classes=2):
        super().__init__()
        self.embed = nn.Embedding(vocab, 128, padding_idx=0)
        self.lstm = nn.LSTM(128, hidden, batch_first=True, bidirectional=True)
        self.fc = nn.Linear(hidden * 2, classes)

    def forward(self, ids):
        out, _ = self.lstm(self.embed(ids))
        return self.fc(out[:, -1])   # 取最后时间步的表示`
  },
  {
    id: 'transformer',
    name: 'Transformer 与自注意力',
    en: 'Transformer',
    cat: '深度学习',
    level: '高阶',
    tags: ['注意力', '并行训练', '大模型基石'],
    idea:
      '用自注意力让序列中每个位置直接与所有位置交互，一次计算全局依赖，且可并行训练。多头注意力、残差连接与层归一化共同构成现代大模型的骨架。',
    usage: '大语言模型、机器翻译、视觉 Transformer、多模态模型。',
    code: `import torch
from torch import nn

class EncoderBlock(nn.Module):
    def __init__(self, d_model=512, nhead=8):
        super().__init__()
        self.attn = nn.MultiheadAttention(d_model, nhead, batch_first=True)
        self.ff = nn.Sequential(
            nn.Linear(d_model, d_model * 4), nn.GELU(),
            nn.Linear(d_model * 4, d_model),
        )
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)

    def forward(self, x):
        h, _ = self.attn(x, x, x)      # 自注意力：Q = K = V
        x = self.norm1(x + h)          # 残差 + 归一化
        return self.norm2(x + self.ff(x))`
  },
  {
    id: 'autoencoder',
    name: '自编码器',
    en: 'Autoencoder',
    cat: '生成模型',
    level: '进阶',
    tags: ['表示学习', '降维', '重构'],
    idea:
      '让网络先把输入压缩到低维隐向量，再重构回原输入；训练目标是重构误差。瓶颈结构迫使模型学习数据的紧凑表示，也可用于去噪与异常检测。',
    usage: '特征压缩、图像去噪、异常检测、扩散模型中的潜空间建模。',
    code: `import torch
from torch import nn

class AutoEncoder(nn.Module):
    def __init__(self, size=784, latent=32):
        super().__init__()
        self.encoder = nn.Sequential(
            nn.Linear(size, 256), nn.ReLU(), nn.Linear(256, latent),
        )
        self.decoder = nn.Sequential(
            nn.Linear(latent, 256), nn.ReLU(),
            nn.Linear(256, size), nn.Sigmoid(),
        )

    def forward(self, x):
        z = self.encoder(x)
        return self.decoder(z), z

# loss = nn.MSELoss()(recon, x)`
  },
  {
    id: 'gan',
    name: '生成对抗网络',
    en: 'Generative Adversarial Network',
    cat: '生成模型',
    level: '高阶',
    tags: ['对抗训练', '生成', '博弈'],
    idea:
      '生成器负责把噪声变成假样本，判别器负责区分真假，两者交替对抗训练。理想状态下生成器学到的分布与真实数据不可区分。',
    usage: '图像生成与修复、风格迁移、数据增强、虚拟人像合成。',
    code: `import torch
from torch import nn

G = nn.Sequential(nn.Linear(64, 256), nn.ReLU(), nn.Linear(256, 784), nn.Tanh())
D = nn.Sequential(nn.Linear(784, 256), nn.LeakyReLU(0.2), nn.Linear(256, 1), nn.Sigmoid())

bce = nn.BCELoss()
opt_g = torch.optim.Adam(G.parameters(), lr=2e-4)
opt_d = torch.optim.Adam(D.parameters(), lr=2e-4)

for real, _ in loader:
    n = real.size(0)
    z = torch.randn(n, 64)
    fake = G(z)
    loss_d = bce(D(real), torch.ones(n, 1)) + bce(D(fake.detach()), torch.zeros(n, 1))
    opt_d.zero_grad(); loss_d.backward(); opt_d.step()

    loss_g = bce(D(fake), torch.ones(n, 1))
    opt_g.zero_grad(); loss_g.backward(); opt_g.step()`
  },
  {
    id: 'diffusion',
    name: '扩散模型',
    en: 'Diffusion Model',
    cat: '生成模型',
    level: '高阶',
    tags: ['去噪', '文生图', 'SOTA'],
    idea:
      '前向过程不断给数据加高斯噪声直至纯噪声，反向过程学习逐步去噪恢复数据。训练目标简化为“预测每一步加入的噪声”，已成为图像与视频生成的主流范式。',
    usage: 'Stable Diffusion 文生图、图像编辑、视频生成、分子与蛋白质设计。',
    code: `import torch
import torch.nn.functional as F

def diffusion_loss(model, x0, t, alpha_bar):
    """DDPM 训练目标：预测第 t 步加入的噪声"""
    eps = torch.randn_like(x0)
    a = alpha_bar[t].sqrt().view(-1, 1, 1, 1)
    xt = a * x0 + (1 - a).sqrt() * eps
    return F.mse_loss(model(xt, t), eps)

# 推理时从纯噪声 x_T 出发，循环调用模型逐步去噪`
  },
  {
    id: 'yolo',
    name: 'YOLO 目标检测',
    en: 'You Only Look Once',
    cat: '计算机视觉',
    level: '进阶',
    tags: ['检测', '实时', '单阶段'],
    idea:
      '把检测统一为单次回归：在特征图上直接预测每个位置的类别与边界框，一次前向即可输出结果，速度远快于两阶段方法，适合实时场景。',
    usage: '工业质检、安防监控、自动驾驶感知、零售货架识别。',
    code: `from ultralytics import YOLO

model = YOLO("yolo11n.pt")

# 在自己的数据集上微调（YOLO 格式标注）
model.train(data="my_dataset.yaml", epochs=50, imgsz=640, batch=16)

# 推理并保存可视化结果
results = model("street.jpg", conf=0.25)
results[0].save("result.jpg")`
  },
  {
    id: 'unet',
    name: 'U-Net 语义分割',
    en: 'U-Net',
    cat: '计算机视觉',
    level: '高阶',
    tags: ['分割', '跳跃连接', '医学影像'],
    idea:
      '编码器逐层下采样提取语义，解码器逐层上采样恢复分辨率，并通过跳跃连接把浅层细节拼接到深层，获得精细的像素级预测。',
    usage: '医学影像分割、遥感地物提取、工业缺陷区域定位。',
    code: `import torch
from torch import nn

def block(cin, cout):
    return nn.Sequential(
        nn.Conv2d(cin, cout, 3, padding=1), nn.BatchNorm2d(cout), nn.ReLU(),
        nn.Conv2d(cout, cout, 3, padding=1), nn.BatchNorm2d(cout), nn.ReLU(),
    )

class UNet(nn.Module):
    def __init__(self, cin=3, classes=2):
        super().__init__()
        self.down1, self.down2 = block(cin, 64), block(64, 128)
        self.pool = nn.MaxPool2d(2)
        self.up = nn.ConvTranspose2d(128, 64, 2, stride=2)
        self.out = nn.Conv2d(64, classes, 1)

    def forward(self, x):
        x1 = self.down1(x)
        x2 = self.down2(self.pool(x1))
        return self.out(self.up(x2) + x1)   # 跳跃连接融合浅层特征`
  },
  {
    id: 'word2vec',
    name: 'Word2Vec 词向量',
    en: 'Word Embedding',
    cat: '自然语言处理',
    level: '进阶',
    tags: ['表示学习', 'Skip-gram', '语义相似'],
    idea:
      '用上下文预测中心词（CBOW）或中心词预测上下文（Skip-gram），把词映射到低维稠密向量。语义相近的词在向量空间中距离更近，可以做类比运算。',
    usage: '文本相似度、推荐召回、传统 NLP 流水线的特征输入。',
    code: `from gensim.models import Word2Vec

sentences = [
    ["人工智能", "正在", "改变", "世界"],
    ["机器", "学习", "是", "人工智能", "的", "核心"],
]
model = Word2Vec(sentences, vector_size=100, window=5, min_count=1, sg=1)

print(model.wv.most_similar("学习", topn=5))
print(model.wv["人工智能"].shape)   # (100,)`
  },
  {
    id: 'bert',
    name: 'BERT 预训练与微调',
    en: 'Bidirectional Encoder Representations',
    cat: '自然语言处理',
    level: '高阶',
    tags: ['预训练', '微调', '理解任务'],
    idea:
      '用掩码语言模型与下一句预测在大规模语料上预训练双向编码器，再在下游任务上微调。它开创了“预训练 + 微调”的范式。',
    usage: '文本分类、情感分析、命名实体识别、检索与排序。',
    code: `from datasets import load_dataset
from transformers import (
    AutoTokenizer, AutoModelForSequenceClassification,
    Trainer, TrainingArguments,
)

ds = load_dataset("imdb")
tok = AutoTokenizer.from_pretrained("bert-base-uncased")

def encode(batch):
    return tok(batch["text"], truncation=True, padding="max_length", max_length=256)

ds = ds.map(encode, batched=True)
model = AutoModelForSequenceClassification.from_pretrained(
    "bert-base-uncased", num_labels=2
)
args = TrainingArguments("out", per_device_train_batch_size=16,
                         num_train_epochs=2, eval_strategy="epoch")
Trainer(model=model, args=args, train_dataset=ds["train"],
        eval_dataset=ds["test"]).train()`
  },
  {
    id: 'llm',
    name: '大语言模型生成',
    en: 'Large Language Model',
    cat: '自然语言处理',
    level: '高阶',
    tags: ['自回归', 'Prompt', 'Agent'],
    idea:
      '基于 Transformer 解码器做自回归预测，预测下一个 token。通过海量语料预训练、指令微调与对齐，模型获得对话、推理与工具调用能力。',
    usage: '智能问答、代码生成、文档总结、RAG 知识库、Agent 任务编排。',
    code: `from transformers import pipeline

generator = pipeline(
    "text-generation",
    model="Qwen/Qwen2.5-1.5B-Instruct",
    device_map="auto",
)
messages = [{"role": "user", "content": "用三句话解释什么是过拟合"}]
out = generator(messages, max_new_tokens=256, do_sample=True, temperature=0.7)
print(out[0]["generated_text"][-1]["content"])`
  },
  {
    id: 'qlearning',
    name: 'Q-Learning',
    en: 'Q-Learning',
    cat: '强化学习',
    level: '入门',
    tags: ['值函数', 'TD 学习', '无模型'],
    idea:
      '用表格记录“状态-动作”的价值 Q(s,a)，通过贝尔曼方程做时序差分更新，并用 ε-贪心平衡探索与利用。它不需要环境模型，是强化学习最直观的入口。',
    usage: '网格世界寻路、简单调度问题、教学与算法验证。',
    code: `import numpy as np

def q_learning(env, episodes=500, alpha=0.1, gamma=0.99, epsilon=0.1):
    Q = np.zeros((env.observation_space.n, env.action_space.n))
    for _ in range(episodes):
        s, _ = env.reset()
        done = False
        while not done:
            a = env.action_space.sample() if np.random.rand() < epsilon else Q[s].argmax()
            s2, r, terminated, truncated, _ = env.step(a)
            target = r + gamma * Q[s2].max() * (not terminated)
            Q[s, a] += alpha * (target - Q[s, a])
            s, done = s2, terminated or truncated
    return Q`
  },
  {
    id: 'dqn',
    name: 'DQN 深度 Q 网络',
    en: 'Deep Q-Network',
    cat: '强化学习',
    level: '高阶',
    tags: ['深度强化学习', '经验回放', '目标网络'],
    idea:
      '用神经网络代替 Q 表来拟合状态价值，并用经验回放与目标网络稳定训练。它让强化学习第一次能够处理高维感知输入，比如游戏画面。',
    usage: '游戏 AI、资源调度、推荐策略优化、机器人控制。',
    code: `from stable_baselines3 import DQN

model = DQN(
    "MlpPolicy", "CartPole-v1",
    learning_rate=1e-3,
    buffer_size=50000,
    exploration_fraction=0.1,
    verbose=1,
)
model.learn(total_timesteps=100_000)
model.save("dqn_cartpole")

obs, _ = model.get_env().reset()
action, _ = model.predict(obs, deterministic=True)`
  },
  {
    id: 'ppo',
    name: 'PPO 近端策略优化',
    en: 'Proximal Policy Optimization',
    cat: '强化学习',
    level: '高阶',
    tags: ['策略梯度', 'Actor-Critic', 'RLHF'],
    idea:
      '属于 Actor-Critic 家族，用裁剪的重要性采样比率限制每次策略更新幅度，在稳定性和样本效率之间取得平衡。也是大模型 RLHF 阶段常用的算法。',
    usage: '机器人控制、游戏 AI、大模型人类偏好对齐（RLHF）。',
    code: `from stable_baselines3 import PPO
from stable_baselines3.common.env_util import make_vec_env

env = make_vec_env("LunarLander-v3", n_envs=8)
model = PPO("MlpPolicy", env, n_steps=1024, batch_size=256, verbose=1)
model.learn(total_timesteps=1_000_000)
model.save("ppo_lunar")

# 评估：多跑几个 episode 看平均回报是否稳定`
  }
]

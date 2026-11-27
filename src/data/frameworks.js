// Python 生态主流开源 AI 框架

export const frameworkCategories = [
  '全部',
  '深度学习',
  '经典机器学习',
  '大模型与生成',
  '推理与部署',
  '计算机视觉',
  '自然语言处理',
  '强化学习',
  '工程与 MLOps',
  '应用界面'
]

export const frameworks = [
  {
    id: 'pytorch',
    name: 'PyTorch',
    en: 'pytorch/pytorch',
    cat: '深度学习',
    year: '2016',
    desc:
      '动态图深度学习框架的事实标准，API 直观、调试方便，学术研究与工业落地都广泛使用。生态包含 torchvision、torchaudio、torchtext 等。',
    install: 'pip install torch torchvision torchaudio',
    code: `import torch

x = torch.randn(64, 3, 32, 32)
net = torch.nn.Sequential(
    torch.nn.Conv2d(3, 16, 3, padding=1),
    torch.nn.ReLU(),
    torch.nn.AdaptiveAvgPool2d(1),
    torch.nn.Flatten(),
    torch.nn.Linear(16, 10),
)
logits = net(x)
print(logits.shape)   # torch.Size([64, 10])`,
    repo: 'https://github.com/pytorch/pytorch',
    doc: 'https://pytorch.org/docs'
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    en: 'tensorflow/tensorflow',
    cat: '深度学习',
    year: '2015',
    desc:
      'Google 推出的端到端机器学习平台，拥有完整的训练、服务与移动端部署链路（TF Serving / TFLite），工业部署体系成熟。',
    install: 'pip install tensorflow',
    code: `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Dense(128, activation="relu"),
    tf.keras.layers.Dense(10, activation="softmax"),
])
model.compile(optimizer="adam",
              loss="sparse_categorical_crossentropy",
              metrics=["accuracy"])
model.fit(x_train, y_train, epochs=5, batch_size=32)`,
    repo: 'https://github.com/tensorflow/tensorflow',
    doc: 'https://www.tensorflow.org/api_docs'
  },
  {
    id: 'keras',
    name: 'Keras',
    en: 'keras-team/keras',
    cat: '深度学习',
    year: '2015',
    desc:
      '高层神经网络 API，设计目标是“以人为本”。可作为 TensorFlow / JAX / PyTorch 的前端，适合快速搭建与教学演示。',
    install: 'pip install keras',
    code: `import keras
from keras import layers

model = keras.Sequential([
    layers.Input(shape=(28, 28, 1)),
    layers.Conv2D(32, 3, activation="relu"),
    layers.MaxPooling2D(),
    layers.Flatten(),
    layers.Dense(10, activation="softmax"),
])
model.summary()`,
    repo: 'https://github.com/keras-team/keras',
    doc: 'https://keras.io/'
  },
  {
    id: 'jax',
    name: 'JAX',
    en: 'jax-ml/jax',
    cat: '深度学习',
    year: '2018',
    desc:
      '基于函数式编程与 XLA 编译的高性能数值计算库，支持自动微分、jit 编译与多设备并行，是研究大模型与科学计算的热门底座。',
    install: 'pip install jax jaxlib',
    code: `import jax
import jax.numpy as jnp

def loss(w, x, y):
    pred = jnp.dot(x, w)
    return jnp.mean((pred - y) ** 2)

grad = jax.grad(loss)(w, x, y)          # 自动求导
loss_jit = jax.jit(loss)                # 编译加速
print(grad.shape)`,
    repo: 'https://github.com/jax-ml/jax',
    doc: 'https://jax.readthedocs.io/'
  },
  {
    id: 'paddle',
    name: 'PaddlePaddle 飞桨',
    en: 'PaddlePaddle/Paddle',
    cat: '深度学习',
    year: '2016',
    desc:
      '百度开源的国产深度学习平台，中文文档与产业模型库完善，配套 PaddleOCR、PaddleNLP 等工具，在工业场景落地较多。',
    install: 'pip install paddlepaddle',
    code: `import paddle

x = paddle.randn([8, 4])
linear = paddle.nn.Linear(4, 2)
y = linear(x)
print(y.shape)   # [8, 2]`,
    repo: 'https://github.com/PaddlePaddle/Paddle',
    doc: 'https://www.paddlepaddle.org.cn/documentation'
  },
  {
    id: 'sklearn',
    name: 'scikit-learn',
    en: 'scikit-learn/scikit-learn',
    cat: '经典机器学习',
    year: '2007',
    desc:
      '最经典的机器学习库，统一的 fit / predict 接口覆盖分类、回归、聚类、降维、特征工程与模型评估，是入门必学工具。',
    install: 'pip install scikit-learn',
    code: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = RandomForestClassifier(n_estimators=100).fit(X_train, y_train)
print(model.score(X_test, y_test))`,
    repo: 'https://github.com/scikit-learn/scikit-learn',
    doc: 'https://scikit-learn.org/stable/'
  },
  {
    id: 'xgboost',
    name: 'XGBoost',
    en: 'dmlc/xgboost',
    cat: '经典机器学习',
    year: '2014',
    desc:
      '工业级梯度提升树实现，精度高、速度快、支持缺失值与正则化，长期是表格数据竞赛与广告推荐排序的首选。',
    install: 'pip install xgboost',
    code: `import xgboost as xgb

model = xgb.XGBClassifier(
    n_estimators=300, max_depth=6,
    learning_rate=0.05, subsample=0.8,
)
model.fit(X_train, y_train, eval_set=[(X_valid, y_valid)], verbose=False)
print(model.predict_proba(X_test)[:, 1][:5])`,
    repo: 'https://github.com/dmlc/xgboost',
    doc: 'https://xgboost.readthedocs.io/'
  },
  {
    id: 'lightgbm',
    name: 'LightGBM',
    en: 'microsoft/LightGBM',
    cat: '经典机器学习',
    year: '2017',
    desc:
      '微软开源的高效 GBDT 实现，采用直方图算法与 Leaf-wise 生长策略，在大规模数据上训练速度与内存表现优秀。',
    install: 'pip install lightgbm',
    code: `import lightgbm as lgb

model = lgb.LGBMClassifier(
    n_estimators=500, learning_rate=0.05,
    num_leaves=63, feature_fraction=0.8,
)
model.fit(X_train, y_train,
          eval_set=[(X_valid, y_valid)],
          callbacks=[lgb.early_stopping(50)])`,
    repo: 'https://github.com/microsoft/LightGBM',
    doc: 'https://lightgbm.readthedocs.io/'
  },
  {
    id: 'transformers',
    name: 'Hugging Face Transformers',
    en: 'huggingface/transformers',
    cat: '大模型与生成',
    year: '2018',
    desc:
      '预训练模型生态的事实中心，提供数万预训练模型的统一加载接口，覆盖 NLP、视觉、音频与多模态任务。',
    install: 'pip install transformers torch',
    code: `from transformers import pipeline

sentiment = pipeline("sentiment-analysis",
                     model="distilbert-base-uncased-finetuned-sst-2-english")
print(sentiment("I love this course!"))
# [{'label': 'POSITIVE', 'score': 0.9998}]`,
    repo: 'https://github.com/huggingface/transformers',
    doc: 'https://huggingface.co/docs/transformers'
  },
  {
    id: 'diffusers',
    name: 'Diffusers',
    en: 'huggingface/diffusers',
    cat: '大模型与生成',
    year: '2022',
    desc:
      'Hugging Face 的扩散模型库，提供文生图、图生图、视频生成等完整流水线，也方便自定义调度器与训练流程。',
    install: 'pip install diffusers transformers accelerate',
    code: `from diffusers import StableDiffusionPipeline
import torch

pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5", torch_dtype=torch.float16
).to("cuda")
image = pipe("a cyberpunk city at night, cinematic light").images[0]
image.save("output.png")`,
    repo: 'https://github.com/huggingface/diffusers',
    doc: 'https://huggingface.co/docs/diffusers'
  },
  {
    id: 'peft',
    name: 'PEFT',
    en: 'huggingface/peft',
    cat: '大模型与生成',
    year: '2022',
    desc:
      '参数高效微调库，支持 LoRA、QLoRA、Prefix Tuning 等方法，让普通显卡也能微调大模型。',
    install: 'pip install peft transformers accelerate',
    code: `from peft import LoraConfig, get_peft_model
from transformers import AutoModelForCausalLM

model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-1.5B")
config = LoraConfig(r=8, lora_alpha=16, target_modules=["q_proj", "v_proj"],
                    lora_dropout=0.05, task_type="CAUSAL_LM")
model = get_peft_model(model, config)
model.print_trainable_parameters()`,
    repo: 'https://github.com/huggingface/peft',
    doc: 'https://huggingface.co/docs/peft'
  },
  {
    id: 'langchain',
    name: 'LangChain',
    en: 'langchain-ai/langchain',
    cat: '大模型与生成',
    year: '2022',
    desc:
      '构建大模型应用的应用层框架，提供链式调用、工具、记忆、RAG 与 Agent 等抽象，适合快速搭建原型。',
    install: 'pip install langchain langchain-openai',
    code: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_template("用一句话解释 {concept}")
chain = prompt | ChatOpenAI(model="gpt-4o-mini")
print(chain.invoke({"concept": "过拟合"}).content)`,
    repo: 'https://github.com/langchain-ai/langchain',
    doc: 'https://python.langchain.com/'
  },
  {
    id: 'llamaindex',
    name: 'LlamaIndex',
    en: 'run-llama/llama_index',
    cat: '大模型与生成',
    year: '2022',
    desc:
      '面向数据的大模型应用框架，擅长文档解析、索引构建与检索增强生成（RAG），适合企业知识库场景。',
    install: 'pip install llama-index',
    code: `from llama_index.core import SimpleDirectoryReader, VectorStoreIndex

documents = SimpleDirectoryReader("./docs").load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()
print(query_engine.query("这份文档讲了什么？"))`,
    repo: 'https://github.com/run-llama/llama_index',
    doc: 'https://docs.llamaindex.ai/'
  },
  {
    id: 'vllm',
    name: 'vLLM',
    en: 'vllm-project/vllm',
    cat: '推理与部署',
    year: '2023',
    desc:
      '高吞吐大模型推理引擎，核心是 PagedAttention 与连续批处理，支持 OpenAI 兼容接口，是服务化部署的主流选择。',
    install: 'pip install vllm',
    code: `from vllm import LLM, SamplingParams

llm = LLM(model="Qwen/Qwen2.5-1.5B-Instruct")
params = SamplingParams(temperature=0.7, max_tokens=128)
outputs = llm.generate(["请介绍注意力机制"], params)
print(outputs[0].outputs[0].text)`,
    repo: 'https://github.com/vllm-project/vllm',
    doc: 'https://docs.vllm.ai/'
  },
  {
    id: 'onnxruntime',
    name: 'ONNX Runtime',
    en: 'microsoft/onnxruntime',
    cat: '推理与部署',
    year: '2018',
    desc:
      '跨平台推理引擎，支持 ONNX 模型在 CPU / GPU / 移动端高效执行，并可与量化工具链配合压缩模型，适合部署到生产环境。',
    install: 'pip install onnxruntime onnx',
    code: `import onnxruntime as ort
import numpy as np

session = ort.InferenceSession("model.onnx",
                               providers=["CPUExecutionProvider"])
input_name = session.get_inputs()[0].name
outputs = session.run(None, {input_name: np.random.randn(1, 3, 224, 224).astype(np.float32)})
print(outputs[0].shape)`,
    repo: 'https://github.com/microsoft/onnxruntime',
    doc: 'https://onnxruntime.ai/docs/'
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    en: 'opencv/opencv',
    cat: '计算机视觉',
    year: '2000',
    desc:
      '最广泛使用的计算机视觉库，提供图像读写、几何变换、滤波、特征提取与视频处理能力，是视觉项目的基础设施。',
    install: 'pip install opencv-python',
    code: `import cv2

img = cv2.imread("input.jpg")
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
blur = cv2.GaussianBlur(gray, (5, 5), 0)
edges = cv2.Canny(blur, 80, 160)
cv2.imwrite("edges.jpg", edges)`,
    repo: 'https://github.com/opencv/opencv',
    doc: 'https://docs.opencv.org/'
  },
  {
    id: 'ultralytics',
    name: 'Ultralytics YOLO',
    en: 'ultralytics/ultralytics',
    cat: '计算机视觉',
    year: '2018',
    desc:
      'YOLO 系列官方维护的工程库，封装了检测、分割、姿态估计与跟踪的训练和部署流程，几行代码即可完成训练到推理。',
    install: 'pip install ultralytics',
    code: `from ultralytics import YOLO

model = YOLO("yolo11n.pt")
results = model("bus.jpg", conf=0.25)
results[0].save("pred.jpg")

for box in results[0].boxes:
    print(box.cls.item(), box.conf.item(), box.xyxy.tolist())`,
    repo: 'https://github.com/ultralytics/ultralytics',
    doc: 'https://docs.ultralytics.com/'
  },
  {
    id: 'spacy',
    name: 'spaCy',
    en: 'explosion/spaCy',
    cat: '自然语言处理',
    year: '2015',
    desc:
      '工业级 NLP 库，提供分词、词性标注、依存句法、命名实体识别与流水线组件，速度快、适合生产环境的传统 NLP 任务。',
    install: 'pip install spacy',
    code: `import spacy

nlp = spacy.load("zh_core_web_sm")
doc = nlp("人工智能正在改变医疗行业")
for ent in doc.ents:
    print(ent.text, ent.label_)
for token in doc[:4]:
    print(token.text, token.pos_)`,
    repo: 'https://github.com/explosion/spaCy',
    doc: 'https://spacy.io/usage'
  },
  {
    id: 'gymnasium',
    name: 'Gymnasium',
    en: 'Farama-Foundation/Gymnasium',
    cat: '强化学习',
    year: '2022',
    desc:
      'OpenAI Gym 的维护继任者，提供标准化强化学习环境接口，是学习与评测 RL 算法的通用基准。',
    install: 'pip install gymnasium',
    code: `import gymnasium as gym

env = gym.make("CartPole-v1")
obs, info = env.reset(seed=42)

for _ in range(200):
    action = env.action_space.sample()
    obs, reward, terminated, truncated, info = env.step(action)
    if terminated or truncated:
        obs, info = env.reset()
env.close()`,
    repo: 'https://github.com/Farama-Foundation/Gymnasium',
    doc: 'https://gymnasium.farama.org/'
  },
  {
    id: 'sb3',
    name: 'Stable-Baselines3',
    en: 'DLR-RM/stable-baselines3',
    cat: '强化学习',
    year: '2020',
    desc:
      '基于 PyTorch 的强化学习算法库，提供 PPO、DQN、SAC 等可靠实现与统一接口，适合做基线对比与工程实验。',
    install: 'pip install stable-baselines3',
    code: `from stable_baselines3 import PPO
from stable_baselines3.common.env_util import make_vec_env

env = make_vec_env("CartPole-v1", n_envs=4)
model = PPO("MlpPolicy", env, verbose=1)
model.learn(total_timesteps=50_000)
model.save("ppo_cartpole")`,
    repo: 'https://github.com/DLR-RM/stable-baselines3',
    doc: 'https://stable-baselines3.readthedocs.io/'
  },
  {
    id: 'ray',
    name: 'Ray',
    en: 'ray-project/ray',
    cat: '工程与 MLOps',
    year: '2018',
    desc:
      '分布式计算框架，包含 Ray Train、Tune、Serve、RLlib 等组件，把训练、调参、服务与强化学习扩展到集群。',
    install: 'pip install "ray[train]"',
    code: `import ray
from ray import tune

ray.init()
tune.run(
    "PPO",
    stop={"training_iteration": 10},
    config={"env": "CartPole-v1", "framework": "torch"},
)`,
    repo: 'https://github.com/ray-project/ray',
    doc: 'https://docs.ray.io/'
  },
  {
    id: 'mlflow',
    name: 'MLflow',
    en: 'mlflow/mlflow',
    cat: '工程与 MLOps',
    year: '2018',
    desc:
      '机器学习生命周期管理平台，覆盖实验追踪、模型注册、打包与部署，帮助团队复现实验、管理模型版本。',
    install: 'pip install mlflow',
    code: `import mlflow

mlflow.set_experiment("demo")
with mlflow.start_run():
    mlflow.log_param("lr", 0.001)
    mlflow.log_metric("accuracy", 0.92)
    mlflow.sklearn.log_model(model, "model")

# 运行 mlflow ui 查看实验看板`,
    repo: 'https://github.com/mlflow/mlflow',
    doc: 'https://mlflow.org/docs/latest/'
  },
  {
    id: 'streamlit',
    name: 'Streamlit',
    en: 'streamlit/streamlit',
    cat: '应用界面',
    year: '2019',
    desc:
      '用纯 Python 快速构建数据应用与 Demo 页面，无需前端知识，特别适合把模型效果做成可交互的展示。',
    install: 'pip install streamlit',
    code: `import streamlit as st

st.title("AI 文本分类 Demo")
text = st.text_area("输入一段文本")
if st.button("预测") and text:
    st.success(f"预测结果：{predict(text)}")
    st.json({"length": len(text)})`,
    repo: 'https://github.com/streamlit/streamlit',
    doc: 'https://docs.streamlit.io/'
  },
  {
    id: 'gradio',
    name: 'Gradio',
    en: 'gradio-app/gradio',
    cat: '应用界面',
    year: '2019',
    desc:
      '快速为大模型与机器学习模型搭建 Web 界面，支持图像、音频、视频等组件，常用于论文 Demo 与模型分享。',
    install: 'pip install gradio',
    code: `import gradio as gr

def greet(name):
    return f"你好，{name}！欢迎学习人工智能。"

demo = gr.Interface(fn=greet, inputs="text", outputs="text",
                    title="AI Compass Demo")
demo.launch()`,
    repo: 'https://github.com/gradio-app/gradio',
    doc: 'https://www.gradio.app/docs'
  }
]

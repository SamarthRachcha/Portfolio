export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  stack: string[];
  details: string[];
  repo: string;
  demo?: string;
};

export type ArchiveProject = {
  title: string;
  note: string;
  year: string;
  repo: string;
};

export const GITHUB_URL = "https://github.com/SamarthRachcha";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/samarth-r-38782b196/";
export const EMAIL = "samarth.rachcha@gmail.com";
export const RESUME_URL = "/samarth-rachcha-resume.pdf";

export const projects: Project[] = [
  {
    slug: "crowd-density-advisor",
    title: "Crowd Density Advisor",
    summary: "Counting and forecasting street crowds from CCTV.",
    year: "2025",
    stack: ["PyTorch", "CSRNet", "LSTM", "FastAPI", "Streamlit"],
    details: [
      "A 1080p video pipeline: sample frames, estimate density maps with CSRNet and a VGG-16 front end, aggregate counts into an hourly series, then forecast with an LSTM.",
      "Forecasts land at MAE 2.361 and RMSE 3.432 — roughly 40% better than the day-of-week and hour-of-day baseline they are scored against.",
      "FastAPI serves the model with lazy loading; Streamlit runs the dashboard, heatmaps and crowd alerts. Inference reaches 15.8 FPS on a T4 GPU.",
    ],
    repo: `${GITHUB_URL}/Capstone-project`,
  },
  {
    slug: "financial-advisor",
    title: "Financial Advisor Agent",
    summary: "A conversational finance tool with real calculators behind it.",
    year: "2025",
    stack: ["Python", "Flask", "LangChain", "Gemini"],
    details: [
      "A Flask app around LangChain and Gemini. Compound interest, portfolio allocation and retirement projections run as plain Python functions; the model explains the numbers rather than inventing them.",
      "Optional NewsAPI headlines give the conversation market context, and the single-page chat posts to one /ask endpoint.",
      "The advisor sits inside a broader agentic-platform experiment: central task routing, tool integration, memory and stateful, context-aware conversations.",
    ],
    repo: `${GITHUB_URL}/AgenticAI`,
  },
  {
    slug: "beverage-recommender",
    title: "Beverage Recommender",
    summary: "1.5 million reviews, one collaborative-filtering model.",
    year: "2024",
    stack: ["PySpark", "MLlib", "ALS"],
    details: [
      "An ALS matrix-factorisation recommender trained with PySpark MLlib on 1.5 million beverage reviews.",
      "Missing values cleaned, an 80/20 train-test split, and RMSE used as the single evaluation metric — 0.55 on a five-point scale.",
      "Produces personalised recommendations per user from the learned latent factors.",
    ],
    repo: `${GITHUB_URL}/Big-Data-Project`,
  },
  {
    slug: "digit-recognition",
    title: "Digit Recognition from Scratch",
    summary: "An MNIST classifier written as NumPy matrix math.",
    year: "2026",
    stack: ["NumPy", "scikit-learn", "SMOTE"],
    details: [
      "A two-layer network with a 40-neuron hidden layer: forward pass, backpropagation and parameter updates written by hand.",
      "SMOTE balances the training set; accuracy and a confusion matrix come from scikit-learn.",
      "TensorFlow appears only to load the MNIST arrays. The classifier itself is ordinary linear algebra.",
    ],
    repo: `${GITHUB_URL}/HandwrittenDigitRecognition`,
  },
  {
    slug: "text-generation-lstm",
    title: "Text Generation with LSTMs",
    summary: "A word-level language model that continues a sentence.",
    year: "2026",
    stack: ["TensorFlow / Keras", "LSTM", "NumPy", "NLTK"],
    details: [
      "Ten words in, one word out: a word-level model trained on a million characters of news text, with two stacked 128-unit LSTM layers.",
      "Contexts are one-hot boolean tensors over the vocabulary; RMSprop and categorical cross-entropy run for fifteen epochs at batch 128.",
      "Generation samples from the top-k next-word probabilities, so a creativity argument trades coherence for variation.",
    ],
    repo: `${GITHUB_URL}/Text_Generation_AI`,
  },
  {
    slug: "twitter-bot-detection",
    title: "Twitter Bot Detection",
    summary: "Separating bot accounts from humans by text and metadata.",
    year: "2024",
    stack: ["scikit-learn", "TF-IDF", "Random Forest", "pandas"],
    details: [
      "Tweets are lowercased and stripped of punctuation and digits, then vectorised with TF-IDF alongside username, hashtags and location.",
      "The sparse text features are hstacked with follower, retweet and mention counts, verification and account age.",
      "A random forest is scored on a held-out 20% split with accuracy and a per-class classification report.",
    ],
    repo: `${GITHUB_URL}/NLP-Project`,
  },
  {
    slug: "mobilenet-inference",
    title: "MobileNetV2 Inference",
    summary: "Pre-trained ImageNet classification, end to end.",
    year: "2024",
    stack: ["Keras", "MobileNetV2", "NumPy"],
    details: [
      "Loads MobileNetV2 with ImageNet weights — no training, just the pre-trained convolutional stack.",
      "Images are resized to 224 × 224 and passed through Keras's preprocess_input before a single forward pass.",
      "Predictions are decoded to the top five ImageNet labels with their confidence scores.",
    ],
    repo: `${GITHUB_URL}/Deep-Learning-Project`,
  },
];

export const archive: ArchiveProject[] = [
  {
    title: "Habit tracker",
    note: "React app with typed components and date-fns day logic.",
    year: "2026",
    repo: `${GITHUB_URL}/Habit-Tracker`,
  },
  {
    title: "To-do list",
    note: "React app with localStorage persistence.",
    year: "2026",
    repo: `${GITHUB_URL}/To-Do-List`,
  },
  {
    title: "PC parts storefront",
    note: "Static multi-page shop with PHP authentication.",
    year: "2024",
    repo: `${GITHUB_URL}/Website`,
  },
];

export const toolbox = [
  {
    label: "Modelling",
    items: [
      "PyTorch",
      "TensorFlow / Keras",
      "scikit-learn",
      "NumPy",
      "pandas",
      "PySpark",
    ],
  },
  {
    label: "Interfaces",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "Flask",
      "Streamlit",
    ],
  },
  {
    label: "Data & tooling",
    items: [
      "OpenCV",
      "NLTK",
      "LangChain",
      "MongoDB",
      "MySQL",
      "Git",
      "Linux CLI",
    ],
  },
];

export const alsoInTheKit = "C, C++, C#, Java, R, SQL";

export const principles = [
  {
    title: "Start with the baseline",
    body: "The crowd forecaster is measured against a day-of-week and hour-of-day average before the LSTM gets any credit. If the simple thing wins, say so.",
  },
  {
    title: "Keep the data path visible",
    body: "Frames become counts, counts become a time series, the series becomes a forecast. Every step is a file you can inspect and re-run.",
  },
  {
    title: "Finish the interface",
    body: "A model that only exists in a notebook is half a project. I ship the dashboard, the API, or the chat UI that puts it in someone's hands.",
  },
];

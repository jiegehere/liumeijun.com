// 配置文件 - 所有可配置内容集中管理
// 说明：修改以下配置项可以自定义网站的各种内容和行为

// 默认配置
const DEFAULT_CONFIG = {
  /**
   * 地理坐标配置
   * 用于地图定位和标记
   */
  COORDS: {
    // 初始化地图中心
    MP_CEN: { lng: 3.894763, lat: 44.529534 },
    // 中国中心
    CN_CEN: { lng: 103.758427, lat: 36.172333 },
    // 嘉应学院
    MZ_JYU: { lng: 116.135018, lat: 24.33438 },
    // 广外艺
    GZ_GTC: { lng: 113.345774, lat: 23.153356 },
    // 广州市
    GD_GZS: { lng: 113.256838, lat: 23.157309 },
    // 河源市
    GD_HYS: { lng: 114.701682, lat: 23.754195 }
  },

  /**
   * 分享配置
   * 用于社交媒体分享
   */
  SHARE: {
    // 分享内容
    CONTENT: '一个送给美君的生日礼物，也是送给所有异地恋人的礼物「变得是距离，不变的是坚持」。 via @LOO2K',
    // 分享链接
    URL: 'http://liumeijun.com/',
    // 分享图片
    PIC: './social.png'
  },

  // 照片数据配置
  PHOTOS: [
    {
      title: '纪念堂',
      content: '<img src="./images/jiniantang.jpg" width="500" height="373" alt="纪念堂" />',
      point: { lng: 113.271147, lat: 23.139616 }
    },
    {
      title: '陈家祠',
      content: '<img src="./images/chenjiaci.jpg" width="500" height="373" alt="陈家祠" />',
      point: { lng: 113.252764, lat: 23.131838 }
    },
    {
      title: '看电影',
      content: '<img src="./images/dianying.jpg" width="500" height="373" alt="看电影" />',
      point: { lng: 113.268865, lat: 23.200458 }
    },
    {
      title: '',
      content: '<img src="./images/chenjiaci1.jpg" width="500" height="373" alt="陈家祠" />',
      point: { lng: 113.252764, lat: 23.131838 }
    },
    {
      title: '吃货',
      content: '<img src="./images/beijingroad.jpg" width="280" height="375" alt="吃货" />',
      point: { lng: 113.275619, lat: 23.127547 }
    },
    {
      title: '',
      content: '<img src="./images/chenjiaci2.jpg" width="500" height="375" alt="陈家祠" />',
      point: { lng: 113.252764, lat: 23.131838 }
    },
    {
      title: '臭美中...',
      content: '<img src="./images/dress1.jpg" width="280" height="375" alt="臭美" />',
      point: { lng: 113.275619, lat: 23.127547 }
    },
    {
      title: '臭美中...',
      content: '<img src="./images/dress2.jpg" width="280" height="375" alt="臭美" />',
      point: { lng: 113.248583, lat: 23.123725 }
    },
    {
      title: '',
      content: '<img src="./images/you.jpg" width="499" height="373" alt="You" />',
      point: { lng: 113.340995, lat: 23.106222 }
    },
    {
      title: '又是离开，又是不舍...',
      content: '<img src="./images/leave.jpg" width="500" height="375" alt="离开" />',
      point: { lng: 113.358452, lat: 23.158306 }
    },
    {
      title: '红海湾',
      content: '<img src="./images/sea.jpg" width="500" height="375" alt="红海湾" />',
      point: { lng: 115.573511, lat: 22.712665 }
    },
    {
      title: '后山',
      content: '<img src="./images/s.jpg" width="500" height="375" alt="后山" />',
      point: { lng: 115.622433, lat: 23.184734 }
    }
  ],

  // 想去的地方数据
  WANNATO: [
    {
      title: '',
      content: '地图标上想去的地方，有一天，带着你去流浪。',
      point: { lng: 103.758427, lat: 36.172333 }
    },
    {
      title: '厦门',
      content: '<img src="./images/wannato/xiamen.jpg" width="500" height="338" alt="wannaTo" />',
      point: { lng: 118.148154, lat: 24.497912 }
    },
    {
      title: '凤凰古镇',
      content: '<img src="./images/wannato/fenghuang.jpg" width="500" height="337" alt="wannaTo" />',
      point: { lng: 100.21191, lat: 26.928061 }
    },
    {
      title: '桂林阳朔',
      content: '<img src="./images/wannato/guilin.jpg" width="499" height="399" alt="wannaTo" />',
      point: { lng: 110.503626, lat: 24.780932 }
    },
    {
      title: '西藏',
      content: '<img src="./images/wannato/xizang.jpg" width="500" height="400" alt="wannaTo" />',
      point: { lng: 91.115691, lat: 29.687083 }
    },
    {
      title: '杭州西湖',
      content: '<img src="./images/wannato/xihu.jpg" width="500" height="327" alt="wannaTo" />',
      point: { lng: 120.151946, lat: 30.250472 }
    }
  ],

  // 标记点数据
  MARKER_TEXT: [
    { lng: 80.050373, lat: 39.924749 },
    { lng: 80.064171, lat: 39.832612 },
    { lng: 80.064171, lat: 39.747453 },
    { lng: 80.054973, lat: 39.647966 },
    { lng: 80.031976, lat: 39.566136 },
    { lng: 80.022777, lat: 39.469951 },
    { lng: 79.990582, lat: 39.366491 },
    { lng: 79.93539, lat: 39.273603 },
    { lng: 79.875599, lat: 39.216379 },
    { lng: 80.165356, lat: 39.697727 },
    { lng: 80.289538, lat: 39.70128 },
    { lng: 80.427518, lat: 39.708386 },
    { lng: 80.537902, lat: 39.708386 },
    { lng: 80.666683, lat: 39.711938 },
    { lng: 80.795464, lat: 39.715491 },
    { lng: 80.123962, lat: 39.402184 },
    { lng: 80.271141, lat: 39.420024 },
    { lng: 80.418319, lat: 39.423591 },
    { lng: 80.570097, lat: 39.423591 },
    { lng: 80.726474, lat: 39.427159 },
    { lng: 80.873652, lat: 39.434292 },
    { lng: 81.039228, lat: 39.434292 },
    { lng: 80.501107, lat: 40.105115 },
    { lng: 80.501107, lat: 40.01676 },
    { lng: 80.501107, lat: 39.921207 },
    { lng: 80.501107, lat: 39.829066 },
    { lng: 80.496508, lat: 39.623071 },
    { lng: 80.496508, lat: 39.544773 },
    { lng: 80.491908, lat: 39.370061 },
    { lng: 80.491908, lat: 39.255725 },
    { lng: 80.491908, lat: 39.166269 },
    { lng: 80.491908, lat: 39.087453 },
    { lng: 79.820407, lat: 39.015724 },
    { lng: 79.949188, lat: 39.008548 },
    { lng: 80.100966, lat: 39.030076 },
    { lng: 80.252744, lat: 39.030076 },
    { lng: 80.41372, lat: 39.030076 },
    { lng: 80.611491, lat: 39.051598 },
    { lng: 80.744871, lat: 39.05877 },
    { lng: 80.924245, lat: 39.05877 },
    { lng: 81.089821, lat: 39.073113 },
    { lng: 81.517558, lat: 39.775851 },
    { lng: 81.517558, lat: 39.708386 },
    { lng: 81.512958, lat: 39.605284 },
    { lng: 81.512958, lat: 39.480645 },
    { lng: 81.494561, lat: 39.38434 },
    { lng: 81.494561, lat: 39.262877 },
    { lng: 81.632541, lat: 39.81488 },
    { lng: 81.738325, lat: 39.811332 },
    { lng: 81.867106, lat: 39.811332 },
    { lng: 82.018884, lat: 39.804238 },
    { lng: 82.018884, lat: 39.704833 },
    { lng: 82.023483, lat: 39.598168 },
    { lng: 82.023483, lat: 39.502027 },
    { lng: 82.028083, lat: 39.395047 },
    { lng: 82.023483, lat: 39.320062 },
    { lng: 82.018884, lat: 39.24142 },
    { lng: 81.853308, lat: 39.219957 },
    { lng: 81.696931, lat: 39.230689 },
    { lng: 81.56815, lat: 39.234266 },
    { lng: 81.63714, lat: 39.530527 },
    { lng: 81.765921, lat: 39.530527 },
    { lng: 81.903901, lat: 39.530527 },
    { lng: 82.621395, lat: 40.020297 },
    { lng: 82.621395, lat: 39.921207 },
    { lng: 82.621395, lat: 39.811332 },
    { lng: 82.621395, lat: 39.708386 },
    { lng: 82.616796, lat: 39.605284 },
    { lng: 82.621395, lat: 39.459255 },
    { lng: 82.621395, lat: 39.35935 },
    { lng: 82.607598, lat: 39.24142 },
    { lng: 82.607598, lat: 39.159108 },
    { lng: 82.483416, lat: 39.647966 },
    { lng: 82.446621, lat: 39.555455 },
    { lng: 82.391429, lat: 39.469951 },
    { lng: 82.736379, lat: 39.687067 },
    { lng: 82.79617, lat: 39.59461 },
    { lng: 82.846762, lat: 39.519841 },
    { lng: 82.984742, lat: 39.829066 },
    { lng: 83.122722, lat: 39.832612 },
    { lng: 83.260702, lat: 39.836158 },
    { lng: 83.398681, lat: 39.846795 },
    { lng: 83.486068, lat: 39.860975 },
    { lng: 83.509065, lat: 39.775851 },
    { lng: 83.495267, lat: 39.694174 },
    { lng: 83.47227, lat: 39.626628 },
    { lng: 82.966345, lat: 39.544773 },
    { lng: 83.150318, lat: 39.551895 },
    { lng: 83.283698, lat: 39.551895 },
    { lng: 83.426277, lat: 39.559016 },
    { lng: 83.578055, lat: 39.559016 },
    { lng: 83.711435, lat: 39.569696 },
    { lng: 83.2699, lat: 40.140424 },
    { lng: 83.251503, lat: 40.066253 },
    { lng: 83.237705, lat: 39.97077 },
    { lng: 83.187112, lat: 39.754553 },
    { lng: 83.145718, lat: 39.658632 },
    { lng: 83.095126, lat: 39.47708 },
    { lng: 83.072129, lat: 39.337923 },
    { lng: 83.021537, lat: 39.216379 },
    { lng: 82.99854, lat: 39.159108 },
    { lng: 83.219308, lat: 39.47708 },
    { lng: 83.315893, lat: 39.387909 },
    { lng: 83.380284, lat: 39.312917 },
    { lng: 83.47687, lat: 39.259301 },
    { lng: 83.596452, lat: 39.202065 },
    { lng: 84.714088, lat: 40.249767 },
    { lng: 84.626701, lat: 40.228618 },
    { lng: 84.49332, lat: 40.179244 },
    { lng: 84.364539, lat: 40.151014 },
    { lng: 84.240358, lat: 40.112178 },
    { lng: 84.148371, lat: 40.080387 },
    { lng: 84.111577, lat: 39.992 },
    { lng: 84.139172, lat: 39.914124 },
    { lng: 84.198964, lat: 39.818426 },
    { lng: 84.014991, lat: 39.690621 },
    { lng: 84.175967, lat: 39.708386 },
    { lng: 84.318546, lat: 39.751003 },
    { lng: 84.479522, lat: 39.743902 },
    { lng: 84.612903, lat: 39.772302 },
    { lng: 84.810674, lat: 39.782949 },
    { lng: 84.976249, lat: 39.807785 },
    { lng: 85.114229, lat: 39.829066 },
    { lng: 84.589906, lat: 40.101583 },
    { lng: 84.589906, lat: 40.009687 },
    { lng: 84.589906, lat: 39.892869 },
    { lng: 84.580708, lat: 39.676405 },
    { lng: 84.571509, lat: 39.519841 },
    { lng: 84.571509, lat: 39.362921 },
    { lng: 84.576108, lat: 39.255725 },
    { lng: 84.576108, lat: 39.166269 },
    { lng: 84.465724, lat: 39.64441 },
    { lng: 84.350741, lat: 39.566136 },
    { lng: 84.240358, lat: 39.480645 },
    { lng: 84.024189, lat: 39.35578 },
    { lng: 84.139172, lat: 39.427159 },
    { lng: 84.695691, lat: 39.694174 },
    { lng: 84.815273, lat: 39.605284 },
    { lng: 84.916458, lat: 39.516279 },
    { lng: 85.036041, lat: 39.452124 },
    { lng: 85.123428, lat: 39.402184 },
    { lng: 85.224613, lat: 39.352209 },
    { lng: 85.376391, lat: 39.298623 },
    { lng: 85.500572, lat: 39.373631 },
    { lng: 85.51437, lat: 39.537651 },
    { lng: 85.348795, lat: 39.555455 },
    { lng: 85.24761, lat: 39.480645 },
    { lng: 81.407174, lat: 40.573219 },
    { lng: 81.250797, lat: 40.618798 },
    { lng: 81.103618, lat: 40.639824 },
    { lng: 80.95644, lat: 40.63632 },
    { lng: 80.901248, lat: 40.562697 },
    { lng: 80.951841, lat: 40.47143 },
    { lng: 81.057625, lat: 40.383557 },
    { lng: 81.204804, lat: 40.327257 },
    { lng: 81.388777, lat: 40.306132 },
    { lng: 81.526756, lat: 40.288523 },
    { lng: 81.696931, lat: 40.277955 },
    { lng: 81.526756, lat: 40.65734 },
    { lng: 81.563551, lat: 40.804295 },
    { lng: 81.696931, lat: 40.846222 },
    { lng: 81.830312, lat: 40.83225 },
    { lng: 81.922298, lat: 40.751849 },
    { lng: 81.926898, lat: 40.653837 },
    { lng: 81.9131, lat: 40.552172 },
    { lng: 81.885504, lat: 40.48548 },
    { lng: 81.848709, lat: 40.387074 },
    { lng: 81.793517, lat: 40.313174 }
  ],

  // 音频配置
  AUDIO: {
    src: './LemonTree.mp3',
    fallback: './LemonTree.ogg'
  },

  // 图片配置
  IMAGES: {
    // 预加载图片列表
    PRELOAD: [
      './images/ticket.jpg',
      './images/beijingroad.jpg',
      './images/chenjiaci.jpg',
      './images/chenjiaci1.jpg',
      './images/chenjiaci2.jpg',
      './images/dianying.jpg',
      './images/dress1.jpg',
      './images/dress2.jpg',
      './images/jiniantang.jpg',
      './images/leave.jpg',
      './images/s.jpg',
      './images/sea.jpg',
      './images/you.jpg',
      './images/wannato/fenghuang.jpg',
      './images/wannato/guilin.jpg',
      './images/wannato/xiamen.jpg',
      './images/wannato/xihu.jpg',
      './images/wannato/xizang.jpg'
    ],
    // 加载动画图片
    LOADING: './images/site/loading.gif',
    // 分享图片
    SHARE: './social.png'
  },

  // 文本配置
  TEXT: {
    // 页面标题
    TITLE: 'Hello Meijun!',
    // 加载提示
    LOADING: '正在加载...',
    // 开始按钮文本
    START: '点击开始',
    // 生日祝福
    BIRTHDAY_WISH: 'Happy birthday to my dearest Meijun :) --by LOO2K',
    // 分享到微博
    SHARE_WEIBO: '分享到微博',
    // 再看一次
    WATCH_AGAIN: '再看一次'
  },

  // 动画配置
  ANIMATION: {
    // 缩放动画速度
    ZOOM_SPEED: 800,
    // 平移动画延迟
    PAN_DELAY: 800,
    // 信息窗口显示时间
    INFO_WINDOW_TIMEOUT: 2500,
    // 标记点添加间隔
    MARKER_INTERVAL: 300
  }
};

console.log(JSON.stringify(DEFAULT_CONFIG));

// 从浏览器存储读取配置
function loadConfigFromStorage() {
  try {
    const storedConfig = localStorage.getItem('siteConfig');
    if (storedConfig) {
      return JSON.parse(storedConfig);
    }
  } catch (error) {
    console.error('Error loading config from storage:', error);
  }
  return null;
}

// 合并默认配置和存储的配置
function mergeConfigs(defaultConfig, storedConfig) {
  if (!storedConfig) {
    return defaultConfig;
  }

  const merged = { ...defaultConfig };

  // 递归合并对象
  function deepMerge(target, source) {
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
          if (!target[key]) {
            target[key] = {};
          }
          deepMerge(target[key], source[key]);
        } else if (Array.isArray(source[key])) {
          // 对于数组，直接替换
          target[key] = source[key];
        } else {
          // 对于基本类型，直接替换
          target[key] = source[key];
        }
      }
    }
  }

  deepMerge(merged, storedConfig);
  return merged;
}

// 保存配置到浏览器存储
function saveConfigToStorage(config) {
  try {
    localStorage.setItem('siteConfig', JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('Error saving config to storage:', error);
    return false;
  }
}

// 创建最终的CONFIG对象
const CONFIG = mergeConfigs(DEFAULT_CONFIG, loadConfigFromStorage());

// 导出配置管理函数（用于配置管理页面）
if (typeof window !== 'undefined') {
  window.ConfigManager = {
    getConfig: function () {
      return CONFIG;
    },
    getDefaultConfig: function () {
      return DEFAULT_CONFIG;
    },
    saveConfig: function (config) {
      const success = saveConfigToStorage(config);
      if (success) {
        // 重新加载页面以应用新配置
        window.location.reload();
      }
      return success;
    },
    resetConfig: function () {
      localStorage.removeItem('siteConfig');
      window.location.reload();
    }
  };
}
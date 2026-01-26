// 配置项， 实际不是读这里的，从后端接口返回的，这里只是提供的模板
const DEFAULT_CONFIG = {
  /**
   * 地理坐标配置
   * 用于地图定位和标记
   */
  COORDS: {
    // 初始化地图中心
    INIT_MP_CEN: { lng: 3.894763, lat: 44.529534 },
    // 想去的地方-中国中心
    WANT_TO_CN_CEN: { lng: 103.758427, lat: 36.172333 }
  },

  /**
   * 位置配置
   * 用于展示男方、女方位置和中间城市
   */
  LOCATIONS: {
    // 男方位置
    BOY: {
      name: "嘉应学院",
      coords: { lng: 116.135018, lat: 24.33438 }
    },
    // 女方位置
    GIRL: {
      name: "广外艺",
      coords: { lng: 113.345774, lat: 23.153356 }
    },
    // 中间城市
    MIDDLE: {
      name: "河源市",
      coords: { lng: 114.701682, lat: 23.754195 }
    },
    // 照片展示开始位置
    PHOTO_START_LOC: {
      name: "广州市",
      coords: { lng: 113.256838, lat: 23.157309 }
    }
  },

  /**
   * 路线信息配置
   * 用于展示路线和距离
   */
  ROUTE_INFO: [
    {
      title: '梅州 → 广州',
      contentType: 'text',
      content: '426 km.',
      point: { lng: 116.135018, lat: 24.33438 }
    },
    {
      title: '梅州 → 广州',
      contentType: 'text',
      content: '5 hours by train.',
      point: { lng: 113.345774, lat: 23.153356 }
    },
    {
      title: '变得是距离，不变的是坚持；',
      contentType: 'image',
      content: './images/ticket.jpg',
      point: { lng: 116.135018, lat: 24.33438 }
    }
  ],

  // 照片数据配置
  PHOTOS: [
    {
      title: '纪念堂',
      contentType: 'image',
      content: './images/jiniantang.jpg',
      point: { lng: 113.271147, lat: 23.139616 }
    },
    {
      title: '陈家祠',
      contentType: 'image',
      content: './images/chenjiaci.jpg',
      point: { lng: 113.252764, lat: 23.131838 }
    },
    {
      title: '看电影',
      contentType: 'image',
      content: './images/dianying.jpg',
      point: { lng: 113.268865, lat: 23.200458 }
    },
    {
      title: '',
      contentType: 'image',
      content: './images/chenjiaci1.jpg',
      point: { lng: 113.252764, lat: 23.131838 }
    },
    {
      title: '吃货',
      contentType: 'image',
      content: './images/beijingroad.jpg',
      point: { lng: 113.275619, lat: 23.127547 }
    },
    {
      title: '',
      contentType: 'image',
      content: './images/chenjiaci2.jpg',
      point: { lng: 113.252764, lat: 23.131838 }
    },
    {
      title: '臭美中...',
      contentType: 'image',
      content: './images/dress1.jpg',
      point: { lng: 113.275619, lat: 23.127547 }
    },
    {
      title: '臭美中...',
      contentType: 'image',
      content: './images/dress2.jpg',
      point: { lng: 113.248583, lat: 23.123725 }
    },
    {
      title: '',
      contentType: 'image',
      content: './images/you.jpg',
      point: { lng: 113.340995, lat: 23.106222 }
    },
    {
      title: '又是离开，又是不舍...',
      contentType: 'image',
      content: './images/leave.jpg',
      point: { lng: 113.358452, lat: 23.158306 }
    },
    {
      title: '红海湾',
      contentType: 'image',
      content: './images/sea.jpg',
      point: { lng: 115.573511, lat: 22.712665 }
    },
    {
      title: '后山',
      contentType: 'image',
      content: './images/s.jpg',
      point: { lng: 115.622433, lat: 23.184734 }
    }
  ],

  // 想去的地方数据
  WANNATO: [
    {
      title: '',
      contentType: 'text',
      content: '地图标上想去的地方，有一天，带着你去流浪。',
      point: { lng: 103.758427, lat: 36.172333 }
    },
    {
      title: '厦门',
      contentType: 'image',
      content: './images/wannato/xiamen.jpg',
      point: { lng: 118.148154, lat: 24.497912 }
    },
    {
      title: '凤凰古镇',
      contentType: 'image',
      content: './images/wannato/fenghuang.jpg',
      point: { lng: 100.21191, lat: 26.928061 }
    },
    {
      title: '桂林阳朔',
      contentType: 'image',
      content: './images/wannato/guilin.jpg',
      point: { lng: 110.503626, lat: 24.780932 }
    },
    {
      title: '西藏',
      contentType: 'image',
      content: './images/wannato/xizang.jpg',
      point: { lng: 91.115691, lat: 29.687083 }
    },
    {
      title: '杭州西湖',
      contentType: 'image',
      content: './images/wannato/xihu.jpg',
      point: { lng: 120.151946, lat: 30.250472 }
    }
  ],

  // 生日快乐标记点数据
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
    MARKER_INTERVAL: 200
  },

  /**
   * 分享配置
   * 用于社交媒体分享
   */
  SHARE: {
    // 分享内容
    CONTENT: '一个送给美君的生日礼物，也是送给所有异地恋人的礼物「变得是距离，不变的是坚持」。 via @LOO2K',
    // 分享链接
    URL: 'http://liumeijun.com/xxxxxxxxxxx',
    // 分享图片
    PIC: './social.png'
  }
};

console.log(JSON.stringify(DEFAULT_CONFIG));
// 从后端API获取配置
async function loadConfigFromApi() {
  try {
    // 1. 等待 fetch 请求完成，拿到实际的响应对象
    const response = await fetch('/api/config');
    console.log('response', response.ok); // 此时才是真正的请求成功状态
    
    // 2. 判断响应状态是否正常（HTTP 状态码 200-299）
    if (response.ok) {
      // 3. 等待 JSON 解析完成，返回配置数据
      const configData = await response.json();
      return configData;
    } else {
      // 处理 HTTP 错误（如 404/500）
      console.error('API 请求失败，状态码：', response.status);
    }
  } catch (error) {
    // 处理网络错误（如断网、跨域）
    console.error('Error loading config from API:', error);
  }
  return null;
}

// 保存配置到后端API
async function saveConfigToApi(config) {
  try {
    const response = await fetch('/api/config', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    });
    if (response.ok) {
      const result = await response.json();
      return result.success;
    }
  } catch (error) {
    console.error('Error saving config to API:', error);
  }
  return false;
}

// 上传图片到后端API
async function uploadImageToApi(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
  return { success: false, message: '上传失败' };
}

// 创建最终的CONFIG对象
let CONFIG = {};

// 初始化配置
async function initConfig() {
  try {
    const apiConfig = await loadConfigFromApi();
    if (apiConfig) {
      CONFIG = apiConfig;
    }
    console.log('CONFIG', CONFIG);
  } catch (error) {
    alert('初始化配置失败：' + error.message);
    console.error('Error initializing config:', error);
  }
}

// 导出配置管理函数（用于配置管理页面）
if (typeof window !== 'undefined') {
  window.ConfigManager = {
    async getConfig() {
      await initConfig();
      return CONFIG;
    }, 
    async saveConfig(config) {
      const success = await saveConfigToApi(config);
      if (success) {
        // 更新本地CONFIG对象
        CONFIG = config;
        // 重新加载页面以应用新配置
        window.location.reload();
      }
      return success;
    },
    uploadImage: uploadImageToApi
  };
}
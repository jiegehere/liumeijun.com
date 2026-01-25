// 配置文件 - 所有可配置内容集中管理
// 说明：修改以下配置项可以自定义网站的各种内容和行为

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
    getConfig: function () {
      initConfig();
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
  
  // 初始化配置
  initConfig();
}
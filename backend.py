#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
后端服务
提供配置管理和图片上传功能
"""

import os
import json
import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import re

# 配置文件路径
CONFIG_FILE = 'config.json'
# 上传图片保存目录
UPLOAD_DIR = 'uploads'

# 确保上传目录存在
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

# 加载默认配置
DEFAULT_CONFIG = {
    "COORDS": {
        "INIT_MP_CEN": {"lng": 3.894763, "lat": 44.529534},
        "WANT_TO_CN_CEN": {"lng": 103.758427, "lat": 36.172333}
    },
    "LOCATIONS": {
        "BOY": {"name": "嘉应学院", "coords": {"lng": 116.135018, "lat": 24.33438}},
        "GIRL": {"name": "广外艺", "coords": {"lng": 113.345774, "lat": 23.153356}},
        "MIDDLE": {"name": "河源市", "coords": {"lng": 114.701682, "lat": 23.754195}},
        "PHOTO_START_LOC": {"name": "广州市", "coords": {"lng": 113.256838, "lat": 23.157309}}
    },
    "ROUTE_INFO": [
        {"title": "梅州 → 广州", "contentType": "text", "content": "426 km.", "point": {"lng": 116.135018, "lat": 24.33438}},
        {"title": "梅州 → 广州", "contentType": "text", "content": "5 hours by train.", "point": {"lng": 113.345774, "lat": 23.153356}},
        {"title": "变得是距离，不变的是坚持；", "contentType": "image", "content": "./images/ticket.jpg", "point": {"lng": 116.135018, "lat": 24.33438}}
    ],
    "PHOTOS": [],
    "WANNATO": [],
    "MARKER_TEXT": [],
    "AUDIO": {
        "src": "./LemonTree.mp3",
        "fallback": "./LemonTree.ogg"
    },
    "IMAGES": {
        "LOADING": "./images/site/loading.gif",
        "SHARE": "./social.png"
    },
    "TEXT": {
        "TITLE": "Hello Meijun!",
        "LOADING": "正在加载...",
        "START": "点击开始",
        "BIRTHDAY_WISH": "Happy birthday to my dearest girl :) --by XXX",
        "SHARE_WEIBO": "分享到微博",
        "WATCH_AGAIN": "再看一次"
    },
    "ANIMATION": {
        "ZOOM_SPEED": 800,
        "PAN_DELAY": 800,
        "INFO_WINDOW_TIMEOUT": 2500,
        "MARKER_INTERVAL": 200
    },
    "SHARE": {
        "CONTENT": "一个送给小美的生日礼物，也是送给所有异地恋人的礼物「变得是距离，不变的是坚持」。 via @你想念的",
        "URL": "http://together.xiaofs.cn/",
        "PIC": "./social.png"
    }
}

# 加载配置
if not os.path.exists(CONFIG_FILE):
    with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
        json.dump(DEFAULT_CONFIG, f, ensure_ascii=False, indent=2)

# 读取配置
def load_config():
    try:
        with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        
        print(f"Error loading config: {e}")
        exit(0)
        return DEFAULT_CONFIG

# 保存配置
def save_config(config):
    try:
        with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
            json.dump(config, f, ensure_ascii=False, indent=2)
        return True
    except Exception as e:
        print(f"Error saving config: {e}")
        return False

# 生成唯一文件名
def generate_unique_filename(filename):
    ext = os.path.splitext(filename)[1]
    timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
    return f"{timestamp}{ext}"

# 自定义请求处理器
class RequestHandler(BaseHTTPRequestHandler):
    # 设置CORS头
    def _set_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    # 处理OPTIONS请求
    def do_OPTIONS(self):
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()
    
    # 处理GET请求
    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # 获取配置接口
        if path == '/api/config':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._set_cors_headers()
            self.end_headers()
            
            config = load_config()
            self.wfile.write(json.dumps(config, ensure_ascii=False).encode('utf-8'))
        
        # 静态文件服务
        else:
            # 尝试提供静态文件
            file_path = '.' + path
            if os.path.exists(file_path) and os.path.isfile(file_path):
                self.send_response(200)
                # 根据文件扩展名设置Content-Type
                if file_path.endswith('.html'):
                    self.send_header('Content-Type', 'text/html')
                elif file_path.endswith('.js'):
                    self.send_header('Content-Type', 'application/javascript')
                elif file_path.endswith('.css'):
                    self.send_header('Content-Type', 'text/css')
                elif file_path.endswith(('.jpg', '.jpeg', '.png', '.gif')):
                    self.send_header('Content-Type', 'image/jpeg' if file_path.endswith(('.jpg', '.jpeg')) else 'image/png' if file_path.endswith('.png') else 'image/gif')
                elif file_path.endswith(('.mp3', '.ogg')):
                    self.send_header('Content-Type', 'audio/mpeg' if file_path.endswith('.mp3') else 'audio/ogg')
                self.end_headers()
                with open(file_path, 'rb') as f:
                    self.wfile.write(f.read())
            else:
                self.send_response(404)
                self.end_headers()
                self.wfile.write(b'404 Not Found')
    
    # 处理POST请求
    def do_POST(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # 保存配置接口
        if path == '/api/config':
            # 读取请求体
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                config = json.loads(post_data.decode('utf-8'))
                success = save_config(config)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self._set_cors_headers()
                self.end_headers()
                
                response = {"success": success, "message": "配置保存成功" if success else "配置保存失败"}
                self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self._set_cors_headers()
                self.end_headers()
                
                response = {"success": False, "message": f"解析配置失败: {str(e)}"}
                self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
        
        # 图片上传接口
        elif path == '/api/upload':
            try:
                # 解析multipart/form-data
                content_type = self.headers.get('Content-Type', '')
                if not content_type.startswith('multipart/form-data'):
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self._set_cors_headers()
                    self.end_headers()
                    response = {"success": False, "message": "无效的Content-Type"}
                    self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
                    return
                
                # 提取boundary
                boundary = content_type.split('boundary=')[1].encode('utf-8')
                content_length = int(self.headers['Content-Length'])
                
                # 读取请求体
                body = self.rfile.read(content_length)
                
                # 解析multipart数据
                parts = body.split(b'--' + boundary)
                file_data = None
                filename = None
                
                for part in parts:
                    if part.strip():
                        # 查找文件名
                        filename_match = re.search(r'filename="([^"]+)"', part.decode('utf-8', errors='ignore'))
                        if filename_match:
                            filename = filename_match.group(1)
                            # 查找文件数据开始位置
                            data_start = part.find(b'\r\n\r\n') + 4
                            if data_start > 4:
                                file_data = part[data_start:-2]  # 移除末尾的\r\n
                if not file_data:
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self._set_cors_headers()
                    self.end_headers()
                    response = {"success": False, "message": "未选择文件"}
                    self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
                    return
                
                # 生成唯一文件名
                filename = generate_unique_filename(filename)
                file_path = os.path.join(UPLOAD_DIR, filename)
                
                # 保存文件
                with open(file_path, 'wb') as f:
                    f.write(file_data)
                
                # 生成文件URL
                file_url = f'/uploads/{filename}'
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self._set_cors_headers()
                self.end_headers()
                
                response = {"success": True, "url": file_url, "message": "文件上传成功"}
                self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self._set_cors_headers()
                self.end_headers()
                
                response = {"success": False, "message": f"上传失败: {str(e)}"}
                self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
        
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'404 Not Found')

def run_server():
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, RequestHandler)
    print('Server running at http://localhost:8000')
    print('API endpoints:')
    print('  GET  /api/config        - 获取配置')
    print('  POST /api/config        - 保存配置')
    print('  POST /api/upload        - 上传图片')
    print('Static files:')
    print('  http://localhost:8000/config-manager.html - 配置管理页面')
    print('  http://localhost:8000/index.html          - 网站首页')
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()
<?php
// 配置文件路径
const CONFIG_FILE = 'config.json';
// 上传图片保存目录
const UPLOAD_DIR = 'uploads';

// 确保上传目录存在
if (!file_exists(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0777, true);
}

// 加载默认配置
const DEFAULT_CONFIG_FILE = 'defalut_config.json';
// 加载配置
$file = CONFIG_FILE;
if (!file_exists(CONFIG_FILE)) {
    echo "Config file " . CONFIG_FILE . " not found, using default config\n";
    $file = DEFAULT_CONFIG_FILE;
}

// 读取配置
function load_config($file) {
    echo "Loading config from " . $file . "\n";
    try {
        if (!file_exists($file)) {
            return [];
        }
        $content = file_get_contents($file);
        return json_decode($content, true);
    } catch (Exception $e) {
        echo "Error loading config: " . $e->getMessage() . "\n";
        return [];
    }
}

// 保存配置
function save_config($config) {
    try {
        $result = file_put_contents(CONFIG_FILE, json_encode($config, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        return $result !== false;
    } catch (Exception $e) {
        echo "Error saving config: " . $e->getMessage() . "\n";
        return false;
    }
}

// 生成唯一文件名
function generate_unique_filename($filename) {
    $ext = pathinfo($filename, PATHINFO_EXTENSION);
    $timestamp = date('YmdHis');
    return $timestamp . '.' . $ext;
}

// 设置CORS头
function set_cors_headers() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
}

// 处理OPTIONS请求
function handle_options() {
    http_response_code(200);
    set_cors_headers();
    exit;
}

// 处理GET请求
function handle_get($path) {
    // 获取配置接口
    if ($path === '/api/config') {
        http_response_code(200);
        header('Content-Type: application/json');
        set_cors_headers();
        
        $config = load_config($GLOBALS['file']);
        echo json_encode($config, JSON_UNESCAPED_UNICODE);
        exit;
    }
    
    // 静态文件服务
    else {
        // 尝试提供静态文件
        $file_path = '.' . $path;
        // 处理根路径，返回index.html
        if ($path === '/') {
            $file_path = './index.html';
        }
        if (file_exists($file_path) && is_file($file_path)) {
            http_response_code(200);
            // 根据文件扩展名设置Content-Type
            $extension = pathinfo($file_path, PATHINFO_EXTENSION);
            switch ($extension) {
                case 'html':
                    header('Content-Type: text/html');
                    break;
                case 'js':
                    header('Content-Type: application/javascript');
                    break;
                case 'css':
                    header('Content-Type: text/css');
                    break;
                case 'jpg':
                case 'jpeg':
                    header('Content-Type: image/jpeg');
                    break;
                case 'png':
                    header('Content-Type: image/png');
                    break;
                case 'gif':
                    header('Content-Type: image/gif');
                    break;
                case 'mp3':
                    header('Content-Type: audio/mpeg');
                    break;
                case 'ogg':
                    header('Content-Type: audio/ogg');
                    break;
            }
            readfile($file_path);
            exit;
        } else {
            http_response_code(404);
            echo '404 Not Found';
            exit;
        }
    }
}

// 处理POST请求
function handle_post($path) {
    // 保存配置接口
    if ($path === '/api/config') {
        // 读取请求体
        $content_length = $_SERVER['CONTENT_LENGTH'] ?? 0;
        $post_data = file_get_contents('php://input');
        
        try {
            $config = json_decode($post_data, true);
            $success = save_config($config);
            
            http_response_code(200);
            header('Content-Type: application/json');
            set_cors_headers();
            
            $response = ["success" => $success, "message" => $success ? "配置保存成功" : "配置保存失败"];
            echo json_encode($response, JSON_UNESCAPED_UNICODE);
            exit;
        } catch (Exception $e) {
            http_response_code(400);
            header('Content-Type: application/json');
            set_cors_headers();
            
            $response = ["success" => false, "message" => "解析配置失败: " . $e->getMessage()];
            echo json_encode($response, JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
    
    // 图片上传接口
    elseif ($path === '/api/upload') {
        try {
            // 检查是否有文件上传
            if (!isset($_FILES['file'])) {
                http_response_code(400);
                header('Content-Type: application/json');
                set_cors_headers();
                $response = ["success" => false, "message" => "未选择文件"];
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
                exit;
            }
            
            $file = $_FILES['file'];
            
            // 检查上传错误
            if ($file['error'] !== UPLOAD_ERR_OK) {
                http_response_code(400);
                header('Content-Type: application/json');
                set_cors_headers();
                $response = ["success" => false, "message" => "文件上传失败: 错误码 " . $file['error']];
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
                exit;
            }
            
            // 生成唯一文件名
            $filename = generate_unique_filename($file['name']);
            $file_path = UPLOAD_DIR . '/' . $filename;
            
            // 保存文件
            if (move_uploaded_file($file['tmp_name'], $file_path)) {
                // 生成文件URL
                $file_url = '/uploads/' . $filename;
                
                http_response_code(200);
                header('Content-Type: application/json');
                set_cors_headers();
                
                $response = ["success" => true, "url" => $file_url, "message" => "文件上传成功"];
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
                exit;
            } else {
                http_response_code(500);
                header('Content-Type: application/json');
                set_cors_headers();
                
                $response = ["success" => false, "message" => "文件保存失败"];
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
                exit;
            }
        } catch (Exception $e) {
            http_response_code(500);
            header('Content-Type: application/json');
            set_cors_headers();
            
            $response = ["success" => false, "message" => "上传失败: " . $e->getMessage()];
            echo json_encode($response, JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
    
    else {
        http_response_code(404);
        echo '404 Not Found';
        exit;
    }
}

// 获取请求方法和路径
$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['REQUEST_URI'];

// 移除查询参数
$path = strtok($path, '?');

// 处理不同的请求方法
switch ($method) {
    case 'OPTIONS':
        handle_options();
        break;
    case 'GET':
        handle_get($path);
        break;
    case 'POST':
        handle_post($path);
        break;
    default:
        http_response_code(405);
        set_cors_headers();
        echo 'Method Not Allowed';
        exit;
}
?>
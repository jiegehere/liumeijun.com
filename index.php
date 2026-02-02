<?php
// 配置文件路径
const CONFIG_FILE = 'config/config.json';
// 上传图片保存目录
const UPLOAD_DIR = 'uploads/images/';
// 上传音频保存目录
const AUDIO_UPLOAD_DIR = 'uploads/music/';

// 确保配置目录存在
if (!file_exists('config')) {
    mkdir('config', 0777, true);
}

// 确保上传目录存在
if (!file_exists(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0777, true);
}

// 确保音频上传目录存在
if (!file_exists(AUDIO_UPLOAD_DIR)) {
    mkdir(AUDIO_UPLOAD_DIR, 0777, true);
}

// 加载默认配置
const DEFAULT_CONFIG_FILE = 'config/defalut_config.json';

// 授权码文件
const CODE_FILE = 'config/code.csv';

// 加载配置
$file = CONFIG_FILE;
if (!file_exists(CONFIG_FILE)) {
    echo "Config file " . CONFIG_FILE . " not found, using default config\n";
    $file = DEFAULT_CONFIG_FILE;
}

function readCsvAllLines($file)
{
    $codes = [];
    // 1. 尝试打开文件，判断是否打开成功
    $handle = fopen($file, 'r');
    if (!$handle) {
        die("错误：无法打开文件 " . $file . "，请检查路径和读取权限");
    }
    // 2. 循环读取每一行，直到文件末尾
    while (($row = fgetcsv($handle)) !== false) {
        // 3. 跳过空行（手动实现 FILE_SKIP_EMPTY_LINES 的效果）
        // 过滤掉所有空元素，判断是否为纯空行
        $trimmedRow = array_filter($row, function ($value) {
            return !empty(trim($value));
        });
        if (empty($trimmedRow)) {
            continue;
        }
        // 4. 移除每行末尾的换行符（手动实现 FILE_IGNORE_NEW_LINES 的效果）
        $cleanRow = array_map(function ($value) {
            return rtrim($value, "\r\n");
        }, $row);
        // 5. 将有效行存入数组
        $codes[] = $cleanRow;
    }

    // 6. 关闭文件句柄，释放资源
    fclose($handle);

    return $codes;
}

// 判断编码是否有效, token非空时校验token有效性
function checkCodeValid($code, $token)
{
    if (empty($code)) {
        return false;
    }
    // 从授权码文件中读取
    $codes = readCsvAllLines(CODE_FILE);
    foreach ($codes as $index => $row) {
        if ($index == 0) {
            continue;
        }
        if ($row[1] === $code) {
            if (!empty($token)) {
                return $token == $row[2] && $row[3] == '1';
            }
            return $row[3] == '1';
        }
    }
    return false;
}

// 读取配置
function load_config($code = '')
{
    try {
        $file = './config/' . $code . '_config.json';
        if (!file_exists($file)) {
            $file = DEFAULT_CONFIG_FILE;
        }
        $content = file_get_contents($file);
        return json_decode($content, true);
    } catch (Exception $e) {
        echo "Error loading config: " . $e->getMessage() . "\n";
        return [];
    }
}

// 保存配置
function save_config($config)
{
    try {
        $result = file_put_contents('./config/' . $config['code'] . '_config.json', json_encode($config, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        return $result !== false;
    } catch (Exception $e) {
        echo "Error saving config: " . $e->getMessage() . "\n";
        return false;
    }
}

// 生成唯一文件名
function generate_unique_filename($filename)
{
    $ext = pathinfo($filename, PATHINFO_EXTENSION);
    $timestamp = date('YmdHis');
    return $timestamp . '.' . $ext;
}

// 获取图片的 EXIF 方向信息
function get_image_orientation($source_path)
{
    // 检查是否有 EXIF 扩展
    if (!function_exists('exif_read_data')) {
        return 1; // 默认方向
    }

    try {
        $exif = @exif_read_data($source_path);
        if ($exif && isset($exif['Orientation'])) {
            return intval($exif['Orientation']);
        }
    } catch (Exception $e) {
        // 读取 EXIF 失败，返回默认方向
    }

    return 1; // 默认方向（正常）
}

// 根据 EXIF 方向旋转图片
function fix_image_orientation($image, $orientation)
{
    if ($orientation == 1) {
        return $image; // 不需要旋转
    }

    // 获取原图尺寸
    $width = imagesx($image);
    $height = imagesy($image);

    // 创建透明背景色
    $transparent = imagecolorallocatealpha($image, 255, 255, 255, 127);

    switch ($orientation) {
        case 3: // 旋转 180 度
            $rotated = imagerotate($image, 180, $transparent);
            break;
        case 6: // 顺时针旋转 90 度
            $rotated = imagerotate($image, -90, $transparent);
            break;
        case 8: // 逆时针旋转 90 度
            $rotated = imagerotate($image, 90, $transparent);
            break;
        default:
            return $image; // 不需要旋转
    }

    // 旋转后保留透明度
    imagealphablending($rotated, false);
    imagesavealpha($rotated, true);

    // 销毁原图资源
    imagedestroy($image);

    return $rotated;
}

// 图片压缩函数
function compress_image($source_path, $target_path, $max_size_kb = 200)
{
    // 获取图片信息
    $info = getimagesize($source_path);
    if (!$info) {
        return false;
    }

    $original_width = $info[0];
    $original_height = $info[1];
    $mime = $info['mime'];

    // 获取 EXIF 方向信息
    $orientation = get_image_orientation($source_path);

    // 根据 MIME 类型创建图片资源
    switch ($mime) {
        case 'image/jpeg':
            $source_image = imagecreatefromjpeg($source_path);
            break;
        case 'image/png':
            $source_image = imagecreatefrompng($source_path);
            // 保留 PNG 透明度
            imagealphablending($source_image, false);
            imagesavealpha($source_image, true);
            break;
        case 'image/gif':
            $source_image = imagecreatefromgif($source_path);
            break;
        case 'image/webp':
            $source_image = imagecreatefromwebp($source_path);
            break;
        default:
            // 不支持的格式，直接复制
            return copy($source_path, $target_path);
    }

    if (!$source_image) {
        return false;
    }

    // 根据 EXIF 方向旋转图片
    $source_image = fix_image_orientation($source_image, $orientation);

    // 获取旋转后的实际尺寸
    $width = imagesx($source_image);
    $height = imagesy($source_image);

    // 计算当前文件大小
    $current_size = filesize($source_path) / 1024; // KB

    // 如果已经小于目标大小，直接保存（保持原尺寸）
    if ($current_size <= $max_size_kb) {
        if ($mime === 'image/png') {
            imagepng($source_image, $target_path, 6);
        } else {
            imagejpeg($source_image, $target_path, 90);
        }
        imagedestroy($source_image);
        return true;
    }

    // 计算需要的压缩比例
    $ratio = sqrt($max_size_kb / $current_size);

    // 计算新尺寸（保持宽高比）
    $new_width = intval($width * $ratio);
    $new_height = intval($height * $ratio);

    // 限制最小尺寸，避免过度压缩（保持宽高比）
    $min_dimension = 600; // 最小边长
    if ($new_width < $min_dimension || $new_height < $min_dimension) {
        if ($width > $height) {
            $new_width = $min_dimension;
            $new_height = intval($min_dimension * $height / $width);
        } else {
            $new_height = $min_dimension;
            $new_width = intval($min_dimension * $width / $height);
        }
    }

    // 如果计算后的尺寸比原图大，使用原图尺寸
    if ($new_width >= $width || $new_height >= $height) {
        $new_width = $width;
        $new_height = $height;
    }

    // 创建新的图片资源
    $new_image = imagecreatetruecolor($new_width, $new_height);

    // 处理 PNG 透明度
    if ($mime === 'image/png') {
        imagealphablending($new_image, false);
        imagesavealpha($new_image, true);
        $transparent = imagecolorallocatealpha($new_image, 255, 255, 255, 127);
        imagefilledrectangle($new_image, 0, 0, $new_width, $new_height, $transparent);
    }

    // 重采样（保持宽高比）
    imagecopyresampled(
        $new_image,
        $source_image,
        0,
        0,
        0,
        0,
        $new_width,
        $new_height,
        $width,
        $height
    );

    // 保存图片（使用渐进式 JPEG 以获得更好的压缩率）
    $quality = 85; // 初始质量

    // 尝试不同的质量等级，直到达到目标大小
    do {
        if ($mime === 'image/png') {
            // PNG 使用质量 0-9，9 是最高压缩
            imagepng($new_image, $target_path, min(9, intval((100 - $quality) / 11)));
        } else {
            imagejpeg($new_image, $target_path, $quality);
        }

        $file_size = filesize($target_path) / 1024; // KB
        $quality -= 5;
    } while ($file_size > $max_size_kb && $quality >= 60);

    // 清理资源
    imagedestroy($source_image);
    imagedestroy($new_image);

    return true;
}

// 设置CORS头
function set_cors_headers()
{
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
}

// 处理OPTIONS请求
function handle_options()
{
    http_response_code(200);
    set_cors_headers();
    exit;
}

// 处理GET请求
function handle_get($path)
{
    // 获取配置接口
    if ($path === '/api/getConfig' || $path === '/api/getAdminConfig') {
        http_response_code(200);
        header('Content-Type: application/json');
        set_cors_headers();
        $code = $_GET['code'] ?? '';
        $token = $_GET['token'] ?? '';
        $ret = [
            'ret' => 0,
            'errmsg' => '',
            'data' => [],
        ];
        if ($path === '/api/getAdminConfig' && empty($token)) {
            $ret['ret'] = 1002;
            $ret['errmsg'] = '参数错误:' . $code;
            echo json_encode($ret, JSON_UNESCAPED_UNICODE);
            exit;
        }
        if (!checkCodeValid($code, $token)) {
            $ret['ret'] = 1001;
            $ret['errmsg'] = '授权码错误或已失效:' . $code;
            echo json_encode($ret, JSON_UNESCAPED_UNICODE);
            exit;
        }
        $config = load_config($code);
        $ret['data'] = $config;
        echo json_encode($ret, JSON_UNESCAPED_UNICODE);
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
                case 'txt':
                    header('Content-Type: text/plain');
                    break;
                default:
                    http_response_code(404);
                    echo '404 Not Found';
                    exit;
            }
            // 只允许访问根目录及upload目录下的文件
            if (strpos($file_path, './upload/') !== 0 && strpos($file_path, './') !== 0) {
                http_response_code(403);
                echo '403 Forbidden';
                exit;
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
function handle_post($path)
{
    // 保存配置接口
    if ($path === '/api/saveConfig') {
        // 读取请求体
        $content_length = $_SERVER['CONTENT_LENGTH'] ?? 0;
        $post_data = file_get_contents('php://input');

        try {
            $postData = json_decode($post_data, true);
            $config = $postData['config'] ?? [];
            $token = $postData['token'] ?? '';
            if (empty($token)) {
                http_response_code(200);
                header('Content-Type: application/json');
                set_cors_headers();
                $response = ["success" => false, "message" => "参数错误"];
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
                exit;
            }
            $code = $config['code'] ?? '';
            if (!checkCodeValid($code, $token)) {
                http_response_code(200);
                header('Content-Type: application/json');
                set_cors_headers();
                $response = ["success" => false, "message" => "授权码错误或已失效"];
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
                exit;
            }
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

            // 生成唯一文件名（使用 .jpg 扩展名，因为压缩后都是 JPEG 格式）
            // 使用原文件的MD5作为文件名，避免文件名冲突
            $md5 = md5_file($file['tmp_name']);
            $filename = $md5 . '.jpg';
            $file_path = UPLOAD_DIR . '/' . $filename;

            // 压缩图片并保存
            $temp_path = $file['tmp_name'];
            $compressed = compress_image($temp_path, $file_path, 200); // 最大 200KB

            if ($compressed) {
                // 获取压缩后的文件大小
                $final_size = round(filesize($file_path) / 1024, 2);

                // 生成文件URL
                $file_url = '/uploads/images/' . $filename;

                http_response_code(200);
                header('Content-Type: application/json');
                set_cors_headers();

                $response = [
                    "success" => true,
                    "url" => $file_url,
                    "message" => "文件上传成功，压缩后大小: {$final_size}KB",
                    "size" => $final_size
                ];
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
                exit;
            } else {
                http_response_code(500);
                header('Content-Type: application/json');
                set_cors_headers();

                $response = ["success" => false, "message" => "图片压缩失败"];
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

    // 音频上传接口
    elseif ($path === '/api/uploadAudio') {
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
                $response = [
                    "success" => false, 
                    "message" => "文件上传失败，注意不能超过10MB, 错误码 " . $file['error'],
                ];
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
                exit;
            }

            // 检查文件类型
            $allowed_types = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/x-m4a'];
            if (!in_array($file['type'], $allowed_types)) {
                http_response_code(400);
                header('Content-Type: application/json');
                set_cors_headers();
                $response = ["success" => false, "message" => "不支持的音频格式"];
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
                exit;
            }

            // 检查文件大小（限制 20MB）
            $max_size = 10 * 1024 * 1024;
            if ($file['size'] > $max_size) {
                http_response_code(400);
                header('Content-Type: application/json');
                set_cors_headers();
                $response = ["success" => false, "message" => "音频文件大小不能超过 20MB"];
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
                exit;
            }

            // 生成唯一文件名
            $md5 = md5_file($file['tmp_name']);
            $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
            if (empty($ext)) {
                $ext = 'mp3';
            }
            $filename = $md5 . '.' . $ext;
            $file_path = AUDIO_UPLOAD_DIR . '/' . $filename;

            // 移动上传的文件
            if (move_uploaded_file($file['tmp_name'], $file_path)) {
                // 获取文件大小
                $final_size = round(filesize($file_path) / 1024, 2);

                // 生成文件URL
                $file_url = '/uploads/music/' . $filename;

                http_response_code(200);
                header('Content-Type: application/json');
                set_cors_headers();

                $response = [
                    "success" => true,
                    "url" => $file_url,
                    "message" => "音频上传成功，大小: {$final_size}KB",
                    "size" => $final_size
                ];
                echo json_encode($response, JSON_UNESCAPED_UNICODE);
                exit;
            } else {
                http_response_code(500);
                header('Content-Type: application/json');
                set_cors_headers();

                $response = ["success" => false, "message" => "音频保存失败"];
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
    } else {
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

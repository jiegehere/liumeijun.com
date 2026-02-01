<?php

/**
 * 脚本说明
 * 1.读取命令行参数, 获取生成数量
 * 2.从1开始增序，序号+固定的盐值，MD5后，取前10位作为随机码
 * 3.写入到 code.csv 文件中
 */

// 读取命令行参数
$args = $argv;
if (count($args) < 2) {
	echo "Usage: php gen_code.php <number_of_codes>\n";
	exit(1);
}
$number_of_codes = (int)$args[1];
if ($number_of_codes <= 0) {
	echo "Number of codes must be a positive integer.\n";
	exit(1);
}


// 读取 ../config/code.csv
$file = '../config/code.csv';
if (!file_exists($file)) {
	echo "File not found: " . $file . "\n";
	exit(1);
}
// 读取文件内容
$handle = fopen($file, 'w');
if (!$handle) {
	echo "Failed to open file: " . $file . "\n";
	exit(1);
}

$lines = readCsvAllLines($file);
if (empty($lines)) {
	fputcsv($handle, ['序号', '随机码', 'token', 'isValid', 'showUrl', 'configUrl']);
} else {
	$lines = [];
}

$existCodeMap = [];
foreach ($lines as $row) {
	$existCodeMap[(string)$row[1]] = [
		'id' => (int)$row[0],
		'code' => (string)$row[1],
		'isValid' => (int)$row[2],
	];
}

// 生成随机码
$salt = '34324234klfdjshaokjkl43243';
$new_codes = [];
for ($i = 1; $i <= $number_of_codes; $i++) {
	$code = md5($i . $salt);
	$code = strtoupper(substr($code, 0, 10));
	if (isset($existCodeMap[$i]) && !empty($existCodeMap[$i]['code'])) {
		continue;
	}
	$token = md5($code . '_' . $i);
	$showUrl = 'https://love.xiaofs.cn/index.html?code=' . $code;
	$configUrl = 'https://love.xiaofs.cn/config.html?code=' . $code . '&token=' . $token;
	fputcsv($handle, [$i, $code, $token, 1, $showUrl, $configUrl]);
}
fclose($handle);









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

## 项目介绍
这是一个基于百度地图的展示情侣经历回忆的项目，祝天下有情人终成眷属！


### 修改配置
```
php --ini

- 编辑 php.ini ，找到并修改这两个参数：
- upload_max_filesize - 最大上传文件大小
- post_max_size - 最大 POST 数据大小（应该大于或等于 upload_max_filesize）
```

## 启动
1. 确保安装了PHP环境
2. 启动PHP内置服务器
```bash
php -S localhost:8000
```
3. 打开浏览器，访问 `http://localhost:8000/config.html?code=2D1705E90D&token=e6e9b45ccadb48cae1d50fedd0faa822`
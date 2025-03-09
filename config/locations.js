const config = { 
    // 地图中心点
    mapCenter: {
        lng: 3.894763,
        lat: 44.529534
    },
    // 中国中心
    chinaCenter: {
        lng: 103.758427,
        lat: 36.172333,
        address: '中国'
    },
    // 主要地点
    mainLocations: {
        // 嘉应学院
        jyu: {
            address: '广东省梅州市梅江区嘉应学院',
            lng: 116.135018,
            lat: 24.33438,
            title: '嘉应学院',
            description: '起点'
        },
        // 广外艺
        gtc: {
            address: '广东省广州市天河区广东技术师范大学',
            lng: 113.345774,
            lat: 23.153356,
            title: '广外艺',
            description: '终点'
        },
        // 广州市
        guangzhou: {
            address: '广东省广州市',
            lng: 113.256838,
            lat: 23.157309,
            title: '广州市'
        },
        // 河源市
        heyuan: {
            address: '广东省河源市',
            lng: 114.701682,
            lat: 23.754195,
            title: '河源市'
        }
    },
    // 路线信息
    routeInfo: [
        {
            title: '梅州 → 广州',
            content: '426 km.',
            point: 'jyu'
        },
        {
            title: '梅州 → 广州',
            content: '5 hours by train.',
            point: 'gtc'
        },
        {
            title: '变得是距离，不变的是坚持；',
            image: {
                path: "./images/ticket.jpg"
            },
            point: 'jyu'
        }
    ],

    // 照片展示
    photos: [
        {
            title: '纪念堂',
            image: {
                path: "./images/jiniantang.jpg"
            },
            address: '广东省广州市越秀区人民北路319号',
            point: {lng: 113.271147, lat: 23.139616}
        },
        {
            title: '陈家祠',
            image: {
                path: "./images/chenjiaci.jpg"
            },
            address: '广东省广州市荔湾区中山七路',
            point: {lng: 113.252764, lat: 23.131838}
        },
        {
            title: '看电影',
            image: {
                path: "./images/dianying.jpg"
            },
            address: '广东省广州市天河区天河路228号正佳广场',
            point: {lng: 113.268865, lat: 23.200458}
        },
        {
            title: '',
            image: {
                path: "./images/chenjiaci1.jpg"
            },
            address: '广东省广州市荔湾区中山七路',
            point: {lng: 113.252764, lat: 23.131838}
        },
        {
            title: '吃货',
            image: {
                path: "./images/beijingroad.jpg"
            },
            address: '广东省广州市越秀区北京路步行街',
            point: {lng: 113.275619, lat: 23.127547}
        },
        {
            title: '',
            image: {
                path: "./images/chenjiaci2.jpg"
            },
            address: '广东省广州市荔湾区中山七路',
            point: {lng: 113.252764, lat: 23.131838}
        },
        {
            title: '臭美中...',
            image: {
                path: "./images/dress1.jpg"
            },
            address: '广东省广州市越秀区北京路步行街',
            point: {lng: 113.275619, lat: 23.127547}
        },
        {
            title: '臭美中...',
            image: {
                path: "./images/dress2.jpg"
            },
            address: '广东省广州市越秀区上下九步行街',
            point: {lng: 113.248583, lat: 23.123725}
        },
        {
            title: '',
            image: {
                path: "./images/you.jpg"
            },
            address: '广东省广州市天河区天河路228号正佳广场',
            point: {lng: 113.340995, lat: 23.106222}
        },
        {
            title: '又是离开，又是不舍...',
            image: {
                path: "./images/leave.jpg"
            },
            address: '广东省广州市天河区天河路228号正佳广场',
            point: {lng: 113.358452, lat: 23.158306}
        },
        {
            title: '红海湾',
            image: {
                path: "./images/sea.jpg"
            },
            address: '广东省汕尾市红海湾',
            point: {lng: 115.573511, lat: 22.712665}
        },
        {
            title: '后山',
            image: {
                path: "./images/s.jpg"
            },
            address: '广东省梅州市梅江区嘉应学院后山',
            point: {lng: 115.622433, lat: 23.184734}
        }
    ],
    // 想去的地方
    wannaToLocations: [
        {
            title: '',
            content: '地图标上想去的地方，有一天，带着你去流浪。',
            address: '中国',
            point: {lng: 103.758427, lat: 36.172333}
        },
        {
            title: '厦门',
            image: {
                path: "./images/wannato/xiamen.jpg"
            },
            address: '福建省厦门市',
            point: {lng: 118.148154, lat: 24.497912}
        },
        {
            title: '凤凰古镇',
            image: {
                path: "./images/wannato/fenghuang.jpg"
            },
            address: '湖南省湘西土家族苗族自治州凤凰县',
            point: {lng: 100.21191, lat: 26.928061}
        },
        {
            title: '桂林阳朔',
            image: {
                path: "./images/wannato/guilin.jpg"
            },
            address: '广西壮族自治区桂林市阳朔县',
            point: {lng: 110.503626, lat: 24.780932}
        },
        {
            title: '西藏',
            image: {
                path: "./images/wannato/xizang.jpg"
            },
            address: '西藏自治区拉萨市',
            point: {lng: 91.115691, lat: 29.687083}
        },
        {
            title: '杭州西湖',
            image: {
                path: "./images/wannato/xihu.jpg"
            },
            address: '浙江省杭州市西湖区',
            point: {lng: 120.151946, lat: 30.250472}
        }
    ]
};
 
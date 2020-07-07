module.exports = {
    devServer: {
        // proxy: 'http://llqwxb.qicp.vip/'
        proxy: 'http://192.168.1.104/'
    }
}

// module.exports = {
//     devServer: {
//         proxy: {
//             '/api': {
//                 target: 'http://192.168.1.108/', //API服务器的地址
//                 ws: true, //代理websockets
//                 changeOrigin: true, // 虚拟的站点需要更管origin
//                 pathRewrite: { //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
//                     '^/api': ''
//                 }
//             }
//         }
//     }
// }
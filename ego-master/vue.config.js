// module.exports = {
//     devServer: {
//         host: 'localhost',//target host
//         port: 8888,
//         //proxy:{'/api':{}},代理器中设置/api,项目中请求路径为/api的替换为target
//         proxy: {
//             '/api': {
//                 target: 'http://localhost:8888',//代理地址，这里设置的地址会代替axios中设置的baseURL
//                 changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
//                 //ws: true, // proxy websockets
//                 //pathRewrite方法重写url
//                 pathRewrite: {
//                     '^/api': '/'
//                     //pathRewrite: {'^/api': '/'} 重写之后url为 http://192.168.1.16:8085/xxxx
//                     //pathRewrite: {'^/api': '/api'} 重写之后url为 http://192.168.1.16:8085/api/xxxx
//                 }
//             },
//             proxy: 'http://localhost:8888',
//         },
//     }
// }
// module.exports = {
//     devServer: {
//       proxy: 'http://localhost:8080' // 配置访问的服务器地址
//     }
//   }
module.exports = {
    devServer: {
      host: 'localhost',
      port: 8888,
      proxy: {
        '/api': {
          target: 'http://47.100.226.180:3000', // 配置访问的服务器地址
          // target: 'http://ego.vipgz4.91tunnel.com', // 配置访问的服务器地址

          
          pathRewrite: { '^/api': '' },  // 用于将请求中的 /api 字符串替换为空, 然后访问地址就能正确访问，若不添加此行配置，那么访问地址就变成了： http://localhost:5000/api/request_url，这样的请求就会出现 404 操作
          ws: true, // 是否支持 webstocket, 默认是 true
          changeOrigin: true // 用于控制请求头中的 host 值, 默认是 ture
        }
      }
    }
  }
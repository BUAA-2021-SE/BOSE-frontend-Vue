module.exports = {
    //webpack配置
    configureWebpack: {
 
        //警告 webpack 的性能提示
        performance: {
            hints:'warning',
            //入口起点的最大体积
            maxEntrypointSize: 80000000,
            //生成文件的最大体积
            maxAssetSize: 80000000,
            //只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
    }
}
const config = {
  projectName: 'create-taro-app',
  date: '2022-4-6',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  /**
   * @title 优化编译速度
   * @link https://taro-docs.jd.com/taro/docs/compile-optimized#%E4%BC%98%E5%8C%96%E7%BC%96%E8%AF%91%E9%80%9F%E5%BA%A6
   */
  plugins: ['taro-plugin-compiler-optimization'],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          onePxTransform: false, // 设置 1px 是否需要被转换
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    /**
     *
     * @title 通过webpackChain配置解决开发环境下小程序包体积过大无法进行预览上传的问题(不影响devtools的使用)
     * @link https://taro-docs.jd.com/taro/docs/compile-optimized#%E8%A7%A3%E5%86%B3%E5%8C%85%E4%BD%93%E7%A7%AF%E8%BF%87%E5%A4%A7%E6%97%A0%E6%B3%95%E8%BF%9B%E8%A1%8C%E9%A2%84%E8%A7%88%E7%9A%84%E9%97%AE%E9%A2%98
     */
    webpackChain: (chain, webpack) => {
      chain.merge({
        plugin: {
          install: {
            plugin: require('terser-webpack-plugin'),
            args: [
              {
                terserOptions: {
                  compress: true, // 默认使用terser压缩
                  // mangle: false,
                  keep_classnames: true, // 不改变class名称
                  keep_fnames: true, // 不改变函数名称
                },
              },
            ],
          },
        },
      });
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};

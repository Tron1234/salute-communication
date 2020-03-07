module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'img':'@/static/img',
        'js':'@/static/js',
        'orange': '@/static/img/orange',
        'blue':'@/static/img/blue',
        'green':'@/static/img/green',
        'pink':'@/static/img/pink',
        'store':'@/store',
        'common':'@/components/common',
        'content':'@/components/content',
        'lang':'@/static/lang'
      }
    }
  }
}

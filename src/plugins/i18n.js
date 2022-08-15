export default {
  install: (app, options) => {
    console.log(app)
    console.log(options)
    app.config.globalProperties.$translate = (key) => {
      console.log(key.split('.'))
      return key.split('.').reduce((o, i) => {
        if (o) return o[i]
      }, options)
    }
  },
}

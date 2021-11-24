import SvgIcon from './SvgIcon.vue'

const install = (app, options = {}) => {
  app.config.globalProperties.$prefix = options.prefix || 'd-icon'
  app.component('SvgIcon', SvgIcon)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install

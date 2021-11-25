# vite-plugin-svg-icon

## Install

```shell
npm install @dumplings/vite-plugin-svg-icon
```

## Configuration

```javascript
// vite.config.js
import svgPlugin from 'vite-plugin-svg-icon';

export default defineConfig({
  plugins: [
    //.. other plugins
    // put your svg files in this path, svg file's name is the vue compoment props.name
    svgPlugin('the/svg/files/path'),
  ]
})
```

```javascript
// app main file
import SvgIcon from 'vite-plugin-svg-icon/vue';

const app = createApp(VueApp);
app.use(SvgIcon);
app.mount('#app')
```

```vue
<template>
  <svg-icon name="someicon" />
</template>
```

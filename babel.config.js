module.exports = {
  "presets": [
    "@vue/app"
  ],
  "plugins": [
    [
      "transform-imports",
      {
        "quasar": {
          "transform": "quasar-framework/dist/babel-transforms/imports.ios.js",
          "preventFullImport": true
        }
      }
    ]
  ]
}
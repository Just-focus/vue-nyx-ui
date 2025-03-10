const modulesFiles = import.meta.glob('../examples/*/*.vue', { eager: true })

/** 自动化处理 */
let modules = {}
for (const [key, value] of Object.entries(modulesFiles)) {
  var keys = key.split('/')
  const name = keys.slice(1).join('/')
  modules[name] = value.default
}
console.log(modules)

export default modules
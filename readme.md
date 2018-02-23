# keep-loader for webpack

keep-loader用于在不同的打包环境下需要生成不同的代码的场景，就像C/C++中的宏特性一样。提供了一种在源码中控制打包阶段生成不同代码的能力。

English document：https://github.com/wendux/keep-loader/blob/master/readme-en.md

Chinese document：https://github.com/wendux/keep-loader/blob/master/readme.md

## 使用

1. 安装 keep-loader 

   ```javascript
   npm install keep-loader --save-dev
   ```

2. 修改webpack配置文件

   ```javascript
   module: {
    ...
       rules: [
       ...
         {
           test: /\.js$/,
           use: [
             {
               loader: 'keep-loader',
               options:{
                 keep:process.env.NODE_ENV === 'production'?"prod":"dev"
               }
             },
             {loader: 'babel-loader'}
           ],
           include: [resolve('src'), resolve('test')]
         },
         ...
         ]
       ...  
    }
   ```

注意：打包的时候，keep-loader的keep参数的值代表当前打包环境。keep-loader会根据这个环境参数决定打包过程保留哪些代码。

现在，你在代码里可以直接使用 `KEEP`  函数 , 例如:

```javascript

KEEP("dev",e=>{
  //此部分代码只会在dev环境中保留
  console.log("我将会在dev构建过程中保留,其它环境构建过程中被移除")
  env="production"
})
KEEP("prod",e=>{
  //此部分代码只会在prod环境中保留
  console.log("我将会在prod构建过程中输出,其它环境构建过程中被移除")
  env="production"
})
console.log(env)
//在dev环境中输出 "development" , 在prod环境中输出"production" .
```

### KEEP(env,callback)

此函数在keep-loader中动态定义，你不必手动定义。功能：简单来说，就是指定在什么环境下保留代码。

- env : 要保留代码的环境，值必须和webpack配置中keep-loader的options的keep值相匹配。另外，env必须是一个字符串直接量，而不能是变量！因为，keep-loader实在构建过程中处理js源码，而不是在执行过程中。
- callback: 要保留的源码回调； 保留的回调会就地立即执行。

### 示例

1.比如我们在开发环境时静态资源用我们本地的，而线上环境是直接引用cdn，那么我们可以写一个获取基地址的函数：

```javascript
function getAssetBaseUrl(){
  var baseUrl="http://localhost/static"
  
  KEEP("prod",()=>{
    //此部分代码只会在prod环境中保留
    baseUrl="http://cdn.xxx.com/static"
  })
  return baseUrl;
}
```

2. 比如我们要在测试环境开启日志，而在生产环境关闭日志，那么我们可以写一个log函数：

```javascript
function log(){
   var arg=arguments;
   KEEP("dev",()=>{
    console.log.apply(console,arg)
  })
}
```
3. 比如我们允许在测试环境中弹出alert，但在其他环境禁止弹出alert。

```javascript
var _alert=alert;
window.alert=function(msg){
   KEEP("dev",()=>{
    //此部分代码只会在dev环境中保留
    _alert(msg)
  })
}
```



## 逻辑运算符支持

```javascript
  
  //非dev环境下保留
  KEEP("!dev",()=>{...})
  //在dev和pre环境中保留
  KEEP("dev||pre",()=>{...})
  //除过dev和pre环境，其余环境保留
  KEEP("!(dev||pre)",()=>{...})
  //只要不是prod环境，则保留
  KEEP("!prod",()=>{...})
  
```



## 工具函数

为了方便使用，您可以直接使用工具函数来处理一段源码

```javascript
var keep=require('keep-loader/helper')
source=keep(source,env)
```

**keep(source, env)**

source为源代码字符串，env为打包环境，返回处理过的源码。

### 最后

欢迎Star， [keep-loader github地址](https://github.com/wendux/keep-loader)


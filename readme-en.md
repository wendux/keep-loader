# keep-loader for webpack

## description

Generate different code based on the development and production environment, just like the macro features of some compiled programming languages, like C.

English document：https://github.com/wendux/keep-loader/blob/master/readme-en.md

中文文档：https://github.com/wendux/keep-loader/blob/master/readme.md

## usage

1. Install keep-loader 

   ```javascript
   npm install keep-loader --save-dev
   ```

2. Modify your webpack config

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


Now, you can use function `KEEP`  in your code , for example:

```javascript
var env=""
KEEP("dev",e=>{
  console.log("I will be keeped in development environment,but removed in other environment")
  env="development"
})
KEEP("prod",e=>{
  console.log("I will be keeped in production enviroment,but removed in other environment")
  env="production"
})
console.log(env)
//output "development" in development enviroment, "production" in prduction environment.
```

### KEEP(env,callback)

 This function defined in keep-loader, you don't have to declare manually .

- env : It must match the value of the keep property defined in keep-loader options  of webpack. and it must be a string literal, not a variable! because the keep-loader is processing source code at building time, rather than at the time of execution.
- callback: it  will be  called immediately in place.


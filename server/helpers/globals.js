export function getHeader(type) {
    return {
        'accept': `application/${type}`,
        'Content-Type': `application/${type}`
    }
}

// //https://gist.github.com/corysimmons/c6b31bc7d5d9d970d884175a293d8a0d

// {
//     "scripts": {
//       "dev": "npm-run-all -p nodemon browser-sync",
//       "nodemon": "nodemon server.js",
//       "browser-sync": "browser-sync start -s --files=server.js --no-open --no-notify --reload-delay=500"
//     },
//     "devDependencies": {
//       "npm-run-all": "^4.0.2"
//     },
//     "dependencies": {
//       "browser-sync": "^2.18.13",
//       "kcors": "^2.2.1",
//       "koa": "^2.3.0",
//       "koa-router": "^7.1.1",
//       "nodemon": "^1.11.0"
//     }
//   }

//   const Koa = require('koa')
// const Router = require('koa-router')
// const cors = require('kcors')

// const app = new Koa()
// const router = new Router()

// router.get(`/`, ctx => {
//   ctx.body = {
//     dogs: [`Fido`, `Rover`]
//   }
// })

// app
//   .use(cors())
//   .use(router.routes())
//   .use(router.allowedMethods())

// app.listen(1337, () => console.log(`Koa at: http://localhost:1337`))

// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <meta http-equiv="X-UA-Compatible" content="ie=edge">
// </head>
// <body>
//   <pre></pre>

//   <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
//   <script>
//     axios
//       .get('http://localhost:1337')
//       .then(res => {
//         document.querySelector('pre').textContent = JSON.stringify(res.data, null, 2)
//       })
//       .catch(err => console.error(err))
//   </script>
// </body>
// </html>
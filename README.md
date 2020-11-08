<h1 align="center" style="font-size: 4em; font-weight: 700;">Eon.js</h1>
<p align="center">
<b>A simple framework for creating web services</b>
</p>
<p align="center">
>_ Writing servers should be easy
</p>
<p align="center">
<img src="https://res.cloudinary.com/db3degzpn/image/upload/v1604679393/social_new_rl1m2v.png" width="100%" height="auto">
</p>
<p align="center"><img src="https://img.shields.io/npm/v/eonjs" alt="version badge">
<img src="https://img.shields.io/npm/l/eonjs" alt="license badge">
<img src="https://img.shields.io/github/languages/code-size/eon-web/eon" alt="size badge">
<img src="https://img.shields.io/badge/dependencies-none-brightgreen" alt="dependency badge">
<img src="https://img.shields.io/npm/dw/eonjs?logo=npm" alt="downloads badge">
<img src="https://img.shields.io/github/issues/eon-web/eon" alt="issues badge">
<img src="https://img.shields.io/github/issues-closed/eon-web/eon" alt="closed issues badge">
<img src="https://img.shields.io/github/issues-pr/eon-web/eon" alt="pr badge">
<img src="https://img.shields.io/github/stars/eon-web/eon" alt="stars badge">
<img src="https://img.shields.io/website?down_color=red&down_message=down.%20please%20report%20this%20to%20the%20repo%20owner&up_color=brightgreen&up_message=up&url=https%3A%2F%2Feon.js.org&cachebust=1" alt="website badge">
<img src="https://img.shields.io/github/commit-activity/m/eon-web/eon?foo=bar" alt="commit badge">
<img src="https://img.shields.io/bundlephobia/min/eonjs" alt="size badge">
<img src="https://img.shields.io/github/repo-size/eon-web/eon" alt="repo size badge"></p>

## Why Eon?
Yes, another web server framework. Whenever a new one comes out, you have to ask yourself: Do I need this? Am I fine to just continue using express/fastify/etc...? I want to present to you the reasons why I began writing this framework and hopefully make your decision a bit easier.

### Express is _not_ a small framework
Express is great because it provides lots of features, but that also makes it a quite large library. With Eon, I tried to reduce the bundle size by writing as much code as possible on my own and adding only the necessary features.

### 0 Dependencies
As of `v1.11.x`, Eon.js has *no dependencies whatsoever*, thereby further reducing the bundle size and overhead of additional packages to manage.

# Installation
To install eon, simply run
```bash
npm i eonjs@latest --save
```

# Examples & Usage
Here is an example of using Eon:
```js
// Require Eon
const eon = require('eonjs');
// Create App
// Shorthand: const app = require('eonjs')(8080);
const app = eon(8080);
// Create a get path
app.get('/').json((req, res) => ({hello: 'world', how_are: 'you?'}));
```

## Typescript
This framework has Typescript typings bundled with it.

# API
**Please refer to the full documentation at [eon.js.org](https://eon.js.org/docs/api)**
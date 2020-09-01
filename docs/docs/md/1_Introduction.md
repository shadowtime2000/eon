# Introduction
Welcome to the Eon.js docs! I will do my best to explain everything about eon.js in these following pages. If you feel that some docs are incomplete, feel free to create a pull request on the [Eon.js GitHub](https://github.com/codemaster138/eon/tree/master/docs/docs/md) and edit the files in the `docs/docs/md` folder.

## Why Eon?
Yes, another web server framework. Whenever a new one comes out, you have to ask yourself: Do I need this? Am I fine to just continue using express/fastify/etc...? I want to present to you the reasons why I began writing this framework and hopefully make your decision a bit easier.

#### Express is _not_ a small framework
Express is great, because it provides lots of features, but that also makes it a quite large library. With Eon, I tried to reduce the bundle size by writing as much code as possible on my own and adding only the neccessary features.

#### 0 Dependencies
As of `v1.11.x`, Eon.js has *no dependencies whatsoever*, thereby further reducing the bundle size and overhead of additional packages to manage.

# Installation
To install eon, simply run
```bash
npm i eonjs --save
```
---
title: 'Your first server'
description: 'In this tutorial you will create a simple API with Eon.JS'
number: 2
group: 'Getting Started'
---

To get you started, let's write a simple API to create a badge for [shields.io](shields.io).

We'll be able to use our API to create a badge like this one:
![Weekday Badge](https://img.shields.io/endpoint?style=flat&url=https://eonjs-api.herokuapp.com/weekdays-api&v=1)

**_Note_: Due to caching, this post might be displaying an old image. I'm not sure, but I think, that this can also happen on GitHub**.

## Creating an API 📅
First, go to your favorite IDE and create a new Project. As with every node project, go and run
```bash
npm init -y
```
to create your package.json file.

Now, install the latest `stable` version of eon.js.
```bash
npm install eonjs@latest
```

In your index.js, create a simple Eon.js server:
```js
//! important ! If you're deploying to somewhere like Heroku, leave the port blank.
// During local dev, eon will default to port 8080
// When deployed, eon will default to process.env.PORT 
const eon = require('eonjs')();

eon.
    get('/weekdays-api').json(() => {
        // API code goes here
    })
    .listen(p => {
        console.log(`Listening on http://localhost:${p}`);
    });
```

Right after importing `eon` (outside of the listener!), create a constant to hold the different weekdays:
```js
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
```

...and one to hold the colors for each day:
```js
const colors = ['yellowgreen', 'brightgreen', 'yellow', 'orange', 'blue', 'blueviolet', 'ff69b4'];
```

Now, inside the listener, retrieve the current day, name of the day, and color:
```js
var day = new Date().getDay();
var dayName = days[day];
var color = colors[day];
```

And last but not least, generate a response:
```js
return {
    schemaVersion: 1,
    label: 'today is',
    message: dayName,
    color: color
}
```

To recap, our code now looks like this:
```js
const eon = require('eonjs')(8080);

// Constants
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const colors = ['yellowgreen', 'brightgreen', 'yellow', 'orange', 'blue', 'blueviolet', 'ff69b4'];

eon.
    get('/weekdays-api').json(() => {
        // API code goes here
        var day = new Date().getDay();
        var dayName = days[day];
        var color = colors[day];

        return {
            schemaVersion: 1,
            label: 'today is',
            message: dayName,
            color: color
        }
    })
    .listen(p => {
        console.log(`Listening on http://localhost:${p}`);
    });
```

## Deploying our API 💻 
Now we've written our API, but that's not much good if we can't really use it. So, let's deploy our API to Heroku so that [shields.io](https://shields.io) can access it. First, go to [heroku.com](https://heroku.com) and create a free account, if you haven't already. Now go to your dashboard and create a new app.

!["New" Button](https://dev-to-uploads.s3.amazonaws.com/i/2xp1zf4a11rwqi82q4kb.png)

I'll call mine "eonjs-api"
![Creating API](https://dev-to-uploads.s3.amazonaws.com/i/gjy7c217upg7b42ixs2u.png)

Now, you need to publish your API's source code to GitHub so that Heroku can see it.

### Setting up your repo

In your project, create a file containing the following line:
```gitignore
# Don't upload node_modules to GitHub
node_modules
```
This is so that git doesn't upload your node_modules to the server. Next, create a GitHub repository. **Make sure to not add a gitignore, license or README file, otherwise you will be unable to upload your code.** Now, in your project, run the following commands:
```bash
git init
git add .
git commit -m "initial commit".
# Make sure to replace "user-name" and "repo-name" with your GitHub username and repository name
git remote add origin https://github.com/user-name/repo-name
git push -u origin master
```

### Connecting your repo
On Heroku's deploy panel, select the "GitHub" tab.

![Tab Select](https://dev-to-uploads.s3.amazonaws.com/i/lhrynp22r91e22eaeofp.png)

Connect your account, then select your repository. Make sure to activate "automated deploys" a bit farther down on the page.

To make Heroku deploy your app, go to your project and run
```bash
git commit -m "trigger heroku" --allow-empty
git push
```
After a couple of minutes (or Seconds!), Heroku will have deployed your app to `your-app.herokuapp.com` (Mine, for example, is [eonjs-api.herokuapp.com/weekdays-api](https://eonjs-api.herokuapp.com/weekdays-api)), and your endpoint will be available at `your-app.herokuapp.com/weekdays-api`

### Finally getting your hard-earned badge
Now you've done a lot of work on your little API, and you want your reward. To retrieve it, simply embed this markdown in your page:
```md
![Weekday Badge](https://img.shields.io/endpoint?style=flat&url=https://your-app.herokuapp.com/weekdays-api)
```
*Make sure to replace "your-app" with your app's name*

Mine's Here: ![Weekday Badge](https://img.shields.io/endpoint?style=flat&url=https://eonjs-api.herokuapp.com/weekdays-api&v=1)

**Note: Due to caching, this post might be displaying an old image. I'm not sure, but I think, that this can also happen on GitHub**.

## Conclusion
I hope I gave you a good overview of how you can create your own APIs with eon.js & Heroku. Feel free to give me some feedback in the comments. **I'd also appreciate it if you could tell me whether you want more of these tutorials**.

**Thanks for reading!**
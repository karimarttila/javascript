# Table of Contents
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Technical Description](#technical-description)
- [Disclaimer](#disclaimer)
- [Node Development](#node-development)
  - [Visual Studio Code](#visual-studio-code)
  - [Basic Tools - Nvm, Npm and Node](#basic-tools---nvm-npm-and-node)
  - [Npm installations](#npm-installations)
  - [Static Code Analysis - ESLint](#static-code-analysis---eslint)
  - [Unit Testing - Mocha](#unit-testing---mocha)
  - [Command Line](#command-line)
  - [Hot Code Reloading](#hot-code-reloading)
  - [Node REPL](#node-repl)
  - [Visual Studio Debugger](#visual-studio-debugger)
- [Testing](#testing)
- [CORS Issues](#cors-issues)
  - [Simple Server](#simple-server)
  - [Simple Frontend](#simple-frontend)
- [Session Handling](#session-handling)
- [Building for Production](#building-for-production)
- [Conclusions](#conclusions)
  - [Javascript Syntax](#javascript-syntax)
  - [Learning Curve](#learning-curve)
  - [Tooling](#tooling)
  - [REPL](#repl)
  - [Developer Productivity](#developer-productivity)
  - [Testing](#testing)
  - [Javascript as a Language](#javascript-as-a-language)
  - [Javascript / Node vs. Clojure / JVM](#javascript--node-vs-clojure--jvm)
  - [Javascript vs. Python](#javascript-vs-python)
  - [Javascript and Node - Is There a Place in My Toolbox for Them?](#javascript-and-node---is-there-a-place-in-my-toolbox-for-them)



# Introduction

This Simple Server is implemented using Javascript and Node. The functionality of the Simple Server is basically the same as in [Clojure Simple Server](https://github.com/karimarttila/clojure/tree/master/clj-ring-cljs-reagent-demo/simple-server) that I implemented earlier using Clojure (the rationale being to learn Clojure and how to implement a REST server using Clojure). Therefore, the rationale for this Javascript / Node Simple Server is to learn Javascript and Node and how to implement a REST server using those technologies.

So, the idea is to replicate the API of the previous Simple Server implemented in Clojure so that you can use [Clojure Simple Frontend](https://github.com/karimarttila/clojure/tree/master/clj-ring-cljs-reagent-demo/simple-frontend) to test the Javascript / Node Simple Server (the REST API is the same - you can use either server serving the Simple Frontend). This way it is also interesting to compare the two Simple Servers that are implemented in two totally different runtimes (JVM vs Node) and programming languages (Clojure vs Javascript).

I also try to replicate the Clojure namespace structure to the equivalent Node structures so that it is easy to compare various parts of the application (e.g. [core.js](src/core.js) - [core.clj](https://github.com/karimarttila/clojure/blob/master/clj-ring-cljs-reagent-demo/simple-server/src/simpleserver/core.clj))




# Technical Description

Simple Server is implemented using [Javascript](https://developer.mozilla.org/bm/docs/Web/JavaScript) and [Node](https://nodejs.org/en/).

# Disclaimer

This is not a top-class example how to implement a REST server using Javascript / Node. This server is my first real Javascript / Node project and I implemented it just for learning purposes. Therefore a seasoned Javascript / Node developer surely finds a lot of issues in the code that could have been implemented in a more efficient way.

# Node Development

## Visual Studio Code

While learning Javascript and Node I decided to use [Visual Studio Code](https://code.visualstudio.com/) as my editor when implementing this REST server. Visual Studio Code was highly recommended by my unit's Javascript developers and I wanted to give it a try (instead of using IntelliJ which is my favorite IDE nowadays). Visual Studio Code was a delightful suprise - it was really good with a lot of great extensions. 

These are Visual Studio Code extensions that I found useful while working with this project:

- Emacs Friendly Keymap - Yes, I use emacs keymap in all of my editors.
- ESLint - A Javascript linter.
- Markdown All in One - An excellent extension while working with md files (like this one).

## Basic Tools - Nvm, Npm and Node

I understood that [Node Version Manager - nvm](https://github.com/creationix/nvm) is the way to go for managing different Node versions in your developer workstation. Nvm installs the Node versions you are going to need and also compatible npm versions. I don't want to install extra stuff in my Ubuntu home directory so I followed [How to Install nvm outside the User Directory](http://octopusinvitro.tk/blog/code-and-tech/how-to-install-nvm-outside-user-directory/) instructions. 

So, after installing nvm you can install the [Node](https://nodejs.org/en/) (and [npm](https://www.npmjs.com/)) versions you need. 


## Npm installations

This is a one time task and the local npm packages can be read in the [package.json](package.json) file (and the actual packages are in the [node_modules](node_modules) directory, of course). So, you don't have to do this part, I just documented these steps for myself. First create package.json using command "npm init".

Then install the following packages using command "npm install <package>" --save".

- debug
- morgan
- express
- ...

Install also the dev tools I used (using command "npm install <package> --save-dev"):
- nodemon
- eslint

See [npm docs](https://docs.npmjs.com/) for more information how to use npm.

If you have cloned this repository you can install all these packages using command "npm install" (which reads the [package.json](package.json) file and installs everything there).

## Static Code Analysis - ESLint

There are a few linters in the Javascript world. I used [ESLint](https://eslint.org) with [Airbnb Style Guide](https://github.com/airbnb/javascript) which was recommended e.g. in one Pluralsight Javascript/Node tutorial.

Setup ESLint using command "./node_modules/.bin/eslint --init". I used these options: "Use a popular style guide", Which: "Airbnb",...

Use ESLint with command: "./node_modules/.bin/eslint <javascript-file-to-lint>"

You should also install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) in Visual Studio Code. 

I provided a short bash script to run eslint for src and test directories: "eslint-all.sh".


## Unit Testing - Mocha

I googled which frameworks are the most popular unit testing frameworks to be used with Node and [Mocha](https://mochajs.org/) seemed to be the one. 

See unit tests that I implemented as an excercise in the [test](./test) directory.

Run unit tests with command: "npm test".

Mocha was a real suprise to be used with Javascript/Node - must be one of the easiest and intuitive unit testing frameworks I have ever used.

## Command Line

TODO:
Start server in command line: 

```bash
TODO
```

## Hot Code Reloading

TODO:



## Node REPL

Node REPL is pretty good, a bit like Python REPL, but not anything like a real Lisp REPL, of course. A couple of examples:

Experimenting in REPL how to test if there are no nulls or empty srings in a list.:

```bash
!['a', '', 'c'].some(item => ((item == null) || (item == undefined) || (item == '')) )
```

Testing in REPL that I can load the logger module and use it.:

```bash
cd src
node
> const loggerFactory = require('./src/util/logger');
undefined
> 2018-09-20 19:59:52.732 INFO  logger: Logger set to debug
> const logger = loggerFactory();
undefined
> logger.debug('testing');
undefined
> 2018-09-20 20:01:51.235 DEBUG testing
```

I also installed a Visual Studio Code extension called "Nodejs REPL". The extension provides an editor which sends the editor content live to the REPL. I experimented the REPL some time but then uninstalled it because it was a bit weird (sending your file to REPL after every keystroke...).

So, you can use the Node REPL for experimenting your code before you write it into the actual source file. 

When comparing Node and Clojure REPLs, Clojure wins this round hands down. The Lisp REPL is a real REPL compared to code snippet REPLs of Javascript and Python. See e.g. integrated [Cursive REPL](https://cursive-ide.com/userguide/repl.html) in IDEA (my favorite). If you have never used a real Lisp REPL you just don't understand how enormously productive it can be to interact with the program you are developing.

But since we have to use the Node REPL when implementing Node application I really would like to learn how to use the Node REPL in a more efficient way. E.g. to reload modules etc.

## Visual Studio Debugger

Visual Studio Debugger is pretty nice. I experimented that you can easily debug a module by adding the function you want to debug at the end of the module and start the module in debugger. Breakpoints etc. work as in other languages / IDEs. But afterall a poor substitute for a live Lisp REPL.

I also managed to configure my [launch.json](launch.json) after some googling so that I can debug my Mocha unit tests in Visual Studio Code debugger. The debugger worked nicely with breakpoints and all usual debugger stuff. 

# Testing

The assert Node module is pretty good. Creating tests with it is really simple and readability of the tests is good. Node is also lightning fast to start running the tests. E.g. you don't run the tests in the terminal in Clojure since it takes rather long time to load JVM, Clojure classes etc before the tests actually gets to run - in development you run the tests in the IDE where JVM and Clojure is already loaded. But in Node you can easily run the tests in terminal over and over again - the startup time is really fast.

```bash
time npm test
...
13 passing (16ms)
real	0m0.407s
```

# CORS Issues

TODO.


## Simple Server

TODO.

## Simple Frontend

TODO.

# Session Handling

TODO.

# Building for Production

Run:

```bash
TODO.
```

# Conclusions

## Javascript Syntax

Javascript syntax is probably the number one thing that I don't like that much in Javascript. I must say that the syntax is not that good if you compare it e.g. to Python (easy and concise) or Clojure (Lisp and elegant). In Clojure the Lisp and very minimal syntax is really elegant. The homoiconic nature lets you do all kinds of cool stuff in IDE (e.g. in IDEA/Cursive I created a hot key <shift><ctrl><k> which kills everything in this S-expression to the end of this S-expression (compared to standard Emacs hot key <ctrl><k> which kill everything from the cursor point to the end of the line)).

But once you learn to read the Javascript syntax it's - well not nice but more or less readable. I must say here that after some Python and Clojure hacking the Java syntax (verbose, very verbose) does not appeal me that much either. 

BTW. Now I understand why linters are more or less a mandatory part of Javascript programming - linters protect the developer to shoot himself/herself on the foot with the Javascript syntax.

And of course there is the division between statically typed (Java)and dynamically typed languages (Python, Clojure, Javascript) (see more e.g. in [wiki](https://en.wikipedia.org/wiki/Type_system)). In an enterprise type of software where there is a huge code base and tens of developers working on the code base on the same time the statically typed language protects developers quite a lot (not to speak about the good tooling that IDEs can provide based on static types). But for microservices and personal hacks dynamically typed languages beats statically typed languages hands down in developer productivity.

## Learning Curve

The learning curve for Javascript / Node was very gentle - you can learn the basic stuff of Javascript and Node in a couple of days and then be productive and start implementing e.g. a REST server just like I did in this exercise. The learning curve of Clojure was a lot steeper even though I used Scheme one year at the Helsinki University of Technology back in the 90's. I believe that the learning curve for Java is also a lot steeper. The basic stuff in Javascript is pretty simple and you can be productive also with the basic stuff and learn more on the fly when working in a real project. This is a good thing - a language should be easy, so that you can learn the basic stuff in a couple of days and then start working with the real thing and learn more when you need it. 

Why did I want to learn Clojure then if the learning curve is so steep? Well, it was more about an intellectual challenge. Learning and using Lisp changes the way you think and [makes you a better programmer](https://www.quora.com/Ive-heard-that-Lisp-makes-you-a-better-programmer-What-is-it-about-Lisp-that-strengthens-your-programming-skills). This is actually something I'd like to learn more in my Javascript / Node quest: how to use Javascript with immutable and functional programming paradigm? I also heard that Javascript is [a Lisp in C's clothing](https://www.crockford.com/javascript/javascript.html). Maybe after learning the basic stuff in Javascript I start to learn to use it in a more functional way. 

## Tooling

Node comes with npm which provides good tooling for the Node development. Visual Studio Code especially was a delightful suprise with its debugger and terminal.

## REPL

I must once again emphasize the power of the Lisp REPLs. A real Lisp REPL is something that is absolutely impossible to explain to another developer who has never done real stuff with a Lisp and and never used a Lisp REPL. IDEA / Cursive REPL is just the most productive development environment I have ever used. Using a Lisp REPL makes your program like an organic entity which grows with you experimenting with it using the REPL. The Node REPL is just fine but nothing compared to a real Lisp REPL.



## Developer Productivity

Productivity with Javascript and Node with npm and Visual Studio Code is pretty good. When I started this unholy quest in the Node land some younger developers told me that "you don't use IDEs with Javascript". Now I must say that I don't agree with that statement - Visual Studio Code with its code highlighting, good linter integration, extensions, debugger and terminal and everything else is as good an IDE as e.g. [PyCharm](https://www.jetbrains.com/pycharm/) which I use with Python hacking. And now with my Emacs keymap and favorite hot keys Visual Studio Code works pretty much the same way as my PyCharm and IntelliJ IDEA.

Nodemon made the cycle of experimenting and developing the API real fast. 

## Testing

Testing is the area where Node really shines. I have never seen a web server starting so blazingly fast in API testing, and also shutting down after tests. Just look at the [server.js](test/webserver/server.js) - before and after functions and try to run 'npm test' - damn, it's fast. 

```bash
2018-10-01 20:06:36.555 DEBUG Before tests start the webserver...
2018-10-01 20:06:36.569 DEBUG ENTER server.getInfo
2018-10-01 20:06:36.571 DEBUG EXIT server.getInfo
      ✓ respond with json
2018-10-01 20:06:36.576 DEBUG After tests shutdown the webserver...
```

Some 15 ms and Express server was up and ready for testing...

## Javascript as a Language

Javascript as a language is not bad at all. The productivity is pretty good since the entry barrier to the language is really slow: you can learn the basic stuff in a couple of days and start implementing a web server with an API. And surely with time you can learn more idiomatic ways to use Javascript and become more efficient Javascript developer.

## Javascript / Node vs. Clojure / JVM

Node is fast, that was my first observation. A short comparison running unit tests in Node vs Clojure/Lein/JVM:

- Node npm/Mocha (time npm test): 0m0.403s
- Clojure Leiningen (time lein test): 0m2.605s

I.e. Node starts immediately and run the tests. JVM boots very slowly, then loads Clojure jar, then loads project class files, then runs tests, and some 2,5 seconds of my precious time has been consumed that I will never get back in my life.

Well, a couple of seconds of developer time is not that bad if the language lets you be more prodactive. With Clojure REPL you don't actually run the whole project at once but you work on a namespace and load it onto REPL and experiment with it - which happens immediately since JVM and Clojure jar have already been loaded into the IDE.

I'm not going to compare the Node / JVM performance differences in various scenarios since wiser men have already written quite a lot about it (e.g. "Speaking Intelligently about "Java vs Node" Performance"(https://rclayton.silvrback.com/speaking-intelligently-about-java-vs-node-performance)). But there is one thing that you should understand as a developer - the different paradigm how typical server implementations work in Node and JVM: Node handles all requests in one thread using event loop and JVM typically spins a new thread per request - both mechanisms have pros and cons.

## Javascript vs. Python

I understand that younger developers who have learned Javascript when implementing frontends like to use Javascript with Node also in the backend side and use it as a scripting language with shells. But I would say that there is a much better language to be used as a bash surrogate: [Python](https://www.python.org/). I have used Python some 20 years (read more in my [blog](https://medium.com/tieto-developers/python-rocks-5dc453b5c222)) and it really is an excellent scripting language. It is always very easy to hack something quick in Python even if you haven't used the language for several months. The syntax is just so easy and clean and intuitive (which you really can't say about Javascript). That might the most important reason why I have never bothered to learn bash properly - you can always install python in any Linux box wih one yum/apt/whatever command and then hack the evil deed in Python and call the python script in the bash script.

One example was the CSV processing. In the Python side this is pretty simple and there is one module which is quite ubiquitiously used. In the Node side there were quite a lot of various CSV modules and not all provided as clear API as in the Python side. 

## Javascript and Node - Is There a Place in My Toolbox for Them?

**Backend.** Definitely yes. If I can choose the backend stack would probably go for Java/Spring in enterprise type of heavy stuff, Clojure in a bit more relaxed backend system, probably Python when implementing short serverless functions in AWS/Azure. But there is a lot of Node implementations and if some team is already using Node - no problem, let's use Node. 

**Frontend.** If I need to implement a simple admin type frontend for my own purposes I probably would use [ClojureScript](https://clojurescript.org/) since I really like the syntax and the real REPL when working with Lisp (read more in my [blog](https://medium.com/@kari.marttila/become-a-full-stack-developer-with-clojure-and-clojurescript-c58c93479294)). But the reality is that there is a lot of Javascript SPAs out there and if the team wants to use Javascript with Angular/React/whatever - no problem, let's use Javascript. One thing that I have learned anyway is that [SPA](https://en.wikipedia.org/wiki/Single-page_application) seems to be the future - I don't believe server side templating paradigm that much anymore (e.g. using Java with some templating libarary is a bit yesterday).



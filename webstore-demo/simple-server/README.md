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
- [CORS Issues](#cors-issues)
  - [Simple Server](#simple-server)
  - [Simple Frontend](#simple-frontend)
- [Session Handling](#session-handling)
- [Building for Production](#building-for-production)
- [Conclusions](#conclusions)
  - [Comparing Javascript / Node vs. Clojure / JVM](#comparing-javascript--node-vs-clojure--jvm)



# Introduction

This Simple Server is implemented using Javascript and Node. The functionality of the Simple Server is basically the same as in [Clojure Simple Server](https://github.com/karimarttila/clojure/tree/master/clj-ring-cljs-reagent-demo/simple-server) that I implemented earlier using Clojure (the rationale being to learn Clojure and how to implement a REST server using Clojure). Therefore, the rationale for this Javascript / Node Simple Server is to learn Javascript and Node and how to implement a REST server using those technologies.

So, the idea is to replicate the API of the previous Simple Server implemented in Clojure so that you can use [Clojure Simple Frontend](https://github.com/karimarttila/clojure/tree/master/clj-ring-cljs-reagent-demo/simple-frontend) to test the Javascript / Node Simple Server (the REST API is the same - you can use either server serving the Simple Frontend). This way it is also interesting to compare the two Simple Servers that are implemented in two totally different runtimes (JVM vs Node) and programming languages (Clojure vs Javascript).

I also try to replicate the Clojure namespace structure to the equivalent Node structures so that it is easy to compare various parts of the application (e.g. [core.js](src/core.js) - [core.clj](https://github.com/karimarttila/clojure/blob/master/clj-ring-cljs-reagent-demo/simple-server/src/simpleserver/core.clj))




# Technical Description

Simple Server is implemented using [Javascript](https://en.wikipedia.org/wiki/JavaScript) and [Node](https://nodejs.org/en/).

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

Node REPL is pretty good, a bit like Python REPL, but not anything like a real Lisp REPL, of course.

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

I also installed a Visual Studio Code extension called "Nodejs REPL". The extension provides an editor which sends the editor content live to the REPL.

So, you can use the Node REPL for experimenting your code before you write it into the actual source file. 

When comparing Node and Clojure REPLs, Clojure wins this round hands down. The Lisp REPL is a real REPL compared to code snippet REPLs of Javascript and Python. See e.g. integrated [Cursive REPL](https://cursive-ide.com/userguide/repl.html) in IDEA (my favorite).

I really would like to learn how to use the Node REPL in a more efficient way. E.g. to reload modules etc.

## Visual Studio Debugger

Visual Studio Debugger is pretty nice. I experimented that you can easily debug a module by adding the function you want to debug at the end of the module and start the module in debugger. Breakpoints etc. work as in other languages / IDEs. But afterall a poor substitute for a live Lisp REPL.


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

## Comparing Javascript / Node vs. Clojure / JVM

TODO.
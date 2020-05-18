<div align="center">
  <a href="https://superchargejs.com">
    <img width="471" style="max-width:100%;" src="https://superchargejs.com/images/supercharge-text.svg" />
  </a>
  <br/>
  <br/>
  <p>
    <h3>Strings</h3>
  </p>
  <p>
    String utilities for Node.js.
  </p>
  <br/>
  <p>
    <a href="#installation"><strong>Installation</strong></a> ·
    <a href="#Docs"><strong>Docs</strong></a> ·
    <a href="#usage"><strong>Usage</strong></a>
  </p>
  <br/>
  <br/>
  <p>
    <a href="https://www.npmjs.com/package/@supercharge/strings"><img src="https://img.shields.io/npm/v/@supercharge/strings.svg" alt="Latest Version"></a>
    <a href="https://www.npmjs.com/package/@supercharge/strings"><img src="https://img.shields.io/npm/dm/@supercharge/strings.svg" alt="Monthly downloads"></a>
  </p>
  <p>
    <em>Follow <a href="http://twitter.com/marcuspoehls">@marcuspoehls</a> and <a href="http://twitter.com/superchargejs">@superchargejs</a> for updates!</em>
  </p>
</div>

---

## Introduction
The `@supercharge/strings` package provides chainable string utilities for Node.js and JavaScript. It’s a wrapper around JavaScript’s global `String` class providing a handful of useful methods, like `.title()`, `.strip()`, `.camel()`, and so on.


## Installation

```
npm i @supercharge/strings
```


## Docs
Find all the [details for `@supercharge/strings` in the extensive Supercharge docs](https://superchargejs.com/docs/strings).


## Usage
Using `@supercharge/strings` is pretty straightforward. Pass a string to the imported Function and chain your desired methods to transform to string value to your needs.

For example, you may want to trim a string and then title-case it:

```js
const Str = require('@supercharge/strings')

const title = Str('  Supercharge is sweet!').trim().title().get()

// title: "Supercharge Is Sweet!"
```

For every method in the chain that would return a string, the package returns an instance of iteself. This way, you can chain further methods. Call `.get()` to retrieve the actual JavaScript string.


## Contributing
Do you miss a string function? We very much appreciate your contribution! Please send in a pull request 😊

1.  Create a fork
2.  Create your feature branch: `git checkout -b my-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request 🚀


## License
MIT © [Supercharge](https://superchargejs.com)

---

> [superchargejs.com](https://superchargejs.com) &nbsp;&middot;&nbsp;
> GitHub [@superchargejs](https://github.com/superchargejs/) &nbsp;&middot;&nbsp;
> Twitter [@superchargejs](https://twitter.com/superchargejs)

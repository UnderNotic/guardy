# <img height="250" alt="portfolio_view" src="https://raw.githubusercontent.com/undernotic/guardy/master/img/logo-title.png">

[![CircleCI](https://circleci.com/gh/UnderNotic/guardy.svg?style=svg)](https://circleci.com/gh/UnderNotic/guardy)
[![Coverage Status](https://coveralls.io/repos/github/UnderNotic/guardy/badge.svg?branch=master)](https://coveralls.io/github/UnderNotic/guardy?branch=master)
[![BCH compliance](https://bettercodehub.com/edge/badge/UnderNotic/guardy?branch=master)](https://bettercodehub.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![dependencies Status](https://david-dm.org/undernotic/guardy/status.svg)](https://david-dm.org/undernotic/guardy)

[![NPM](https://nodei.co/npm/guardy.png)](https://nodei.co/npm/guardy/)

Simple and natural nested property accessor.  
Protect yourself from "Cannot read property 'x' of undefined" runtime exception.

# Installing

Package is available in npm. It's in umd format so it will work correctly with all popular bundlers(webpack) and also nodejs.

```bash
npm install guardy --save
```

Using yarn

```bash
yarn add guardy --save
```

For direct usage without bundler, use iife format and import file directly:

```html
<script src="dist/guardy-iife.min.js"></script>
```

# Usage

Wrap object with guardy and then access with no stress any property at any nested level.
If not defined it will fallback to empty object {} instead of throwing "Cannot read property 'x' of undefined" runtime exception.

```javascript
import { guardy } from "guardy";

var nestedProp = guardy(myObj).I.can.safely.access.any.property;
```

With defined fallback value

```javascript
import { guardyFb } from "guardy";

var nestedProp = guardyFb(myObj, "myFallBackStringOrAnyType").I.can.safely.access.any.property.__value__;
```

Guardy can be successfully used together with redux when trying to access not yet initialized state properties by providing safe fallback values.

```javascript
const mapStateToProps = ({ NestedReducerState }) => (
    {
       var nestedStateObject = guardy(NestedReducerState).a.nested.object;
       var nestedStateString = guardyWithFallback(NestedReducerState, "defaultString").a.nested.string.__value__;

       return {
           nestedStateObject,
           nestedStateString
       }
    }
);
```

# Compatibility

* nodejs >= 6.4.0
* browser with Proxy compatibility, see https://caniuse.com/#search=Proxy

# Licensing

The code in this project is licensed under MIT license.

![EPIC MAIL](images/logo.svg)

[![Build Status](https://travis-ci.org/djallas/epicmail.svg?branch=develop)](https://travis-ci.org/djallas/epicmail)
[![Coverage Status](https://coveralls.io/repos/github/djallas/epicmail/badge.svg)](https://coveralls.io/github/djallas/epicmail)
[![Maintainability](https://api.codeclimate.com/v1/badges/7f987f44da1233229618/maintainability)](https://codeclimate.com/github/djallas/epicmail/maintainability)

EPIC Mail is web app that help people to send and receice emails. It uses Twilio to notify the arrival of email.

# App Links

### [Server](https://epicmailbox.herokuapp.com)

### [UI](https://djallas.github.io/epicmail/)

# Tools

1. Frontend: Html, CSS, Javascript
2. Backend: NodeJS & ExpressJS
3. Database: PostgreSQL
4. SMS: Twilio

# User Interface

![EPIC MAIL](images/EPICMAILINBOX_UI.png "EPIC MAIL")

## How to use UI Framework?

To get started, call css file in the html page
```
<link rel="stylesheet" href="css/style.0.1.css">
```

### Font family used: 

Text: Open Sans
Heading: Krub

## 1. Style helpers

Wrap element with max width of 1280px
`.container`

Hide element
`.hide`

Hide element on large screen
`.hide-on-large`

Hide element on medium screen
`.hide-on-medium`

Hide element on small screen
`.hide-on-small`

### Border

Initiate border
`.border`

### Border color
White
`.b-lite`

Grey
`.b-grey`

Red
`.b-red`

Black
`.b-red`

Indigo
`.b-indigo`


### Clearfix
`.clear`

#### Aligment

Center
`.center-align`

Left
`.left-align`

Right
`.right-align`


## 2. Playing with Paddings

**-h-** indicate that the property is applied horizontally on a given selector
**-v-** indicate that the property is applied veritically on a given selector

Small padding

`.s-padding`
`.s-h-padding`
`.s-v-padding`

Medium padding

`.m-padding`
`.m-h-padding`
`.m-v-padding`

Large padding

`.l-padding`
`.l-h-padding`
`.l-v-padding`

Extra large padding

`.xl-padding`
`.xl-h-padding`
`.xl-v-padding`

Extra large padding

`.xxl-padding`
`.xxl-h-padding`
`.xxl-v-padding`

## 3. Playing with Margins

**-h-** indicate that the property is applied horizontally on a given selector
**-v-** indicate that the property is applied veritically on a given selector

Small margin

`.s-margin`
`.s-h-margin`
`.s-v-margin`

Medium margin
`.m-margin`
`.m-h-margin`
`.m-v-margin`

Large padding
`.l-margin`
`.l-h-margin`
`.l-v-margin`

Extra large padding
`.xl-margin`
`.xl-h-margin`
`.xl-v-margin`

Extra large padding
`.xxl-margin`
`.xxl-h-margin`
`.xxl-v-margin`

## 4. Typography

Small text
`.s-text`

Medium text
`.m-text`

Large text
`.l-text`

Extra large text
`.xl-text`

Extra-extra large text
`.xxl-text`


## 5. grid

Grid must be wrap in row
`.row`

|  | Small  |  Medium | Large |
| ------- | --- | --- | --- |
| Prefix | `.s` | `.m` | `.l` |

## 6. Color palette

White
`.white`

Black
`.black`

Grey
`.grey`

Indigo
`.indigo`

- Add `text- ` prefix before the defined color class to apply it on text 

- `darken-1` , `darken-2` and `darken-3` gives option to play with strongness of the color 

## 7. form

Input, textarea, radio, checkbox and button must be in `.input-field` `div` or `p`

#### example
```
    <div class="input-field">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="your email">
    </div>
```

## 8. Button

Initiate button
`.btn`


## 9. Managing Image

If your wrap to wrap image to fix the width of a container, you must add `.image` in the parent container of a image


## 10. Alert

To use alerts, call ```<script> message('message', 'state') </script>``` function that has 2 parameters, ```message``` parameter carries a message to be alerted whereas ```state``` parameter specifies the state of the message. The state can be either    ```success```, ```info``` or ```error```

## Shadow

To add shadow depth in an element, add one of the following classes:


```.shadow-1```

```.shadow-2```

```.shadow-3```

```.shadow-4```

```.shadow-5```


# Server

## Prerequisites
You need to install the following to be able to run the project on your local machine.

To check if you have Node.js installed, run this in CLI:

node -v

To confirm that you have npm installed you can run this CLI

npm -v

### Clone the repository locally 

```
https://github.com/djallas/epicmail.git
```

### Run the tests and check coverage

```
npm test
```

## How to Run App

```
npm start
```

# Table of API Endpoints

## HTTP Verbs

| Methods | Endpoints | Actions |
--- | --- | ---
| /GET | / | Welcome message |
| /GET | /api/v1/users | Get list of users |

# Author

### Gilles Kagarama

[Twitter: @kagaramag](https://www.twitter/kagaramag)

[Scotch.io: @kagarama](https://scotch.io/@gilles)

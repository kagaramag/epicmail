![EPIC MAIL](images/logo.svg)

[![Build Status](https://travis-ci.org/djallas/epicmail.svg?branch=develop)](https://travis-ci.org/djallas/epicmail)
[![Coverage Status](https://coveralls.io/repos/github/djallas/epicmail/badge.svg)](https://coveralls.io/github/djallas/epicmail)
[![Maintainability](https://api.codeclimate.com/v1/badges/7f987f44da1233229618/maintainability)](https://codeclimate.com/github/djallas/epicmail/maintainability)

EPIC Mail is web app that help people to send and receice emails. It uses Twilio to notify the arrival of email.

# App Links

### [Server](https://epicmailbox.herokuapp.com)

### [UI](https://djallas.github.io/epicmail/)



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
| :----- | :----- | ----- |
| /GET | / | Welcome message |
| /GET | /docs | API Documentation |
| /GET | /api/v1/users | Get list of users |
| /GET | /api/v1/contacts | Get list of contacts |
| /POST | /auth/signup | Sign up a new user |
| /POST | /auth/login | Get list of contactsLogin a user |
| /POST | /api/v1/messages | Send an amail |
| /GET | /api/v1/messages | Fetch all received emails |
| /GET | /api/v1/messages/unread | Fetch all unread emails |
| /GET | /api/v1/messages/sent | Fetch all sent emails |
| /DELETE | /api/v1/messages/<message-id> | Delete a specific email |
| /POST | /api/v1/groups | Create a group |
| /GET | /api/v1/groups | Get a list of group |

# Validations

The validation helper provide tools to validate inputs

## Import the component

```import Validate from "../helpers/validation";```

## How to use it?


```
checkInputs.push(Validate.string('input_name', pattern, boolean, int, int));
```
- **input_name** is the name of your input to be validated
- **pattern** is the value of what you want to be validated
- **boolean** is the value to indicated if the field is required or not
- First **int** indicated the minimum number of pattern characters to be validated
- Last **int** indicated the maximum number of pattern characters to be validated


# Author

### Gilles Kagarama

[Twitter: @kagaramag](https://www.twitter/kagaramag)

[Scotch.io: @kagarama](https://scotch.io/@gilles)

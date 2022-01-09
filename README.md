# SimpleZ-api

This is a ```Node.js RestAPI``` developed for my [SimpleZ](https://github.com/krzysiou/SimpleZ) website. It contains endpoints which allow front-end to send and request data. It got hot-reload feature using nodemon. To hos server on your computer simply type ```npm install``` and follow it by ```nodemon index.js```.

## Overview

The most important file on the whole server must be [index.js](./index.js), it contains all endpoints corresponding to given functions that will be called upon request hitting the endpoint.
I designed a few controllers located in [this folder](./controllers) they contain methods which operate on set of values and manage the data accordingly.

## Controllers

I divided the controllers section into three parts ```Authorization UserControl and Validation```.

### Authorization [file](./controllers/check-auth.js)

This file contains method that authorizes every secured endpoint meaning that it guards contents of the page that shouldn't be operatable by users that are not logged in. It checks if JWT token was passed in a request header and verifies it by decoding the token using ```ACCESS_TOKEN_SECRET```
In case of successful authorization, user is allowed to access the endpoint. In any other case endpoint is blocked and error is sent to front-end.

### UserControl [file](./controllers/userControl.js)

It consists of list of methods that allow server to fully operate on user data and its files. It allows to: ```show signed up users```,
```add user``` by encrypting its credentials and generating JWT token, ```log user in``` it checks credentials and if correct returns JWT token, ```get user files```
it returns list of files that given user has created, ```create file``` it creates file object and adds it to corresponding user, ```delete file```, ```load file```
and ```patch file``` which both of these methods are used to edit file in front-end site.

### Validation [file](./controllers/validation.js)

This file is based on ```Joi's``` validation. It consists of schemas that are used to validate if values of keys of passed objects got valid properties.
The validation throws error if any of the properties isn't valid.

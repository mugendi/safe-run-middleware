#NodeJS safe-run-middleware

[![npm](https://img.shields.io/npm/dt/run-middleware.svg?maxAge=2592000)](https://www.npmjs.com/package/safe-run-middleware)
[![npm version](https://badge.fury.io/js/safe-run-middleware.svg)](https://badge.fury.io/js/run-middleware)

This module is an extension of [run-middleware](https://www.npmjs.com/package/run-middleware) with the following key changes.
1. It returns a promise 
2. It automatically ensures route to be called is already created via app or router and automatically adds the right method to call the route

## Why?

Many times, your server and your client, need to execute the same functions. For example here is an endpoint to get user details:

    app.get('/get-user/:id',function(req,res){
    	mysql.query('select * from users where id=?',[req.params.id],function(err,rows){
    		res.send({user:rows[0]})
    	})
    })

Now you want to get the user details from your code. What should you do?

    rc.runMiddleware('/get-user/20').then(function(code,body,headers){
    	console.log('User Details:',body)
    })

---

## Installation

    yarn add safe-run-middleware

    var express=require('express')
    var app=express();
    let rc = require('safe-run-middleware')(app)

## Support & Contributions

* Pull requests, issues, and English proofreading are welcome on Github.
* Question & support on StackOverflow using `run-middleware`tag.

---

## Change request paramaters

As options you can pass the `query`, `body`, `method`, `cookies` parameters.

    rc.runMiddleware('/handler',{
    		method:'post',
    		query:{token:'tk-12345'},
    		body:{"action":"list","path":"/"}
    	}).then(function(code,data){
    		console.log(code,data)
    		process.exit()
    	})

## Refer to Run Middleware
All other functionality is as documented at run middleware.


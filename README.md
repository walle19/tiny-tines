#Tiny Tines

Tiny Tines is replicating one of the features provided by the [Tines](https://www.tines.io) of running Agents in a provided sequence.

Agents Type
1. HTTPRequestAgent 
2. PrintAgent

Directory Structure is as follow:

> **bin** consist of App entry _`index.js`_ <br>
**class** consist of agent.js for creating different type of agents and to perform their respective functionality <br>
**stubs** consist of mock JSON files for unit testing or running an example <br>
**test** consist of all unit test files <br>
**utility** consist of 
>> _`constant.js`_ having all constants used across app <br>
_`helper.js`_ providing method to read JSON file and parse the message/URL with values from data(received via request(s) made) <br>
_`logger.js`_ for printing logs using _`console.log`_ 

##
###App Specs

Build on
> NodeJS App <br>
Node version: v10.5.0

Helper
> UnderscoreJS 

Get Request via
> xmlhttprequest

Unit Testing
> chai <br>
mocha <br>
sinon <br>
sinon-chai

##
###Pre-requirement
Install the `node.js` LTS version from [Node website](https://nodejs.org/en/) and npm gets installed along with node.

Install all dependencies in package.json

```
npm install
```

##
###Running App

Run below command using node command

`node bin/index.js {JSON filePath}`

Example

```
node bin/index.js stubs/tiny-tines-sunset.json
```

OR Run below command using npm command
 
```
npm start {JSON filePath}
```

Example

```
npm start stubs/tiny-tines-sunset.json
```
 
##
###Run an example

Using a stub file provide, we can run and see the output

File: tiny-tines-sunset.json
Location: /stubs

To run the example, please run below command
```
npm run example
```

##
###Test

Test files are located under **/test** directory

To run all test cases
  
```
npm run test
```

To run a single test file

```
npm run test-single --file={file name}
```

##
###Future Scope
Considering the App is currently **command-line, synchronous request are made**. 
For future, as App turns out to be UI based then we can move to **Asynchronous approach for making request**.
This is due to sync request uses the main thread and will block the UI rendering, thereby leading to bad user experience.

##
###Troubleshooting
1. App crash due to 502 http error (Bad Gateway)

Due to too many request to a server in a short span of period.

Example
```
npm run exec stubs/tiny-tines.json
```



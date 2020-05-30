# Tiny Tines

Perform sequential actions based on different agents

Agents Type
1. HTTPRequestAgent 
2. PrintAgent

Actions available
1. HTTP request
2. Display message on console

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
### App Specs

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
sinon-chai <br>
nock

##
### Prerequisites
Install the `node.js` LTS version from [Node website](https://nodejs.org/en/) and npm gets installed along with node.

Install all dependencies in package.json

```
npm install
```

##
### Running App

Run below command using node command

```
node bin/index.js {JSON filePath}
```

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
### Test

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
### Updates

| Date | Version  | Comment  |
| :---:   | :-: | :-: |
| 20th May 2020 | 1.0 | Initial commit |
| 31st May 2020 | 1.1 | Refactor Agent's functionality leaking outside and update of respective test-cases |

##
### Future Scope

* Add a basic URL validator

##
### Troubleshooting
1. For viewing trace logs please set **_`IS_DEBUG`_** to true in `utility/constant.js` file
1. App crash due to 502 http error (Bad Gateway)

Due to too many request to a server in a short span of period.

Example
```
npm run exec stubs/tiny-tines.json
```



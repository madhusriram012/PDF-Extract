# PDF-Extract


## Pre-requisites:
For development, you will only need Node.js and a node global package installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g
    
    

## How to run the project

_This involves multiple steps, so please read carefully_

### Step 1: Clone the repository
```bash
git clone https://github.com/madhusriram012/PDF-Extract.git
```

### Step 2: Install dependencies

```bash
cd PDF-Extract
npm install 
```

### Step 3: 

Delete the existing private.key and pdfservice-api-credentials.json file and add your own in place of it by getting it from https://developer.adobe.com/document-services/apis/pdf-extract/ .


### Step 4:
Initially you can see the output inside the output folder but in order to see yourself just remove the contents inside the output folder and run,
```bash
node index.js
```
we will get the output as combined-text.csv file inside the output folder.


## Assumptions
The code provided works on the assumption that all invoices are of the same given format.


## Improvements
Initially writing files was done sequentially like one by one ,this was replaced by concurrency multiple write program which takes 20 pdfs at a time .

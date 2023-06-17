# PDF-Extract

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

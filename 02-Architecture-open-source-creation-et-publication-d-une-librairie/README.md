# env-validator

Lightweight tool to validate your environment variables against a JSON schema at application startup.

## Description

`env-validator` checks for the presence, type, and format (with regex) of your environment variables. It helps prevent runtime errors due to missing or malformed configurations.

## Installation

```bash
# For development (create a global symlink)
git clone git@github.com:Watshy77/b3-rattrapages-queva-william.git

cd 02-Architecture-open-source-creation-et-publication-d-une-librairie/

npm link

npm install -g dotenv-cli

# For production (global install)
npm install -g dotenv-cli

npm install -g @watshy/env-validator
```

## Usage

1. **Create a schema file** `schema.json` (e.g., at your project root):

    ```json
    [
    	{ "name": "PORT", "required": true, "type": "number" },
    	{ "name": "DB_HOST", "required": true, "type": "string" },
    	{
    		"name": "API_KEY",
    		"required": true,
    		"type": "string",
    		"regex": "^\\w{32}$"
    	},
    	{ "name": "ENABLE_FEATURE", "required": false, "type": "boolean" }
    ]
    ```

2. **Run the validation** from any directory:
    ```bash
    dotenv -- env-validator ./schema.json
    ```

-   Exit code `0` if all variables are present and valid.
-   Exit code `1` if the file is missing, JSON is invalid, or a variable is missing/malformed.

## Resources and Inspiration

-   Project inspiration: [simple-env-verify](https://www.npmjs.com/package/simple-env-verify)
-   Guide to create and publish NPM packages: [Creating and publishing scoped public packages](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)
-   NPM CLI docs on `bin` configuration: [npm CLI docs: bin](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#bin)

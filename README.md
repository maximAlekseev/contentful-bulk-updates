# Contentful bulk updates

Setup
1. create .env file from .env.example file (secure CF token should be provided internally), vars are:
```
- BATCH_STEP is 100 (recommended);
- STARTING_SKIP (to start from the first enrtry should be 0);
- CF_LOCALE_KEY - locale key (en-EN, de-DE, etc.);
- CF_ENTRY_TYPE - id of contend type;
- CF_ENV - prod/dev, etc.;
- CF_SPACE_KEY - CF secure space key;
- ACCESS_TOKEN - CF secure write token;
```
```
2. run:

yarn install
```
```
3. run:

yarn build && yarn

start to start the application
```
4. you will be prompted with 3 questions: 
- field name (id of field, that required to be changed in specified entry);
- field data type (string, number, boolean, list for now);
- field value;
5. wait for the job to complete updating and publishing entries one by one (CF has requests restrictions, better to do this way)


### Testing

Run all tests ``` npm test ```

Run concrete set of tests ``` npx jest tests/note_api.test.js --runInBand ```

Run test with concrete name
```npx jest -t 'a specific note is within the returned notes'```

Run tests contain particular name
```npx jest -t 'notes' --runInBand```

You can instal jesto globally and run test with ```jest``` command
```npm install -g jest```
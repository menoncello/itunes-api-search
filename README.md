# iTunes API Search
Welcome to the iTunes API Search.

With this module you can make any search to iTunes API.

1.	You can search for any iTunes media:
	* movie
	* podcast
	* music
	* musicVideo
	* audiobook
	* shortFilm
	* tvShow
	* software
	* ebook
	* all
2. Search for any attribute available on the iTunes API
	* country
	* media
	* entity
	* attribute
	* limit
	* lang
	* version
	* explicit
3. Get all result in Objects
4. Fast and Safe


## Install

```bash
$ npm install itunes-api-search
```

## How to use

```javascript
var itunesApiSearch = require('itunes-api-search');

// itunesApiSearch.search(term, options, callback)

itunesApiSearch.search('rock',{
		entity: 'music',
		limit: 100, // max 200
		country: 'BR'
	}, function (err, res) {
		if (err) {
			console.log(err);
			return;
		}
		
		console.log(res);
	});
```


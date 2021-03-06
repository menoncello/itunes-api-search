const Promise = require('bluebird');
const querystring = require('querystring');
const request = require('request');

exports.search = search;

const baseUrl = 'http://itunes.apple.com/search?';

function search(term, options, callback) {
  if (!term) {
    callback({ text: 'search term is required' });
    return;
  }

  options = options ? options : {};

  options.term = term;

  let url = baseUrl + querystring.stringify(options);

  return new Promise((resolve, reject) => {
	  request(url, (err, header, result) => {
		  if (err) {
			  if (callback) {
			  	callback(err);
			  }
			  reject(err);
			  return;
		  }

		  let data;
		  try {
			  data = JSON.parse(result);
		  } catch (e) {
		  	if (callback) {
		  		callback(e);
			  }
			  reject(e);
			  return;
		  }

		  data.term = term;

		  if (callback) {
		  	callback(null, data);
		  }
		  resolve(data);
	  });
  });
}

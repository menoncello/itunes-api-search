const chai = require('chai');
const should = chai.should();
const sinon = require('sinon');
const mockery = require('mockery');
const Promise = require('bluebird');

const okResults = require('./ok-results');
const sandbox = sinon.sandbox.create();
let itunesApiSearch;

function requestOkData(url, callback) {
	callback(null,
		{statusCode: 200},
		'{ "resultCount":6, "results": [{"wrapperType":"track", "kind":"feature-movie", "trackId":876607768, "artistName":"Chris Mason Johnson", "trackName":"Test", "trackCensoredName":"Test", "trackViewUrl":"https://itunes.apple.com/us/movie/test/id876607768?uo=4", "previewUrl":"http://a1850.phobos.apple.com/us/r1000/042/Video2/v4/f0/4c/9b/f04c9b06-a9e0-5440-30fa-955deff61850/mzvf_2097503483435513262.640x480.h264lc.D2.p.m4v", "artworkUrl30":"http://is4.mzstatic.com/image/thumb/Video3/v4/bf/2d/b0/bf2db045-a181-6c1c-b5bf-a104bdf9c931/source/30x30bb.jpg", "artworkUrl60":"http://is4.mzstatic.com/image/thumb/Video3/v4/bf/2d/b0/bf2db045-a181-6c1c-b5bf-a104bdf9c931/source/60x60bb.jpg", "artworkUrl100":"http://is4.mzstatic.com/image/thumb/Video3/v4/bf/2d/b0/bf2db045-a181-6c1c-b5bf-a104bdf9c931/source/100x100bb.jpg", "collectionPrice":9.99, "trackPrice":9.99, "trackRentalPrice":2.99000, "collectionHdPrice":12.99000, "trackHdPrice":12.99000, "trackHdRentalPrice":3.99000, "releaseDate":"2014-06-06T07:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "trackTimeMillis":5376293, "country":"USA", "currency":"USD", "primaryGenreName":"Drama", "contentAdvisoryRating":"Unrated", "shortDescription":"Available Same Day as Theaters. Set in the free-spirited San Francisco of 1985 in the early years of", "longDescription":"Set in the free-spirited San Francisco of 1985 in the early years of the AIDS epidemic, Chris Mason Johnsons “Test” follows young aspiring dancer Frankie (dancer Scott Marlowe in his acting debut) as he confronts the challenges of being an understudy in a modern dance company where he’s taunted to “dance like a man!” Frankie embarks on a budding relationship with hunky Todd (Matthew Risch, HBO’s “Looking”), a veteran dancer in the same company and the bad boy to Frankie’s naiveté. As Frankie and Todd’s friendship deepens, they navigate a world of risk, but also a world of hope, humor, visual beauty, and musical relief. Featuring captivating dance sequences especially choreographed for the film by acclaimed U.S. choreographer Sidra Bell."}, {"wrapperType":"track", "kind":"song", "artistId":258535972, "collectionId":258615649, "trackId":258618600, "artistName":"Little Dragon", "collectionName":"Little Dragon", "trackName":"Test", "collectionCensoredName":"Little Dragon", "trackCensoredName":"Test", "artistViewUrl":"https://itunes.apple.com/us/artist/little-dragon/id258535972?uo=4", "collectionViewUrl":"https://itunes.apple.com/us/album/test/id258615649?i=258618600&uo=4", "trackViewUrl":"https://itunes.apple.com/us/album/test/id258615649?i=258618600&uo=4", "previewUrl":"http://a1677.phobos.apple.com/us/r1000/095/Music/v4/f2/e0/52/f2e052d8-9bbf-259b-e756-4a7b8e3051f8/mzaf_7505881598002303833.m4a", "artworkUrl30":"http://is3.mzstatic.com/image/thumb/Music/v4/73/aa/cd/73aacdee-0259-fda7-3e6f-28433c098b38/source/30x30bb.jpg", "artworkUrl60":"http://is3.mzstatic.com/image/thumb/Music/v4/73/aa/cd/73aacdee-0259-fda7-3e6f-28433c098b38/source/60x60bb.jpg", "artworkUrl100":"http://is3.mzstatic.com/image/thumb/Music/v4/73/aa/cd/73aacdee-0259-fda7-3e6f-28433c098b38/source/100x100bb.jpg", "collectionPrice":9.99, "trackPrice":0.99, "releaseDate":"2007-08-27T07:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "discCount":1, "discNumber":1, "trackCount":12, "trackNumber":10, "trackTimeMillis":268040, "country":"USA", "currency":"USD", "primaryGenreName":"Electronic", "isStreamable":true}, {"wrapperType":"track", "kind":"song", "artistId":609022, "collectionId":302068445, "trackId":302068575, "artistName":"Ministry", "collectionName":"The Mind Is a Terrible Thing to Taste", "trackName":"Test", "collectionCensoredName":"The Mind Is a Terrible Thing to Taste", "trackCensoredName":"Test", "artistViewUrl":"https://itunes.apple.com/us/artist/ministry/id609022?uo=4", "collectionViewUrl":"https://itunes.apple.com/us/album/test/id302068445?i=302068575&uo=4", "trackViewUrl":"https://itunes.apple.com/us/album/test/id302068445?i=302068575&uo=4", "previewUrl":"http://a826.phobos.apple.com/us/r1000/000/Music2/v4/db/38/04/db380417-3dc4-850f-3ce5-0b28a93b7bbb/mzaf_5848383574441692765.plus.aac.p.m4a", "artworkUrl30":"http://is4.mzstatic.com/image/thumb/Music/v4/fd/b2/8d/fdb28d5f-a1c9-d5b3-2c4d-b8b613b51c4b/source/30x30bb.jpg", "artworkUrl60":"http://is4.mzstatic.com/image/thumb/Music/v4/fd/b2/8d/fdb28d5f-a1c9-d5b3-2c4d-b8b613b51c4b/source/60x60bb.jpg", "artworkUrl100":"http://is4.mzstatic.com/image/thumb/Music/v4/fd/b2/8d/fdb28d5f-a1c9-d5b3-2c4d-b8b613b51c4b/source/100x100bb.jpg", "collectionPrice":8.99, "trackPrice":0.99, "releaseDate":"1989-11-10T08:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "discCount":1, "discNumber":1, "trackCount":9, "trackNumber":7, "trackTimeMillis":364307, "country":"USA", "currency":"USD", "primaryGenreName":"Rock", "isStreamable":true}, {"wrapperType":"track", "kind":"song", "artistId":396643, "collectionId":309226405, "trackId":309226521, "artistName":"Crash Test Dummies", "collectionName":"God Shuffled His Feet", "trackName":"Mmm Mmm Mmm Mmm", "collectionCensoredName":"God Shuffled His Feet", "trackCensoredName":"Mmm Mmm Mmm Mmm", "artistViewUrl":"https://itunes.apple.com/us/artist/crash-test-dummies/id396643?uo=4", "collectionViewUrl":"https://itunes.apple.com/us/album/mmm-mmm-mmm-mmm/id309226405?i=309226521&uo=4", "trackViewUrl":"https://itunes.apple.com/us/album/mmm-mmm-mmm-mmm/id309226405?i=309226521&uo=4", "previewUrl":"http://a1554.phobos.apple.com/us/r1000/077/Music/4b/c5/c6/mzm.oudqwwaf.aac.p.m4a", "artworkUrl30":"http://is5.mzstatic.com/image/thumb/Music/v4/4e/37/0d/4e370d98-d3c8-5474-6c70-28c693a347e6/source/30x30bb.jpg", "artworkUrl60":"http://is5.mzstatic.com/image/thumb/Music/v4/4e/37/0d/4e370d98-d3c8-5474-6c70-28c693a347e6/source/60x60bb.jpg", "artworkUrl100":"http://is5.mzstatic.com/image/thumb/Music/v4/4e/37/0d/4e370d98-d3c8-5474-6c70-28c693a347e6/source/100x100bb.jpg", "collectionPrice":9.99, "trackPrice":1.29, "releaseDate":"1993-10-26T07:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "discCount":1, "discNumber":1, "trackCount":12, "trackNumber":3, "trackTimeMillis":235173, "country":"USA", "currency":"USD", "primaryGenreName":"Rock", "isStreamable":true}, {"wrapperType":"track", "kind":"song", "artistId":472054, "collectionId":516701586, "trackId":516701815, "artistName":"John Mayer", "collectionName":"Born and Raised", "trackName":"Walt Graces Submarine Test, January 1967", "collectionCensoredName":"Born and Raised", "trackCensoredName":"Walt Graces Submarine Test, January 1967", "artistViewUrl":"https://itunes.apple.com/us/artist/john-mayer/id472054?uo=4", "collectionViewUrl":"https://itunes.apple.com/us/album/walt-graces-submarine-test/id516701586?i=516701815&uo=4", "trackViewUrl":"https://itunes.apple.com/us/album/walt-graces-submarine-test/id516701586?i=516701815&uo=4", "previewUrl":"http://a768.phobos.apple.com/us/r1000/119/Music/50/fb/94/mzm.lijdspvz.aac.p.m4a", "artworkUrl30":"http://is5.mzstatic.com/image/thumb/Music/v4/af/61/a3/af61a347-364a-9ba2-af2c-35fb03abe672/source/30x30bb.jpg", "artworkUrl60":"http://is5.mzstatic.com/image/thumb/Music/v4/af/61/a3/af61a347-364a-9ba2-af2c-35fb03abe672/source/60x60bb.jpg", "artworkUrl100":"http://is5.mzstatic.com/image/thumb/Music/v4/af/61/a3/af61a347-364a-9ba2-af2c-35fb03abe672/source/100x100bb.jpg", "collectionPrice":10.99, "trackPrice":1.29, "releaseDate":"2012-05-18T07:00:00Z", "collectionExplicitness":"notExplicit", "trackExplicitness":"notExplicit", "discCount":1, "discNumber":1, "trackCount":13, "trackNumber":9, "trackTimeMillis":310240, "country":"USA", "currency":"USD", "primaryGenreName":"Rock", "isStreamable":true}, {"wrapperType":"track", "kind":"song", "artistId":484949, "collectionId":158332411, "trackId":158332598, "artistName":"Prong", "collectionName":"Cleansing", "trackName":"Test", "collectionCensoredName":"Cleansing", "trackCensoredName":"Test", "artistViewUrl":"https://itunes.apple.com/us/artist/prong/id484949?uo=4", "collectionViewUrl":"https://itunes.apple.com/us/album/test/id158332411?i=158332598&uo=4", "trackViewUrl":"https://itunes.apple.com/us/album/test/id158332411?i=158332598&uo=4", "previewUrl":"http://a493.phobos.apple.com/us/r1000/091/Music/cc/51/29/mzm.qndoitau.aac.p.m4a", "artworkUrl30":"http://is4.mzstatic.com/image/thumb/Music/v4/17/dc/38/17dc389c-d0ac-6514-ddd6-41ea561b77e0/source/30x30bb.jpg", "artworkUrl60":"http://is4.mzstatic.com/image/thumb/Music/v4/17/dc/38/17dc389c-d0ac-6514-ddd6-41ea561b77e0/source/60x60bb.jpg", "artworkUrl100":"http://is4.mzstatic.com/image/thumb/Music/v4/17/dc/38/17dc389c-d0ac-6514-ddd6-41ea561b77e0/source/100x100bb.jpg", "collectionPrice":9.99, "trackPrice":0.99, "releaseDate":"1994-01-25T08:00:00Z", "collectionExplicitness":"cleaned", "trackExplicitness":"cleaned", "discCount":1, "discNumber":1, "trackCount":12, "trackNumber":12, "trackTimeMillis":399600, "country":"USA", "currency":"USD", "primaryGenreName":"Metal", "contentAdvisoryRating":"Clean", "isStreamable":true}] }');
}

describe('itunesApiSearch - callback - with right results', function() {

  before(function (){
    mockery.enable({
      warnOnReplace: false,
	    warnOnUnregistered: false,
      useCleanCache: true
    });
  });

  beforeEach(function(){
    mockery.registerMock('request', requestOkData);
    itunesApiSearch = require('../index.js');
  });

  afterEach(function(){
    sandbox.verifyAndRestore();
    mockery.deregisterAll();
  });

  after(function(){
    mockery.disable();
  });




  it('should the function search exists', function(){
    itunesApiSearch.search.should.to.be.a('function');
  });

  it('should callback be called if the search is empty', function(){
    let callback = sinon.spy();
    itunesApiSearch.search(null, null, callback);
    callback.called.should.to.be.true;
  });

  it('should returns a error if the search is empty', function(done){
    itunesApiSearch.search(null, null, function (err, res) {
      should.exist(err);
      err.text.should.equal('search term is required');
      done();
    });
  });

  it('should callback be called if the search is not empty', function(done) {
    itunesApiSearch.search('test', null, function(err, res) {
      should.not.exist(err);
      should.exist(res);
      done();
    });
  });

  it('should return a object with 6 items', function(done) {
    itunesApiSearch.search('test', null, function(err, res) {

      res.should.to.be.a('object');
      res.resultCount.should.equal(6);
      res.results.should.to.be.a('array');
      res.results.length.should.equal(6);

      done();
    });
  });
});

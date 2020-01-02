// http://chrisjopa.com/2016/04/21/counting-word-frequencies-with-javascript/
// https://github.com/JamesHight/node-contractions
// https://github.com/moos/wordpos
// https://github.com/winkjs/wink-lemmatizer
// https://github.com/ryu1kn/csv-writer

var fs = require('fs');
var InputFile = 'INPUT.txt';
var contractions = require('contractions');
var lemmatize = require( 'wink-lemmatizer' );
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var WordPOS = require('wordpos');
var wordpos = new WordPOS();


//Create Headers for the CSV Files
const csvWriter1 = createCsvWriter({
  fieldDelimiter: ';',

//Define Pathname of your choice
  path: 'Data 1 - Singles.csv',

//Create headers in the .csv file
  header: [
    {id: 'name', title: 'Name'},
    {id: 'total', title: 'Total'},
    {id: 'noun', title: 'Noun'},
    {id: 'verb', title: 'Verb'},
    {id: 'adjec', title: 'Adjec'},
  ]});

const csvWriter2 = createCsvWriter({
  fieldDelimiter: ';',

//Define Pathname of your choice
  path: 'Data 2 - Pairs.csv',

//Create headers in the .csv file
  header: [
    {id: 'name', title: 'Name'},
    {id: 'total', title: 'Total'},
  ]});

// read file from current directory
fs.readFile(InputFile, 'utf8', function (err, wordData) {

  if (err) throw err;

// Function callers
  var wordsArray = splitByWords(wordData);
  var wordsMap = createWordMap(wordsArray);
  var wordsClass = addWordClass(wordsMap);
  var finalWordsArray = sortByCount(wordsClass);

// creates word pairs
  var wordPairsArray = [];
  for (let i = 1; i < wordsArray.length; i++) {
	  wordPairsArray.push(wordsArray[i - 1] + ' ' + wordsArray[i]);}
  var wordPairMap = createWordMap(wordPairsArray);
  var wordPairCount = sortByCount(wordPairMap);

//Write CSV Output File
  csvWriter1
  .writeRecords(finalWordsArray)
  .then(()=> console.log('DONE 1'));

  csvWriter2
  .writeRecords(wordPairCount)
  .then(()=> console.log('DONE 2'));
});

// removes anything that is not the standard 26 letters
function splitByWords (text) {
  console.log('Splitting Words');
  // Replaces all contractions with native words
  contractions = contractions.expand(text);
  // Removes all numbers
  var initial  = contractions.replace(/[0123456789]/g, '');
  // Removes all special characters
  var noPunctuation = initial.replace(/[\.,-\/#!$%\^&\*;:{}'=`\-’_~"()@\+\?><\[\]\+]/g, '');
  // Removes all white spaces
  var noExtraSpaces = noPunctuation.replace(/\s{2,}/g, ' ');
  // Converts all letters to upper case
  var allUpperCase  = noExtraSpaces.toUpperCase();
  // Splits the words
  var wordsSplit    = allUpperCase.split(/\s+/);
  return wordsSplit;
}

// count the number of appearances for each word
function createWordMap(wordsArray) {
  console.log('Counting Up Words');
  var wordCount = {};
  wordsArray.forEach(function(i) {
    if (wordCount.hasOwnProperty(i)) {
      wordCount[i]++;
    } else {
      wordCount[i] = 1;
    }});
  return wordCount;
}

// add wordclasses to the keys (Not implemented - bypass is in place)
function addWordClass (wordsMap) {
  console.log('Assigning Word Classes');
/* OUTPUT OF CONSOLE.LOG(wordsMap) AT THIS POSITION
  OPERATING: 1,
  SOLELY: 3,
  ACCORDING: 5,
  ECONOMIC: 1,
  RULES: 6,
  SHARKS: 15,
  ETC....
*/

/* ORIGINAL CODE TO BE IMPLEMENTED (Word class tester)
wordpos.isNoun(testword).then(function(value){
if (value === true) {
	console.log ('Noun')
} else {
	console.log ('Not Noun')
}})

wordpos.isVerb(test).then(function(value){
if (value === true) {
	console.log ('Verb')
} else {
	console.log ('Not Verb')
}})

wordpos.isAdjective(test).then(function(value){
if (value === true) {
	console.log ('Adjective')
} else {
	console.log ('Not Adjective')
}})
*/

/* ORIGINAL CODE TO BE IMPLEMENTED (Lemmatizer (NOUNS should have priority))
lemmatize.noun( 'knives' );
lemmatize.verb( 'pushes' );
lemmatize.adjective( 'farthest' );
*/

/* EXAMPLE CODE (NOT WORKING)
var wordTest
wordsmap.forEach(wordpos.isNoun(key).then(function(result){
if (result === true) {
	this.wordTest[key].push('Noun')
	lemmatize.noun(key);
} else {
	this.wordTest.push[key]('Not Noun')
	// then test for verbs & adjectives in the same way
}
return wordTest;
})
*/

/* Finished map should look like this:
  OPERATING: 1, not Noun, not Verb, not adjective, not adverb
  SOLE: 3, not Noun, not Verb, not adjective, adverb
  ACCORDING: 5, not Noun, not Verb, adjective, not adverb
  ECONOMIC: 1, not Noun, not Verb, adjective, not adverb
  RULE: 6, not Noun, not Verb, not adjective, not adverb
  SHARK: 15, Noun, Verb, not adjective, not adverb
  ETC....
*/

return wordsMap;
}

// create the map that will go into the .cvs file
function sortByCount(wordsClass) {
  console.log('Building Map');
  var wordSorted = [];
  wordSorted = Object.keys(wordsClass).map(function(iii) {
    return {
      name: iii,
      total: wordsClass[iii]};
});

// sort by count in descending order
  wordSorted.sort(function(a, b) {
    return b.total - a.total;
  });
  return wordSorted;
}

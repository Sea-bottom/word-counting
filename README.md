# WordCounting

Tallying up words, breaking them into base form and assign a word class to them

NodeJS Application

* INPUT.txt is just a text file with thousands of words in it - could even be a sample sentence for testing purposes.
* The program starts by culling all unnecessary information from the INPUT.txt file - Line 73
* Then counts the appearance of every word in that text file - Line 91
* The purpose of the function at line 105 whith all of it commented out, is to take the tallied up words and ADD a description to the VALUE (being the number, not the word) of whether the word is a noun, verb or adjective. I know that a map can hold multiple values under the same key with the .push method, but everything I tried hasn't worked.
* After that, the word which is the KEY needs to be lemmatized, meaning bring the word back to its base form (running -> run). Nothing special to write here as the code is super easy to work with.
* The code then sorts all the keys by the amount that they appear in with biggest at the top - Line 173
* This map is then exported as a .csv file to be used in Excel Spreadsheet - Line 63


Steps to program for the function at line 105:

1. Check if current key is a noun (skies: 5,)
2. If yes, push "Noun" to the map value (skies: 5, Noun,)
3. Return the word to its base form - lemmatize.noun(key) (sky: 5, Noun,)
4. If it's not a noun, test for verb and adjective in the same way with same end result (sky: 5, Noun, Not Adverb, Not Adjective)
5. Loop for every word (key) in the current map, and apply correct word class (Noun/Verb/Adjective)

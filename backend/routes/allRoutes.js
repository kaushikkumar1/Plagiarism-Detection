const express = require('express');
const app = express.Router();
const ScrapMossLib = require('../lib/scrapMoss');
const ReadSubmissionLib =require('../lib/readSubmission');
const ResultLib  = require('../lib/result');
var json2xls = require('json2xls');

app.post('/scrap/data', ScrapMossLib.ScrapContestPlagiarismData);
app.get('/submission/data',ReadSubmissionLib.readSubmissionData);
app.post('/generate/file',ReadSubmissionLib.generateFileForSubmission);

app.get('/unique/contest',ReadSubmissionLib.uniqueContests);


app.post('/plagiarism/result',ResultLib.contestResult);
app.post('/plagiarism/result/csv',ResultLib.contestResultCSV);

module.exports = app;
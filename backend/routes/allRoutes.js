const express = require('express');
const app = express.Router();
const ScrapMossLib = require('../lib/scrapMoss');
const ReadSubmissionLib =require('../lib/readSubmission');
const ResultLib  = require('../lib/result');
var json2xls = require('json2xls');
var verify =require('../verifytoken');

app.post('/scrap/data',verify, ScrapMossLib.ScrapContestPlagiarismData);
app.get('/submission/data',verify,ReadSubmissionLib.readSubmissionData);
app.post('/generate/file',verify,ReadSubmissionLib.generateFileForSubmission);

app.get('/unique/contest',verify,ReadSubmissionLib.uniqueContests);
app.get('/submission/code/:id',ResultLib.submissionCode); //non admin

app.post('/plagiarism/result',ResultLib.contestResult);//non admin
app.post('/plagiarism/result/csv',ResultLib.contestResultCSV);//non admin

module.exports = app;
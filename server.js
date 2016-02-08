var express = require('express')
var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json())

var mongojs = require('mongojs')
var db = mongojs('tasklist', ['tasklist'])

app.use(express.static(__dirname + '/public'))

app.get('/tasklist', function(req, res){
	console.log('received a GET request')
	db.tasklist.find(function(err, docs){
		console.log(docs)
		res.json(docs)
	})
})

app.get('/tasklist/:id', function(req, res){
	var id = req.params.id
	console.log(id)
	db.tasklist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc)
	})
})

app.post('/tasklist', function(req, res){
	console.log(req.body)
	db.tasklist.insert(req.body, function(err, doc){
		res.json(doc)
	})
})

app.put('/tasklist/:id', function(req, res){
	var id = req.params.id
	console.log(req.body.task)
	db.tasklist.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {task: req.body.task, priority: req.body.priority, deadline: req.body.deadline}},
		new: true}, function(err, doc){
		res.json(doc)		
	})
})

app.delete('/tasklist/:id', function(req, res){
	var id = req.params.id
	console.log(id)
	db.tasklist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc)
	})
})

var port = process.env.PORT||3000
app.listen(port)
console.log('listening on port '+ port)
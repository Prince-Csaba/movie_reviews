//404 error
module.exports = function (req, res, next) {
	res.status(404).json("No such page can be found")
	next();
};
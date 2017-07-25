import app from '+/app';

console.log('/bin/www');

(async() => {
	app.server.listen(process.env.PORT || 3000, () => {
		console.log(`Express server started on port ${app.server.address().port}`);
	});
})();

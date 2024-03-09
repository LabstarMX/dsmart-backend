

const handleEntries = (req, res, db ) => {
	const { id } = req.body;
	db('users').where( 'id', '=', id)
	.increment('logins', 1)
	.returning('logins')
	.then(logins => {
		res.json(logins[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleEntries: handleEntries
};
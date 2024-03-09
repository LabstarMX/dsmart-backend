
const handleOrder = (req, res, db) => {
	const { type, size, color, quantity, email, phone, description } = req.body;
    if (!type || !size || !color || !quantity || !email || !phone ) {
       return res.status(400).json("something is missing. Fill form properly please.")
    }
    db("orders")
    .returning('*')
    .insert({
        type: type,
        size: size,
        color: color,
        quantity: quantity,
        email: email,
        phone: phone,
        description: description,
        // date: new Date()
    })
    .returning('*')
    .then(order => {
        res.json(order[0])
    })
    
    .catch(err => res.status(400).json('sorry, an error occured'))
}

module.exports = {
    handleOrder: handleOrder
};
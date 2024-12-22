app.post('/checkout', async (req, res) => {
    const { cart, totalPrice } = req.body;

    try {
        console.log('Order placed:', { cart, totalPrice });
        res.json({ success: true, message: 'Order placed successfully' });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
// Define Deadline Schema
const deadlineSchema = new mongoose.Schema({
    studentUSN: { type: String, required: true },
    subject: { type: String, required: true },
    deadline: { type: Date, required: true },
});

const Deadline = mongoose.model('Deadline', deadlineSchema);

// API to add deadline
app.post('/add-deadline', async (req, res) => {
    const { studentUSN, subject, deadline } = req.body;

    try {
        const newDeadline = new Deadline({ studentUSN, subject, deadline });
        await newDeadline.save();
        res.json({ success: true, message: 'Deadline added successfully' });
    } catch (error) {
        console.error('Error adding deadline:', error);
        res.status(500).json({ success: false, message: 'Error adding deadline' });
    }
});

// API to fetch deadlines for a student
app.get('/deadlines/:usn', async (req, res) => {
    try {
        const deadlines = await Deadline.find({ studentUSN: req.params.usn });
        res.json({ success: true, deadlines });
    } catch (error) {
        console.error('Error fetching deadlines:', error);
        res.status(500).json({ success: false, message: 'Error fetching deadlines' });
    }
});

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

document.getElementById('add-deadline-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const subject = document.getElementById('subject').value;
    const deadline = document.getElementById('deadline').value;

    try {
        const response = await fetch('http://localhost:5000/add-deadline', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentUSN: 'student123', subject, deadline })
        });
        const data = await response.json();
        if (data.success) {
            alert('Deadline added successfully');
            loadDeadlines();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

async function loadDeadlines() {
    try {
        const response = await fetch('http://localhost:5000/deadlines/student123');
        const data = await response.json();
        if (data.success) {
            const deadlinesList = document.getElementById('deadlines');
            deadlinesList.innerHTML = '';
            data.deadlines.forEach((deadline) => {
                const li = document.createElement('li');
                li.textContent = `${deadline.subject} - ${new Date(deadline.deadline).toLocaleDateString()}`;
                deadlinesList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Error fetching deadlines:', error);
    }
}

loadDeadlines();

const cart = [];
let totalPrice = 0;

document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', (e) => {
        const item = e.target.closest('li');
        const itemName = item.getAttribute('data-item');
        const itemPrice = parseInt(item.getAttribute('data-price'), 10);

        cart.push({ name: itemName, price: itemPrice });
        totalPrice += itemPrice;

        updateCart();
    });
});

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price}`;
        cartItems.appendChild(li);
    });
    document.getElementById('total-price').textContent = totalPrice;
}

document.getElementById('checkout').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:5000/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart, totalPrice })
        });
        const data = await response.json();
        if (data.success) {
            alert('Order placed successfully!');
            cart.length = 0; // Clear the cart
            totalPrice = 0;
            updateCart();
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

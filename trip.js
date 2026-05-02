const params = new URLSearchParams(window.location.search);
const tripId = params.get('id');
const savedAmountDisplay = document.getElementById('saved-amount');
const goalAmountDisplay = document.getElementById('goal-amount');
const progressBar = document.getElementById('progress-bar');
const depositForm = document.getElementById('savings-form');

const API_URL = 'https://travel-planner-api-ao35.onrender.com';
let tripGoal = 0;

const fetchTripDetails = async () => {
    if (!tripId) {
        document.getElementById('trip-details-container').innerHTML = "<h2>Error: No Trip ID provided.</h2>";
        return;
    }

    try {
        const res = await fetch(`${API_URL}/trips/${tripId}`);
        if (!res.ok) throw new Error("Trip not found");
        
        const trip = await res.json();
        
        document.getElementById('detail-destination').innerText = trip.destination;
        const startDate = new Date(trip.start_date).toLocaleDateString('en-GB');
        const endDate = new Date(trip.end_date).toLocaleDateString('en-GB');
        document.getElementById('detail-date').innerText = `${startDate} - ${endDate}`;
        
        tripGoal = parseFloat(trip.budget);
        goalAmountDisplay.innerText = tripGoal.toLocaleString();
        
        updateProgress();
    } catch (err) {
        document.getElementById('trip-details-container').innerHTML = `<h2>Error</h2><p>${err.message}</p>`;
    }
};

const updateProgress = () => {
    const saved = parseFloat(localStorage.getItem(`savings_${tripId}`)) || 0;
    const percentage = Math.min((saved / tripGoal) * 100, 100);
    
    savedAmountDisplay.innerText = saved.toLocaleString();
    progressBar.style.width = `${percentage}%`;
    
    if (percentage >= 100) {
        progressBar.style.background = "#ffc107";
    }
};

depositForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const deposit = parseFloat(document.getElementById('deposit-amount').value);
    const currentSaved = parseFloat(localStorage.getItem(`savings_${tripId}`)) || 0;
    
    localStorage.setItem(`savings_${tripId}`, currentSaved + deposit);
    depositForm.reset();
    updateProgress();
});

document.getElementById('reset-savings').addEventListener('click', () => {
    if (confirm("Reset all savings for this trip?")) {
        localStorage.removeItem(`savings_${tripId}`);
        updateProgress();
    }
});

fetchTripDetails();
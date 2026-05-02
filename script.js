const tripForm = document.getElementById('trip-form');
const tripsContainer = document.getElementById('trips-container');
const startDateInput = document.getElementById('start_date');
const endDateInput = document.getElementById('end_date');
const totalBudgetDisplay = document.getElementById('total-budget');
const searchBar = document.getElementById('search-bar');
const sortFilter = document.getElementById('sort-filter');
const submitBtn = tripForm.querySelector('button');

let allTripsData = []; 
let editMode = false;
let editId = null;

const API_URL = 'https://travel-planner-api-ao35.onrender.com';

startDateInput.addEventListener('change', () => {
    const selectedDate = startDateInput.value;
    endDateInput.min = selectedDate;
    if (!endDateInput.value || endDateInput.value < selectedDate) {
        endDateInput.value = selectedDate;
    }
});

const getStatusBadge = (startDate, endDate) => {
    const today = new Date('2026-05-02'); 
    const start = new Date(startDate);
    const end = new Date(endDate);

    today.setHours(0,0,0,0);
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);

    if (today < start) {
        return `<span style="background: #007bff; color: white; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold;">UPCOMING</span>`;
    } else if (today > end) {
        return `<span style="background: #6c757d; color: white; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold;">COMPLETED</span>`;
    } else {
        return `<span style="background: #28a745; color: white; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: bold;">ONGOING</span>`;
    }
};

const filterAndSort = () => {
    const searchTerm = searchBar.value.toLowerCase();
    const sortBy = sortFilter.value;

    let filtered = allTripsData.filter(trip => 
        trip.destination.toLowerCase().includes(searchTerm)
    );

    if (sortBy === 'date-asc') {
        filtered.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    } else if (sortBy === 'budget-desc') {
        filtered.sort((a, b) => b.budget - a.budget);
    } else if (sortBy === 'budget-asc') {
        filtered.sort((a, b) => a.budget - b.budget);
    }

    renderTrips(filtered);
};

searchBar.addEventListener('input', filterAndSort);
sortFilter.addEventListener('change', filterAndSort);

const startEdit = (trip) => {
    editMode = true;
    editId = trip.id;
    
    document.getElementById('destination').value = trip.destination;
    document.getElementById('start_date').value = trip.start_date.split('T')[0];
    document.getElementById('end_date').value = trip.end_date.split('T')[0];
    document.getElementById('budget').value = trip.budget;

    submitBtn.innerText = "Update Trip";
    submitBtn.style.backgroundColor = "#ffc107";
    submitBtn.style.color = "black";
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const deleteTrip = async (id) => {
    if (confirm("Are you sure you want to delete this trip?")) {
        try {
            await fetch(`${API_URL}/trips/${id}`, { method: 'DELETE' });
            getTrips();
        } catch (err) {
            alert("Failed to delete trip.");
        }
    }
};

const renderTrips = (trips) => {
    tripsContainer.innerHTML = '';
    let totalBudget = 0;

    trips.forEach(trip => {
        totalBudget += parseFloat(trip.budget || 0);
        const div = document.createElement('div');
        div.className = 'trip-card';
        
        const startDate = new Date(trip.start_date).toLocaleDateString('en-GB');
        const endDate = new Date(trip.end_date).toLocaleDateString('en-GB');
        const statusBadge = getStatusBadge(trip.start_date, trip.end_date);

        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div onclick="window.location.href='trip.html?id=${trip.id}'" style="cursor: pointer; flex-grow: 1;">
                    <div style="margin-bottom: 5px;">${statusBadge}</div>
                    <h3 style="margin: 5px 0;">${trip.destination}</h3>
                    <p style="margin: 2px 0; color: #666;">Date: ${startDate} - ${endDate}</p>
                    <p style="margin: 2px 0; font-weight: bold;">Budget: RM${parseFloat(trip.budget).toLocaleString()}</p>
                </div>
                <div style="display: flex; gap: 5px;">
                    <button onclick='event.stopPropagation(); startEdit(${JSON.stringify(trip)})' style="background-color: #ffc107; color: black; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">Edit</button>
                    <button onclick="event.stopPropagation(); deleteTrip(${trip.id})" style="background-color: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">Delete</button>
                </div>
            </div>
        `;
        tripsContainer.appendChild(div);
    });
    totalBudgetDisplay.innerText = `Total Budget: RM${totalBudget.toLocaleString()}`;
};

const getTrips = async () => {
    try {
        const res = await fetch(`${API_URL}/trips`);
        if (!res.ok) throw new Error("Failed to fetch trips");
        allTripsData = await res.json();
        filterAndSort();
    } catch (err) {
        alert("Could not load trips from server.");
    }
};

tripForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const tripData = {
        destination: document.getElementById('destination').value,
        start_date: document.getElementById('start_date').value,
        end_date: document.getElementById('end_date').value,
        budget: document.getElementById('budget').value
    };

    const url = editMode ? `${API_URL}/trips/${editId}` : `${API_URL}/trips`;
    const method = editMode ? 'PUT' : 'POST';

    try {
        const res = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tripData)
        });

        if (!res.ok) {
             const message = await res.json();
             throw new Error(message || "Submission failed");
        }

        editMode = false;
        editId = null;
        submitBtn.innerText = "Add Trip";
        submitBtn.style.backgroundColor = "#007bff";
        submitBtn.style.color = "white";
        
        tripForm.reset();
        getTrips();
    } catch (err) {
        alert(err.message);
    }
});

getTrips();
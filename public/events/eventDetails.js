function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    let encodedId = params.get("event_id");

    if (encodedId) {
        console.log("Encoded URL ID Parameter:", encodedId); // Log the full encoded ID
        
        // Separate the base64 part from any suffix
        const [base64Id] = encodedId.split("-"); // Split on the first `-` only
        try {
            const originalId = atob(base64Id); // Decode base64 to get the original ID
            console.log("Decoded ID:", originalId); // Log the decoded ID
            return { id: originalId };
        } catch (error) {
            console.error("Error decoding ID:", error);
            return { id: null };
        }
    } else {
        console.error("No ID found in the URL");
        return { id: null };
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Get the eventId from the URL
    const { id: eventId } = getQueryParams();

    // Check if the event_id exists in the URL
    if (!eventId) {
        console.error('Event ID is missing from the URL');
        // Handle the error, maybe redirect back to the events page
        return;
    }

    // Fetch event details using the event_id
    fetch(`/api/ticketingevents/event/${eventId}`)
        .then(response => response.json())
        .then(event => {
            // Convert start_date and end_date to JavaScript Date objects
            const startDate = new Date(event.start_date);
            const endDate = new Date(event.end_date);

            // Function to format date as 'YYYY-MM-DD HH:mm:ss'
            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                
                return `${year}-${month}-${day}`;
            };

            // Update the page with event details
            document.getElementById('titleNominee').textContent = event.event_name;
            document.getElementById('eventImage').src = event.event_image_url || "/assets/img/default-image.jpg";
            document.getElementById('eventDescription').textContent = event.about_event || "Description not available";
            document.getElementById('month').textContent = `${formatDate(startDate)}` || "Description not available";
            document.getElementById('eventStartTime').textContent = `Start: ${formatDate(startDate)} ${event.start_time}` || "Description not available";
            document.getElementById('eventEndTime').textContent = `End: ${formatDate(endDate)} ${event.end_time}` || "Description not available";
            document.getElementById('eventFees').textContent = event.event_type_name;
            document.getElementById('eventCategory').textContent = event.event_category_name || "Category Not Specified";

        })
        .catch(error => {
            console.error('Error fetching event details:', error);
            // Handle the error, maybe display an error message to the user
        });
});

document.getElementById("birthday-form").addEventListener('submit', async (e) => {
  e.preventDefault();

  const fullname = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const dob = document.getElementById('dob').value;

  // Use relative path for API endpoint
  const apiUrl = '/api/users';

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ fullname, email, dob }),
    });

    if (res.ok) {
      try {
        await res.json();

        // Show the popup
        document.getElementById('popup').classList.remove('hidden');

        // Launch confetti 🎉
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
        });

        // Reset form
        document.getElementById("birthday-form").reset();
      } catch (err) {
        console.error('Error parsing response:', err);
        alert("Success, but no response message.");
      }
    } else {
      console.error('Server responded with status:', res.status);
      alert("Failed to add birthday. Please try again.");
    }
  } catch (error) {
    console.error('Fetch error:', error);
    alert("Failed to connect to server. Please try again later.");
  }
});

// Close popup
document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById('popup').classList.add('hidden');
});

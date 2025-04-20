document.getElementById("birthday-form").addEventListener('submit', async (e) => {
  e.preventDefault();

  const fullname = document.getElementById('fullname').value;
  const email = document.getElementById('email').value;
  const dob = document.getElementById('dob').value;

  const res = await fetch('https://birthday-app-sandy.vercel.app/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
      alert("Success, but no response message.");
    }
  } else {
    alert("Failed to add birthday.");
  }
});

// Close popup
document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById('popup').classList.add('hidden');
});

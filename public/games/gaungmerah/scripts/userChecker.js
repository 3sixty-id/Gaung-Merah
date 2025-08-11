function checkLocalUser(name, telephone, dateOfBirth) {
   // Format the date to YYYY-MM-DD
   const today = new Date().toISOString().split("T")[0];

   // Retrieve stored data from localStorage
   const storedData = JSON.parse(localStorage.getItem("players")) || [];

   // Find if the player already exists in the stored data
   const player = storedData.find(
      (p) =>
         p.name === name &&
         p.telephone === telephone &&
         p.dateOfBirth === dateOfBirth
   );

   if (!player) {
      // If player doesn't exist, return true
      return true;
   } else {
      // If player exists, check the last played date
      const lastPlayedDate = player.lastPlayed || ""; // Default to empty string if lastPlayed is missing
      if (lastPlayedDate === today) {
         // If last played is today, return true
         return true;
      } else {
         // If last played is not today, return false
         return false;
      }
   }
}

function saveLocalUser(name, telephone, dateOfBirth) {
   const today = new Date().toISOString().split("T")[0];
   const storedData = JSON.parse(localStorage.getItem("players")) || [];
   const newPlayer = { name, telephone, dateOfBirth, today };
   storedData.push(newPlayer);
   localStorage.setItem("players", JSON.stringify(storedData));
}

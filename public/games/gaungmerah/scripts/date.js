const dates = [
   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
   22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const months = [
   "Januari",
   "Februari",
   "Maret",
   "April",
   "Mei",
   "Juni",
   "Juli",
   "Agustus",
   "September",
   "Oktober",
   "November",
   "Desember",
];

const years = [
   1950, 1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962,
   1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975,
   1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988,
   1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
   2002, 2003,
];

years.reverse();

const dateElementId = "datePicker";
const itemParentElementId = "dateItemList";

const getMonthInNumber = (monthInString) => {
   return months.indexOf(monthInString) + 1;
};

const dateInitiator = {
   showDate: (callback) => {
      const dateElement = document.getElementById(dateElementId);
      const dateList = document.getElementById(itemParentElementId);

      while (dateList.firstChild) {
         dateList.removeChild(dateList.firstChild);
      }

      dates.forEach((date) => {
         const li = document.createElement("li");
         li.textContent = date;
         li.addEventListener("click", () => {
            callback(date);
         });
         dateList.appendChild(li);
      });
      dateElement.style.display = "flex";
   },

   showMonth: (callback) => {
      const dateElement = document.getElementById(dateElementId);
      const monthList = document.getElementById(itemParentElementId);

      while (monthList.firstChild) {
         monthList.removeChild(monthList.firstChild);
      }

      months.forEach((month) => {
         const li = document.createElement("li");
         li.textContent = month;
         li.addEventListener("click", () => {
            callback(month);
         });
         monthList.appendChild(li);
      });
      dateElement.style.display = "flex";
   },
   showYear: (callback) => {
      const dateElement = document.getElementById(dateElementId);
      const yearList = document.getElementById(itemParentElementId);

      while (yearList.firstChild) {
         yearList.removeChild(yearList.firstChild);
      }

      years.forEach((year) => {
         const li = document.createElement("li");
         li.textContent = year;
         li.addEventListener("click", () => {
            callback(year);
         });
         yearList.appendChild(li);
      });
      dateElement.style.display = "flex";
   },

   close: () => {
      const dateElement = document.getElementById(dateElementId);
      dateElement.style.display = "none";
   },
};

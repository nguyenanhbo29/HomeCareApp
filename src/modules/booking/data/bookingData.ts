const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function generateBookingDates(daysCount = 14) {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < daysCount; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);

    const dayName = DAYS[d.getDay()];
    const dateNum = String(d.getDate()).padStart(2, "0");
    const monthNum = String(d.getMonth() + 1).padStart(2, "0");
    const yearNum = d.getFullYear();

    const formattedDate = `${yearNum}-${monthNum}-${dateNum}`;

    dates.push({
      id: formattedDate,
      day: dayName,
      date: dateNum,
    });
  }

  return dates;
}

export const bookingDates = generateBookingDates(14);


export function generateBookingTimes(selectedDateStr?: string) {
  const allTimes = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  let availableTimes = allTimes;

  // Nếu chọn ngày hôm nay, lọc bỏ các khung giờ đã qua trong ngày
  if (selectedDateStr === todayStr) {
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    availableTimes = allTimes.filter((t) => {
      const [h, m] = t.split(":").map(Number);
      if (h > currentHour) return true;
      if (h === currentHour && m > currentMinute) return true;
      return false;
    });

    if (availableTimes.length === 0) {
      availableTimes = allTimes;
    }
  }

  return availableTimes.map((time, index) => ({
    id: String(index + 1),
    time,
  }));
}

export const bookingTimes = generateBookingTimes();
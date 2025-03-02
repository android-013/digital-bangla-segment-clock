 //1. Define patterns for each Bangla digit (0-9).

const banglaDigitPatterns = {
    '০': [1,2,3,4,5,6,10,11,15,16,20,21,22,23,24,25],
    '১': [1,2,3,4,5,10,11,12,13,15,16,18,20,21,22,23,24,25],
    '২': [1,2,3,4,5,10,11,12,13,14,15,16,21,22,23,24,25],
    '৩': [1,3,4,5,6,8,10,11,13,14,15,16,20,21,22,23,24,25],
    '৪': [1,2,3,4,5,6,10,11,12,13,14,15,16,20,21,22,23,24,25],
    '৫': [1,2,3,6,8,11,13,14,15,16,20,21,22,23,24,25],
    '৬': [1,3,6,8,11,13,14,15,16,20,21,22,23,24,25],
    '৭': [1,2,3,4,5,6,10,11,12,13,14,15,20,25],
    '৮': [1,6,11,12,13,14,15,16,18,21,22,23],
    '৯': [1,2,3,4,5,10,11,12,13,14,15,16,20,21,22,23,25],
  };

  // 2. Convert a number to a zero-padded string of Bangla digits.
  function toBanglaNumber(num, length) {
    const banglaDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    // Convert to decimal string, zero-pad it.
    let str = num.toString().padStart(length, '0');
    // Replace each digit with Bangla equivalent.
    return [...str].map(d => banglaDigits[parseInt(d)]).join('');
  }

  // 3. Activate the cells corresponding to a particular Bangla digit.
  function setDigit(digitId, banglaChar) {
    const digitElement = document.getElementById(digitId);
    if (!digitElement) return;
    // Remove 'active' from all cells first.
    const cells = digitElement.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('active'));

    // Get the pattern (array of lit cell indices) for this Bangla digit.
    const pattern = banglaDigitPatterns[banglaChar] || [];
    // Activate those cells.
    pattern.forEach(index => {
      const targetCell = digitElement.querySelector(`.cell[data-index="${index}"]`);
      if (targetCell) {
        targetCell.classList.add('active');
      }
    });
  }

  // 4. Update clock every frame (or at some interval).
  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let milliseconds = now.getMilliseconds();

    // Convert to Bangla, zero-padded
    const bhours = toBanglaNumber(hours, 2);         // ০৯, ১০, ২৩, etc.
    const bminutes = toBanglaNumber(minutes, 2);     // ০০ to ৫৯
    const bseconds = toBanglaNumber(seconds, 2);     // ০০ to ৫৯
    const bmilliseconds = toBanglaNumber(milliseconds, 2); // ০০ to ৯৯

    // Set each digit
    setDigit('hour-tens',   bhours[0]);
    setDigit('hour-ones',   bhours[1]);
    setDigit('minute-tens', bminutes[0]);
    setDigit('minute-ones', bminutes[1]);
    setDigit('second-tens', bseconds[0]);
    setDigit('second-ones', bseconds[1]);
    setDigit('ms-hundreds', bmilliseconds[0]);
    setDigit('ms-tens',     bmilliseconds[1]);
  }

  // Run updateClock() periodically (e.g., every 50 ms)
  setInterval(updateClock, 50);
  updateClock(); // Initial call to set correct time immediately
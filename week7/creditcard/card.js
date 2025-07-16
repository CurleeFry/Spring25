/* card.js
   Simple front‑end validation + UI feedback for credit‑card demo form
--------------------------------------------------------------------- */

//
// 1. “Service” stub ─ accepts exactly one hard‑coded number
//
function isCardNumberValid(num) {
  // Accept only 1234 1234 1234 1234 for the demo
  return num === '1234123412341234';
}

//
// 2. DOM helpers
//
function show(el)   { el.classList.remove('hidden'); }
function hide(el)   { el.classList.add   ('hidden'); }
function setHtml(el, html) { el.innerHTML = html; }

//
// 3. Validation + submission
//
function handleSubmit() {
  const errors   = [];
  const cardNum  = document.getElementById('card-number').value.replace(/\s+/g, '');
  const cardHold = document.getElementById('card-holder').value.trim();
  const month    = document.getElementById('card-month').value.trim();
  const year     = document.getElementById('card-year').value.trim();
  const cvc      = document.getElementById('card-cvc').value.trim();

  // ── Card number ────────────────────────────────────────────────
  if (!/^\d{16}$/.test(cardNum)) {
    errors.push('Card number must be 16 digits');
  } else if (!isCardNumberValid(cardNum)) {
    errors.push('Card number is not a valid card');
  }

  // ── Holder name ────────────────────────────────────────────────
  if (cardHold.length < 2) {
    errors.push('Card‑holder name is required');
  }

  // ── Expiration month / year ────────────────────────────────────
  if (!/^\d{2}$/.test(month) || +month < 1 || +month > 12) {
    errors.push('Expiration month must be 01‑12');
  }
  if (!/^\d{2}$/.test(year)) {
    errors.push('Expiration year must be 2 digits');
  }

  // ── CVC ────────────────────────────────────────────────────────
  if (!/^\d{3,4}$/.test(cvc)) {
    errors.push('CVC must be 3‑4 digits');
  }

  // ── Show result ───────────────────────────────────────────────
  const errorBox   = document.getElementById('form-errors');
  const successBox = document.getElementById('card-success');
  const errorText  = document.getElementById('card-error');

  if (errors.length) {
    setHtml(errorText, errors.join('<br>'));
    show(errorBox);
    hide(successBox);
  } else {
    hide(errorBox);
    show(successBox);
    // …here you’d normally send data to your backend / Stripe…
  }
}

//
// 4. Bind UI once DOM is ready
//
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('card-btn')
          .addEventListener('click', handleSubmit);
});

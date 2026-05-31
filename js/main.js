/* ============================================================
   THE HOLY ORDER OF THE DONUT — Shared rites (main.js)
   Drool-o-Meter · Sprinkle confetti · Donut facts · Nav
   No dependencies. No build. Just devotion.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Drool-o-Meter ----------
     A sacred ledger of collective drool (mL), kept in localStorage. */
  var DROOL_KEY = "hood_drool_mL";

  function getDrool() {
    var v = parseInt(localStorage.getItem(DROOL_KEY) || "0", 10);
    if (isNaN(v) || v < 0) v = 0;
    return v;
  }
  function setDrool(v) {
    try { localStorage.setItem(DROOL_KEY, String(v)); } catch (e) {}
  }
  function fmt(n) { return n.toLocaleString("en-US"); }

  function renderDrool() {
    var els = document.querySelectorAll("[data-drool-count]");
    var v = getDrool();
    for (var i = 0; i < els.length; i++) els[i].textContent = fmt(v);
  }

  // Expose so other pages (Hall of Glaze) can read the rank.
  window.HOOD = window.HOOD || {};
  window.HOOD.getDrool = getDrool;

  function addDrool(amount) {
    setDrool(getDrool() + amount);
    renderDrool();
  }

  /* ---------- Sprinkle confetti ----------
     A burst of festive dough-confetti at a point. Hand-rolled. */
  var SPRINKLE_COLORS = ["#ff5d5d", "#ffd23f", "#2ec4b6", "#9b5de5", "#4cc9f0", "#ff6fb5", "#ffffff"];
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function burst(x, y, count) {
    if (reduceMotion) return;
    count = count || 18;
    for (var i = 0; i < count; i++) {
      var s = document.createElement("span");
      s.className = "sprinkle";
      var color = SPRINKLE_COLORS[i % SPRINKLE_COLORS.length];
      s.style.background = color;
      s.style.left = x + "px";
      s.style.top = y + "px";
      // Deterministic-ish spread using index + a little spice.
      var angle = (Math.PI * 2 * i) / count + (i * 0.37);
      var velocity = 60 + (i % 5) * 26;
      var dx = Math.cos(angle) * velocity;
      var dy = Math.sin(angle) * velocity - 40; // bias upward
      var rot = (i % 2 ? 1 : -1) * (180 + i * 24);
      document.body.appendChild(s);
      // animate via WAAPI
      var anim = s.animate(
        [
          { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
          { transform: "translate(" + dx + "px," + (dy + 160) + "px) rotate(" + rot + "deg)", opacity: 0 }
        ],
        { duration: 900 + (i % 6) * 90, easing: "cubic-bezier(.2,.7,.3,1)", fill: "forwards" }
      );
      (function (node) {
        anim.onfinish = function () { if (node.parentNode) node.parentNode.removeChild(node); };
      })(s);
    }
  }
  window.HOOD.burst = burst;

  /* ---------- Donut facts ---------- */
  var FACTS = [
    "Donuts contain a hole so that your hopes and dreams have somewhere to live.",
    "The plural of donut is “yes.”",
    "A baker's dozen is 13. A glutton's dozen is “all of them.”",
    "Studies confirm that 100% of donuts left near the author of this site mysteriously vanish.",
    "The donut hole was invented so you could feel productive while eating two donuts.",
    "Dunking is not a habit. It is a baptism.",
    "Maple bacon donuts exist because somebody dared to dream too greasily.",
    "Sprinkles are tiny edible confetti celebrating the fact that you are about to eat a donut.",
    "On a molecular level, a donut is 90% destiny.",
    "The fastest unit of time known to science is the interval between buying a dozen and having eleven.",
    "Jelly donuts are just fruit pies that went to clown college.",
    "Glaze is the duct tape of the pastry world: it fixes everything.",
    "Ancient philosophers believed the universe was toroidal. They were hungry and they were right.",
    "A donut a day keeps the sadness circling at a respectful distance.",
    "Old Fashioned donuts are not old. They are vintage. Show some respect."
  ];

  function pickFact() {
    var el = document.querySelector("[data-fact]");
    if (!el) return;
    // Rotate by a stored counter so refreshes feel fresh without Math.random reliance.
    var key = "hood_fact_idx";
    var idx = parseInt(localStorage.getItem(key) || "-1", 10);
    idx = (idx + 1) % FACTS.length;
    try { localStorage.setItem(key, String(idx)); } catch (e) {}
    el.textContent = FACTS[idx];
  }

  /* ---------- Active nav highlighting ---------- */
  function markActiveNav() {
    var path = location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll(".nav-links a");
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href");
      if (href === path) links[i].classList.add("active");
    }
  }

  /* ---------- Wire up clicks ----------
     Every CTA click bumps the drool ledger and sprays sprinkles. */
  function onClick(e) {
    var trigger = e.target.closest && e.target.closest("[data-drool]");
    if (trigger) {
      var amt = parseInt(trigger.getAttribute("data-drool") || "5", 10);
      addDrool(isNaN(amt) ? 5 : amt);
      burst(e.clientX, e.clientY, 16);
    }
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderDrool();
    pickFact();
    markActiveNav();
    document.addEventListener("click", onClick);
  });
})();

/* ============================================================
   THE HOLY ORDER OF THE DONUT — The Sacred Quiz (quiz.js)
   "Which Donut Are You?" — fully client-side, deep-linkable.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Archetypes ---------- */
  var ARCHETYPES = {
    glazed: {
      name: "The Glazed Classic",
      latin: "Toroidus simplexus",
      spirit: "🍩",
      reading: "You are the original. The default. The donut all other donuts are quietly measured against. You don't need sprinkles to feel valid, and frankly the sprinkle-donuts find that intimidating. Calm, dependable, and devastatingly good at 6am — you are the friend everyone takes for granted and could not survive without.",
      soulmate: "A hot cup of coffee that has never once let you down",
      color: "#ff6fb5"
    },
    sprinkle: {
      name: "The Chocolate Sprinkle",
      latin: "Confetti chocolatus",
      spirit: "🎉",
      reading: "You are a party that someone deep-fried. Loud, generous, and impossible to ignore, you leave a trail of tiny colorful evidence everywhere you go. People love you immediately and find sprinkles in their car three weeks later. You believe more is more, and you are correct.",
      soulmate: "A birthday that refuses to end",
      color: "#9b5de5"
    },
    boston: {
      name: "The Boston Cream",
      latin: "Surprise custardus",
      spirit: "🎭",
      reading: "Mysterious. Layered. You present a calm chocolate exterior to the world, but inside? A whole secret situation. People think they know you and then they bite in and gasp. You are the donut equivalent of a plot twist nobody saw coming but everybody respects.",
      soulmate: "A good book you can't put down (or stop licking)",
      color: "#5a3825"
    },
    jelly: {
      name: "The Jelly-Filled",
      latin: "Ambush fructus",
      spirit: "💥",
      reading: "Chaotic. Sweet. Slightly dangerous. You go off in unexpected directions and somebody always ends up with filling on their shirt. You are pure id wrapped in dough — joyful, messy, and absolutely worth the laundry bill. People never know which bite will detonate, and that is your entire personality.",
      soulmate: "A clean white shirt that trusts you for some reason",
      color: "#ff5d5d"
    },
    oldfashioned: {
      name: "The Old Fashioned",
      latin: "Vintageus dunkus",
      spirit: "🎩",
      reading: "Refined. Cragged. Built for dunking and unbothered by trends. You have texture, in every sense. You don't chase frosting fads — you've seen them come and go. When the others get soggy and dramatic, you hold your shape with quiet dignity. An absolute unit of stability.",
      soulmate: "A strong black coffee and a porch to think on",
      color: "#e6c281"
    },
    maplebacon: {
      name: "The Maple Bacon",
      latin: "Audacious carnivorus",
      spirit: "🔥",
      reading: "You should not exist, and yet here you are, thriving. You broke every rule, combined things that had no business combining, and somehow became iconic. Sweet, salty, and completely unhinged in the best way. People either worship you or fear you. There is no middle ground, because you ate the middle ground.",
      soulmate: "Anyone brave enough to keep up with you",
      color: "#ffd23f"
    }
  };

  var ORDER = ["glazed", "sprinkle", "boston", "jelly", "oldfashioned", "maplebacon"];

  /* ---------- Questions ----------
     Each option awards points to archetypes. */
  var QUESTIONS = [
    {
      q: "It is 3:00 AM. What are you doing?",
      a: [
        { t: "Sleeping soundly, like a responsible classic.", w: { glazed: 3, oldfashioned: 1 } },
        { t: "At a party I forgot I started.", w: { sprinkle: 3, jelly: 1 } },
        { t: "Awake, plotting something nobody expects.", w: { boston: 3, maplebacon: 1 } },
        { t: "Eating leftover bacon. No notes.", w: { maplebacon: 3, jelly: 1 } }
      ]
    },
    {
      q: "Choose your sworn enemy.",
      a: [
        { t: "Anyone who says 'I'm cutting back on sugar.'", w: { sprinkle: 2, maplebacon: 2 } },
        { t: "The gym. We have history.", w: { jelly: 2, glazed: 1 } },
        { t: "Soggy texture. Mortal foe.", w: { oldfashioned: 3 } },
        { t: "Predictability. Yawn.", w: { boston: 3 } }
      ]
    },
    {
      q: "Pick a hole.",
      a: [
        { t: "A classic, honest, centered hole.", w: { glazed: 3 } },
        { t: "No hole. There's a surprise in there.", w: { boston: 2, jelly: 2 } },
        { t: "Hole? I contain multitudes.", w: { sprinkle: 2, maplebacon: 1 } },
        { t: "A rugged, characterful, slightly off-center hole.", w: { oldfashioned: 3 } }
      ]
    },
    {
      q: "Your friends would describe you as…",
      a: [
        { t: "Reliable. The glue. Slightly underappreciated.", w: { glazed: 3 } },
        { t: "A lot, in the best possible way.", w: { sprinkle: 3 } },
        { t: "Deep. There's more going on than you'd think.", w: { boston: 3 } },
        { t: "A wildcard who should come with a warning label.", w: { jelly: 2, maplebacon: 2 } }
      ]
    },
    {
      q: "How do you take your coffee?",
      a: [
        { t: "Black, strong, and judgmental.", w: { oldfashioned: 3, glazed: 1 } },
        { t: "With enough sugar to alarm a dentist.", w: { sprinkle: 2, jelly: 1 } },
        { t: "It's a whole elaborate ritual.", w: { boston: 2, maplebacon: 1 } },
        { t: "Coffee? I drink maple syrup, thanks.", w: { maplebacon: 3 } }
      ]
    },
    {
      q: "There is one donut left in the box. What do you do?",
      a: [
        { t: "Offer it to others. (Then resent them quietly.)", w: { glazed: 2, oldfashioned: 1 } },
        { t: "Announce loudly that it's mine. Make it a party.", w: { sprinkle: 3 } },
        { t: "Take it stealthily. No one saw anything.", w: { boston: 3 } },
        { t: "I ate it three paragraphs ago.", w: { jelly: 2, maplebacon: 2 } }
      ]
    },
    {
      q: "Choose a weekend.",
      a: [
        { t: "Cozy, simple, reliable joy.", w: { glazed: 3 } },
        { t: "Festival. Confetti. Chaos. Color.", w: { sprinkle: 3 } },
        { t: "A mysterious solo road trip with a great soundtrack.", w: { boston: 3 } },
        { t: "Something I'll have to explain to a doctor later.", w: { maplebacon: 2, jelly: 2 } }
      ]
    },
    {
      q: "Finally: pick a vibe.",
      a: [
        { t: "Warm bakery, first light, fresh batch.", w: { glazed: 2, oldfashioned: 2 } },
        { t: "Neon, music, and questionable decisions.", w: { sprinkle: 2, jelly: 1 } },
        { t: "Velvet curtains and a secret I'm keeping.", w: { boston: 3 } },
        { t: "A grill, a dare, and zero regrets.", w: { maplebacon: 3 } }
      ]
    }
  ];

  /* ---------- State ---------- */
  var scores = {};
  var current = 0;

  function resetScores() {
    scores = {};
    for (var i = 0; i < ORDER.length; i++) scores[ORDER[i]] = 0;
    current = 0;
  }

  /* ---------- DOM refs ---------- */
  var stage = document.getElementById("quiz-stage");

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function renderProgress() {
    var box = el("div", "progress-box");
    for (var i = 0; i < QUESTIONS.length; i++) {
      var pip = el("span", "pip" + (i < current ? " done" : ""));
      box.appendChild(pip);
    }
    return box;
  }

  /* ---------- Render a question ---------- */
  function renderQuestion() {
    var Q = QUESTIONS[current];
    stage.innerHTML = "";
    stage.appendChild(renderProgress());

    stage.appendChild(el("p", "muted center", "Question " + (current + 1) + " of " + QUESTIONS.length));
    stage.appendChild(el("h2", "question", Q.q));

    var answers = el("div", "answers");
    var letters = ["A", "B", "C", "D", "E", "F"];
    Q.a.forEach(function (opt, i) {
      var btn = el("button", "answer");
      btn.type = "button";
      btn.innerHTML = '<span class="pick">' + letters[i] + ".</span> " + opt.t;
      btn.addEventListener("click", function (e) {
        // award points
        for (var k in opt.w) { if (opt.w.hasOwnProperty(k)) scores[k] += opt.w[k]; }
        if (window.HOOD && window.HOOD.burst) window.HOOD.burst(e.clientX, e.clientY, 12);
        current++;
        if (current >= QUESTIONS.length) showResult(winner());
        else renderQuestion();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      answers.appendChild(btn);
    });
    stage.appendChild(answers);
  }

  /* ---------- Decide the winner ---------- */
  function winner() {
    var best = ORDER[0], bestScore = -1;
    for (var i = 0; i < ORDER.length; i++) {
      var k = ORDER[i];
      if (scores[k] > bestScore) { bestScore = scores[k]; best = k; }
    }
    return best;
  }

  /* ---------- Show a result ---------- */
  function showResult(key) {
    var A = ARCHETYPES[key];
    if (!A) { A = ARCHETYPES.glazed; key = "glazed"; }

    // Update URL for deep-link sharing (without reloading).
    try {
      var url = location.pathname + "?iam=" + key;
      history.replaceState(null, "", url);
    } catch (e) {}

    // Reward the drool ledger for completing the rite.
    try { localStorage.setItem("hood_last_result", key); } catch (e) {}

    stage.innerHTML = "";
    var card = el("div", "result-card");
    card.style.borderColor = A.color;
    card.innerHTML =
      '<div class="crown">You are…</div>' +
      '<h2 style="color:' + A.color + '">' + A.name + "</h2>" +
      '<div class="latin">' + A.latin + "</div>" +
      '<div class="spirit" aria-hidden="true">' + A.spirit + "</div>" +
      '<p class="reading">' + A.reading + "</p>" +
      '<p class="soulmate">🍩 Your donut soulmate: ' + A.soulmate + "</p>";

    var actions = el("div", "result-actions");

    var copyBtn = el("button", "btn", "📋 Copy My Result");
    copyBtn.type = "button";
    copyBtn.addEventListener("click", function (e) {
      copyResult(key);
      if (window.HOOD && window.HOOD.burst) window.HOOD.burst(e.clientX, e.clientY, 20);
    });

    var shareBtn = el("button", "btn choco", "🔗 Copy Share Link");
    shareBtn.type = "button";
    shareBtn.addEventListener("click", function (e) {
      copyLink(key);
      if (window.HOOD && window.HOOD.burst) window.HOOD.burst(e.clientX, e.clientY, 20);
    });

    var againBtn = el("button", "btn ghost", "↻ Take It Again");
    againBtn.type = "button";
    againBtn.addEventListener("click", function () {
      resetScores();
      try { history.replaceState(null, "", location.pathname); } catch (e) {}
      renderQuestion();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    var codexBtn = el("a", "btn ghost", "📚 Find me in the Codex");
    codexBtn.href = "codex.html";

    actions.appendChild(copyBtn);
    actions.appendChild(shareBtn);
    actions.appendChild(againBtn);
    actions.appendChild(codexBtn);
    card.appendChild(actions);
    stage.appendChild(card);

    // celebratory burst from center
    if (window.HOOD && window.HOOD.burst) {
      var r = card.getBoundingClientRect();
      window.HOOD.burst(r.left + r.width / 2, r.top + 80, 30);
    }
  }

  /* ---------- Sharing ---------- */
  function shareText(key) {
    var A = ARCHETYPES[key];
    return "I'm " + A.name + " " + A.spirit + " (" + A.latin + ") according to The Holy Order of the Donut. " +
      "Donut soulmate: " + A.soulmate + ". Which donut are YOU? " + shareUrl(key);
  }
  function shareUrl(key) {
    return location.origin + location.pathname + "?iam=" + key;
  }
  function copyToClipboard(text, okMsg) {
    function ok() { toast(okMsg || "Copied! Now go forth and share."); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(ok, function () { legacyCopy(text); ok(); });
    } else {
      legacyCopy(text); ok();
    }
  }
  function legacyCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }
  function copyResult(key) { copyToClipboard(shareText(key), "Result copied! Paste it everywhere."); }
  function copyLink(key) { copyToClipboard(shareUrl(key), "Share link copied! Spread the glaze."); }

  /* ---------- Toast ---------- */
  var toastTimer = null;
  function toast(msg) {
    var t = document.getElementById("toast");
    if (!t) { t = el("div", "toast"); t.id = "toast"; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }

  /* ---------- Boot: deep-link or fresh quiz ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    if (!stage) return;
    resetScores();
    var params = new URLSearchParams(location.search);
    var iam = params.get("iam");
    if (iam && ARCHETYPES[iam]) {
      showResult(iam);
    } else {
      renderQuestion();
    }
  });
})();

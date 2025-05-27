const keyBuffer = [];
const maxBufferLength = 6;
const secretFlags = {
  soc: false,
  cos: false,
  biz: false,
  pgp: false,
  cde: false,
  cnm: false
};
let mutationCount = 0;
let level1Complete = false;
const shownSecrets = new Set();
const level2Sequence = ["Ω", "Ψ", "Φ", "Δ", "Σ"];
let level2Progress = [];
let level2Active = false;


document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();

  keyBuffer.push(key);
  if (keyBuffer.length > maxBufferLength) keyBuffer.shift();

  const sequence = keyBuffer.join("");

  checkSecrets(sequence, e);

  if (!level1Complete && sequence.includes("soc")) {
    winLevel1();
  }

  if (!level1Complete) {
    mutateElementById("title");
    mutateElementById("desc");
    generateChaosMutation();
  }
});

function universalKeyHandler(e) {
  const key = e.key.toLowerCase();

  keyBuffer.push(key);
  if (keyBuffer.length > 6) keyBuffer.shift();

  const currentSequence = keyBuffer.join("");

  handleEasterEggs(currentSequence, e);

  if (!level1Complete) {
    handleMutation(currentSequence);
  }
}

function checkSecrets(seq, e) {
  const log = document.getElementById("easter-log");

  if ((e.ctrlKey || e.altKey) && e.key === "7") {
    const node = document.getElementById("nodeseven");
    if (node) node.style.display = "block";
  }

  if (seq.includes("cos") && !secretFlags.cos) {
    secretFlags.cos = true;
    logMessage("Almost... but not quite.");
  }
  if (seq.includes("biz") && !secretFlags.biz) {
    secretFlags.biz = true;
    logMessage("Secret: You found the BIZ node.");
  }
  if (seq.includes("pgp") && !secretFlags.pgp) {
    secretFlags.pgp = true;
    logMessage("PGP ping: signal lost.");
  }
  if (seq.includes("cde") && !secretFlags.cde) {
    secretFlags.cde = true;
    logMessage("Engineering division breach acknowledged.");
  }
  if (seq.includes("cnm") && !secretFlags.cnm) {
    secretFlags.cnm = true;
    logMessage("CNM channel activated.");
  }
}
function handleMutation(seq) {
  if (seq === SECRET) {
    winLevel1();
    return;
  }

  mutateElementById("title");
  mutateElementById("desc");
  generateChaosMutation();
}

function logMessage(msg) {
  const log = document.getElementById("easter-log");
  const line = document.createElement("div");
  line.textContent = msg;
  log.appendChild(line);
}

function winLevel1() {
  level1Complete = true;

  document.getElementById("lore").style.display = "block";
  document.getElementById("title").textContent = "LEVEL 1: COMPLETE";
  document.getElementById("desc").textContent = "Entropy acknowledged. Order recovered.";
  
  document.addEventListener("keydown", handleLevelPrompt);
}

function handleLevelPrompt(e) {
  const key = e.key.toLowerCase();
  if (key === "y") {
    document.removeEventListener("keydown", handleLevelPrompt);
    startLevel2();
  } else if (key === "n") {
    document.body.innerHTML = `
      <div style="color:red; font-size:2rem; text-align:center; padding-top:20vh;">
        CONNECTION TERMINATED<br><br>The system has been sealed.
      </div>`;
  }
}

function generateChaosMutation() {
  mutationCount += 1;

  if (mutationCount >= 500) {
    document.body.innerHTML = `
      <div style="color:red; font-size:2rem; text-align:center; padding-top:20vh;">
        SYSTEM OVERLOADED<br>WHY WOULD YOU TYPE SO MUCH?<br><br>Reload to try again.
      </div>`;
    throw new Error("Mutation limit exceeded — simulation terminated.");
  }

  if (mutationCount === 77) {
    console.log("%c[LOG] You are not the first test subject.", "color: cyan;");
  }

  if (mutationCount === 144) {
    console.warn("[SYSTEM] Anomaly detected near top-right sector.");
  }

  if (mutationCount > 100) {
    document.body.style.filter = `hue-rotate(${mutationCount * 2 % 360}deg)`;
  }

  if (mutationCount === 150) {
    document.body.style.backgroundColor = "#300";
  }

  const tag = randomTag();
  const el = document.createElement(tag);

  if (Math.random() < 0.01) {
    el.textContent = rareWhisper();
  } else {
    el.textContent = mutateString("ERROR ERROR");
  }

  el.classList.add("chaotic");
  el.style.position = "absolute";
  el.style.top = Math.random() * window.innerHeight + "px";
  el.style.left = Math.random() * window.innerWidth + "px";
  el.style.fontSize = Math.random() * 2 + 1 + "rem";
  el.style.color = randomColor();
  el.style.zIndex = Math.floor(Math.random() * 1000);
  el.style.pointerEvents = "none";
  el.style.transform = `rotate(${Math.floor(Math.random() * 720)}deg) scale(${Math.random() + 0.5})`;

  if (Math.random() < 0.3) {
    el.classList.add("jitter");

  }
    setTimeout(() => el.remove(), 5000);
  document.body.appendChild(el);
}

function mutateElementById(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = mutateString(el.textContent);
  el.style.transform = `scale(${0.8 + Math.random() * 0.4}) rotate(${Math.random() * 10 - 5}deg)`;
  el.style.color = randomColor();
}

function mutateString(str) {
  const chars = str.split("");
  const count = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * chars.length);
    chars[idx] = String.fromCharCode(97 + Math.floor(Math.random() * 26));
  }
  return chars.join("");
}

function randomTag() {
  const tags = ["div", "span", "section", "code", "em", "strong", "pre"];
  return tags[Math.floor(Math.random() * tags.length)];
}

function randomColor() {
  const hues = ["#0f0", "#f0f", "#ff0", "#0ff", "#f88", "#8ff", "#fff"];
  return hues[Math.floor(Math.random() * hues.length)];
}

function rareWhisper() {
  const whispers = [
    "The seed is not random.",
    "SOC is not a name.",
    "He never reached mutation 198.",
    "CTRL+7 is not just a number.",
    "You are not alone.",
    "Δ∇⌠⌡␣…",
    "PROJECT NODE_7 ONLINE"
  ];
  return whispers[Math.floor(Math.random() * whispers.length)];
}

function startLevel2() {
  level2Active = true;

  document.body.innerHTML = `
    <h1 id="title">LEVEL 2: SIGNAL ALIGNMENT</h1>
    <p id="desc">Click the glyphs in correct sequence to unlock the node.</p >
    <div id="level2-arena"></div>
    <div id="feedback" style="margin-top: 2rem; font-size: 1rem; color: #0f0;"></div>
  `;

  spawnLevel2Glyphs();
}

function spawnLevel2Glyphs() {
  const arena = document.getElementById("level2-arena");
  arena.innerHTML = "";
  arena.style.position = "relative";
  arena.style.width = "100%";
  arena.style.height = "80vh";

  level2Progress = [];

  const allGlyphs = [...level2Sequence, ...getRandomGlyphs(2)];
  const shuffled = shuffleArray(allGlyphs);

  shuffled.forEach((glyph, index) => {
    const btn = document.createElement("div");
    btn.textContent = glyph;
    btn.className = "glyph";
    btn.style.position = "absolute";
    btn.style.top = Math.random() * 70 + "%";
    btn.style.left = Math.random() * 90 + "%";
    btn.style.cursor = "pointer";
    btn.style.fontSize = "2rem";
    btn.style.padding = "0.5rem 1rem";
    btn.style.border = "1px solid #0f0";
    btn.style.borderRadius = "4px";
    btn.style.color = "#0f0";
    btn.style.background = "rgba(0,0,0,0.6)";
    btn.style.textShadow = "0 0 5px #0f0";
    btn.style.zIndex = 5;

    btn.onclick = () => handleGlyphClick(glyph, btn);

    arena.appendChild(btn);
  });
}

function handleGlyphClick(glyph, btn) {
  const current = level2Sequence[level2Progress.length];

  if (glyph === current) {
    level2Progress.push(glyph);
    btn.style.background = "#0f0";
    btn.style.color = "#000";
    btn.style.boxShadow = "0 0 10px #0f0";

    if (level2Progress.length === level2Sequence.length) {
      setTimeout(() => completeLevel2(), 800);
    }
  } else {
    document.getElementById("feedback").textContent = "Incorrect sequence. Resetting...";
    setTimeout(() => {
      spawnLevel2Glyphs();
      document.getElementById("feedback").textContent = "";
    }, 1000);
  }
}

function completeLevel2() {
  document.body.innerHTML = `
    <h1 style="color:#0f0; text-align:center;">LEVEL 2 COMPLETE</h1>
    <p style="text-align:center;">Signal aligned. Node unlocked.</p >
    <pre style="color:#9f9; padding:2rem; font-size:0.9rem;">
    // LOG: Alignment accepted
    // Keyframe restored: ΩΨΦΔΣ
    // Proceed to next node or disconnect
    </pre>
  `;
  setTimeout(() => {
    document.body.innerHTML = `
      <h1 style="color:#0f0; text-align:center;">LEVEL 3: FINALIZATION</h1>
      <p style="text-align:center;">Press any key to start.</p>
    `;
  }, 5000);
  document.addEventListener("keydown", startLevel3, { once: true });
}

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getRandomGlyphs(count) {
  const glyphs = ["λ", "μ", "τ", "π", "χ", "ξ", "γ", "β", "ζ", "θ"];
  return shuffleArray(glyphs).slice(0, count);
}

function startLevel3() {

  document.body.innerHTML = `
    <h1 id="title">LEVEL 3: THE ARCHIVE</h1>
    <p id="desc">A trace remains in the archive.</p >

    <div id="terminal">
      <div id="terminal-log"></div>
      <div id="terminal-input-line">
        <span class="prompt">&gt;</span>
        <input id="terminal-input" type="text" autocomplete="off" autofocus />
      </div>
    </div>
  `;
        document.getElementById("terminal-input").style.flex = "1";
document.getElementById("terminal-input").style.width = "100%";
document.getElementById("terminal-input").style.fontSize = "1rem";
  const input = document.getElementById("terminal-input");
  const log = document.getElementById("terminal-log");

  input.focus();

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const command = input.value.trim().toLowerCase();
      input.value = "";

      const echo = document.createElement("div");
      echo.innerHTML = `<span class="prompt">&gt;</span> ${command}`;
      log.appendChild(echo);

      const response = document.createElement("div");
     if (["sudo rm -rf"].includes(command)) {
  const secret = document.createElement("div");
  secret.innerHTML = `
    <p style="color:#f0f;">Root access granted.</p >
    <p>Welcome, architect. The console bends to your will.</p >
    <p style="font-style: italic;">Flag{destroy_everything_i_guess}</p >
  `;
  log.appendChild(secret);
  return;
}     
      if (["spread", "bizspread", "bizcanteen", "bizwestern"].includes(command)) {
            response.innerHTML = `
    <div style="color:lime; font-weight:bold;">ACCESS GRANTED</div>
    <div style="margin-top:1rem; font-size:1.2rem;">
        <p>Welcome back, Operator.</p >
        <p>The final node has been decrypted.</p >
    </div>
    <div style="margin-top:2rem; color:#fff; text-align:center;">
        <h2 style="color:#0f0; text-shadow: 0 0 10px #0f0;">MISSION COMPLETE</h2>
        <p style="font-style: italic;">History is not what we remember. It’s what we revive.</p >
        <div style="margin-top: 2rem;">
        <pre style="color:#0f0; background:#000; padding:1rem; border:1px solid #0f0;">


░██╗░░░░░░░██╗███████╗██╗░░░░░░█████╗░░█████╗░███╗░░░███╗███████╗
░██║░░██╗░░██║██╔════╝██║░░░░░██╔══██╗██╔══██╗████╗░████║██╔════╝
░╚██╗████╗██╔╝█████╗░░██║░░░░░██║░░╚═╝██║░░██║██╔████╔██║█████╗░░
░░████╔═████║░██╔══╝░░██║░░░░░██║░░██╗██║░░██║██║╚██╔╝██║██╔══╝░░
░░╚██╔╝░╚██╔╝░███████╗███████╗╚█████╔╝╚█████╔╝██║░╚═╝░██║███████╗
░░░╚═╝░░░╚═╝░░╚══════╝╚══════╝░╚════╝░░╚════╝░╚═╝░░░░░╚═╝╚══════╝

|￣￣￣￣￣￣￣￣￣￣￣￣￣￣|
     NODEEEEEEEEEEEEEE
|＿＿＿＿＿＿＿＿＿＿＿＿＿＿|
      \ (•◡•) /
        \    /

      </pre>
    </div>

    <p style="margin-top:2rem; color:#888;">You may now close this window. Or stay and remember.</p >
    <p style="margin-top:1rem; font-size: 0.85rem; color: #666;">Created by <b>Anormalm</b></p >

    <div style="margin-top: 2rem;">
      <button onclick="location.reload()" style="
        background: #0f0;
        color: black;
        border: none;
        padding: 0.6rem 1.2rem;
        font-family: monospace;
        cursor: pointer;
        font-size: 1rem;
        box-shadow: 0 0 10px #0f0;
      ">
        RESTART
      </button>
    </div>
  </div>
`;
     
    
      } else if (command === "ls") {
        response.innerHTML = "archives/ node3.txt secrets/";
      } else if (command === "cd archives" || command === "cd secrets" || command === "ls secrets" || command === "ls archives") {
        response.innerHTML = "<span style='color:red;'>ACCESS DENIED</span>";
      } else if (command === "cat node3.txt") {
        response.innerHTML = `
          Encoded Timestamp:<br>
          <code>00110010001100000011001000110101001100000011010000110011001100010011011100110000</code><br><br>
          Hint: The street remembers the group chat. It's a part of history.
        `;
      } else if (["vim"].includes(command)) {
        response.innerHTML = "Stop using fucking vim, you nerd.";
    } else if (command === "help" || command === "commands" || command === "h" || command === "?" || command === "-h" || command === "--help") {
        response.innerHTML = "Available commands: ls, cd, cat, help (don't try vim)";
      } else {
        response.innerHTML = "command not found: " + command;
      }

      log.appendChild(response);
      log.scrollTop = log.scrollHeight;  
    }
  });
}


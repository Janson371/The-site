let users = [
    "deeja",
    "tim"
];
let passwords = [];

// Passwort-Hashfunktion
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Initialisierung (Passwort-Hashes erzeugen und Event registrieren)
async function init() {
    passwords = [
        "29f733e772d25d1ec60dd03eff545115024ed9f0d54f02a24f53117f07fe5cda",
        "2d907c75aab224850b6b76d15e2fd471248edf715de8f79dc84c2d411f663f88"
    ];

    document.getElementById("sbtn_home").addEventListener("click", async function() {
        let name = document.getElementById("nme_home").value;
        let password = document.getElementById("psw_home").value;

        if (!users.includes(name)) {
            if (password.length < 6) {
                alert("Das Passwort muss mindestens 6 Zeichen lang sein.");
                return;
            }
            quest = confirm("Benutzer '" + name + "' existiert nicht. Möchten Sie ihn anlegen?");
            if (quest) {   
                users.push(name);
                passwords.push(await hashPassword(password));
                alert("Neuer Benutzer '" + name + "' wurde angelegt!");
            }
            return;
        }

        // Passwort prüfen
        let index = users.indexOf(name);
        let hashedInput = await hashPassword(password);
        if (passwords[index] === hashedInput) {
            alert("Willkommen " + name + "!");
            if (name === "deeja") {
                window.location.href = "home.html"; // z.B. "home.html" oder eine andere Datei
            } else if (name === "tim") { // <-- BUG FIX: 'elif' zu 'else if'
                window.location.href = "thoem38094823947328.html"; 
            }
        } else {
            alert("Falsches Passwort!");
        }
    });
}

// Starte Initialisierung
init();

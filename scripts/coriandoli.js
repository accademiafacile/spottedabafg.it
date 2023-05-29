// Funzione per verificare il codice inserito
function checkCode() {
    var codeInput = document.getElementById("codiceInput");
    var code = codeInput.value;

    var submitBtn = document.getElementById("submitBtn");

    var invalidCodeElement = document.getElementById("invalidCode");
    if (invalidCodeElement) {
        invalidCodeElement.parentNode.removeChild(invalidCodeElement);
    }

    var validCode = "PRYL-XLBC-SDOC";

    if (code === "" || code !== validCode) {
        invalidCodeElement = document.createElement("h5");
        invalidCodeElement.textContent = "Codice non valido";
        invalidCodeElement.id = "invalidCode";

        submitBtn.parentNode.insertBefore(invalidCodeElement, submitBtn.nextSibling);

        codeInput.value = "";

        return;
    }

    if (code === validCode) {
        var currentSeconds = new Date().getSeconds();
        if (currentSeconds % 2 === 0) {
            drink();
        } else {
            ingresso();
        }

        // Nascondi il pulsante "Verifica"
        submitBtn.style.display = "none";
        submitBtn.classList.add("disabled");
        localStorage.setItem("buttonDisabled", true);
    }
}

// Funzione per la logica del drink
function drink() {
    var winElement = document.createElement("h5");
    winElement.textContent = "Clicca il pulsante in basso per comunicarmi cosa hai vinto";
    winElement.classList.add("noselect");

    var submitBtn = document.getElementById("submitBtn");
    submitBtn.parentNode.insertBefore(winElement, submitBtn.nextSibling);

    var discoverElement = document.createElement("a");
    discoverElement.href = "https://wa.link/qqy0tx";
    discoverElement.classList.add("btn-1", "noselect");
    discoverElement.textContent = "SCOPRI IL TUO PREMIO";

    submitBtn.parentNode.insertBefore(discoverElement, winElement.nextSibling);
}

// Funzione per la logica dell'ingresso
function ingresso() {
    var winElement = document.createElement("h5");
    winElement.textContent = "Clicca il pulsante in basso per comunicarmi cosa hai vinto";
    winElement.classList.add("noselect");

    var submitBtn = document.getElementById("submitBtn");
    submitBtn.parentNode.insertBefore(winElement, submitBtn.nextSibling);

    var discoverElement = document.createElement("a");
    discoverElement.href = "https://wa.link/tnypw2";
    discoverElement.classList.add("btn-1", "noselect");
    discoverElement.textContent = "SCOPRI IL TUO PREMIO";

    submitBtn.parentNode.insertBefore(discoverElement, winElement.nextSibling);
}

document.addEventListener("DOMContentLoaded", function () {
    var submitBtn = document.getElementById("submitBtn");

    // Verifica se il pulsante è già disabilitato
    var isButtonDisabled = localStorage.getItem("buttonDisabled");
    if (isButtonDisabled) {
        submitBtn.style.display = "none";
        submitBtn.classList.add("disabled");

        var messageElement = document.createElement("h5");
        messageElement.innerHTML = "Hai già inserito il codice,<br>ci vediamo alla festa";
        messageElement.style.textAlign = "center";
        messageElement.classList.add("noselect");

        document.body.appendChild(messageElement);
    }

    submitBtn.addEventListener("click", function () {
        checkCode();
    });
});

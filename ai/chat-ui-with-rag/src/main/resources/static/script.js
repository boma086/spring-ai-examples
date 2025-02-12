const addToTranscript = (who, text) => {
    let b = document.querySelector('#transcript');
    let name = (who === "User") ? username : who;
    b.innerHTML += createTranscriptEntry(who, name, text);
    b.scrollTop = b.scrollHeight;
    console.log(text);
};

const createTranscriptEntry = (who, name, text) => {
    return `
    <div class="${who}Entry">
      <div><img src="/${who}.png" width="18" height="18" style="vertical-align: middle;"/> <span style="vertical-align: middle;"><b>${name}:</b> ${text}</span></div>
     </div>`
};

const handleResponse = (response) => {
    addToTranscript("AI", response.answer);
};

const postQuestion = (question) => {
    let data = {
        question: question
    };

    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(handleResponse);
};

const submitTypedText = (event) => {
    let typedTextInput = document.querySelector('#userInput');
    let typedText = typedTextInput.value;

    // don't submit if empty
    if (typedText.trim().length === 0) {
        return false;
    }
    // submit it here
    addToTranscript("User", typedText);
    postQuestion(typedText);
    typedTextInput.value = '';
    return false;
};

const initUIEvents = () => {
    let t = document.querySelector('#typedTextSubmit');
    t.addEventListener('click', submitTypedText);
    var textarea = document.querySelector('textarea#userInput');
    textarea.addEventListener('keydown', e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submitTypedText(e);
        }
    });
    var modal = document.getElementById("uploadModal");
    var openModalBtn = document.getElementById("uploadFile");
    openModalBtn.addEventListener('click', () => {
        modal.style.display = "block";
    });
    var closeModalSpan = document.getElementsByClassName("closeModalSpan")[0];
    closeModalSpan.addEventListener('click', () => {
        modal.style.display = "none";
    });
    uploadForm.addEventListener('submit', () => {
        var uploadForm = document.getElementById("uploadForm");
        var filename = uploadForm.elements[0].value;
        if (filename && filename.length > 0) {
            var loader = document.getElementById("loader");
            loader.style.visibility = "visible";
        }
    });
    var hiddenUploadFrame = document.getElementById("hiddenUploadFrame");
    hiddenUploadFrame.addEventListener('load', () => {
        var hiddenUploadFrame = document.getElementById("hiddenUploadFrame");
        var json = JSON.parse(hiddenUploadFrame.contentDocument.body.innerText);
        var fileName = json.fileName;
        var loader = document.getElementById("loader");
        loader.style.visibility = "hidden";
        modal.style.display = "none";
        addToTranscript("File", "Uploaded file : " + fileName + " ("+ json.fileSize + " bytes)");
    });
};

window.addEventListener('load', initUIEvents);
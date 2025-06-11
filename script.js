

function handleFile(action) {
  const fileInput = document.getElementById('fileInput');
  const password = document.getElementById('password').value;
  const status = document.getElementById('status');
  const reader = new FileReader();

  if (!fileInput.files.length || !password) {
    status.textContent = 'Please select a file and enter a password.';
    return;
  }

  const file = fileInput.files[0];
  reader.onload = function (e) {
    const content = e.target.result;
    let result;
    if (action === 'encrypt') {
      result = CryptoJS.AES.encrypt(content, password).toString();
    } else {
      try {
        const bytes = CryptoJS.AES.decrypt(content, password);
        result = bytes.toString(CryptoJS.enc.Utf8);
        if (!result) throw new Error("Wrong password or corrupted file.");
      } catch (err) {
        status.textContent = 'Decryption failed.';
        return;
      }
    }

    const blob = new Blob([result], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = (action === 'encrypt' ? 'encrypted.txt' : 'decrypted.txt');
    link.click();
    status.textContent = action.charAt(0).toUpperCase() + action.slice(1) + 'ion complete!';
  };

  reader.readAsText(file);
}

// Load CryptoJS AES
let script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js";
document.head.appendChild(script);

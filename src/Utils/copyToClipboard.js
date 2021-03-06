function fallbackCopyTextToClipboard(text, successCb = null, errorCb = null) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    if (successCb) {
      successCb();
    } else {
      console.log('Fallback: Copying text command was ' + msg);
    }
  } catch (err) {
    if (errorCb) {
      errorCb();
    } else {
      console.error('Fallback: Oops, unable to copy', err);
    }
  }
  document.body.removeChild(textArea);
}

export function copyTextToClipboard(text, successCb = null, errorCb = null) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text, successCb, errorCb);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    if (successCb) {
      successCb();
    } else {
      console.log('Async: Copying to clipboard was successful!');
    }
  }, function(err) {
    if (errorCb) {
      errorCb();
    } else {
      console.error('Async: Could not copy text: ', err);
    }
  });
}

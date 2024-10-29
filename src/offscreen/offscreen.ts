chrome.runtime.onMessage.addListener(handleMessages);

async function handleMessages(message: any) {
  if (message.target !== 'offscreen-doc') {
    return;
  }

  switch (message.type) {
    case 'copy-data-to-clipboard':
      handleClipboardWrite(message.data);
      break;
    default:
      console.warn(`Unexpected message type received: '${message.type}'.`);
  }
}

async function handleClipboardWrite(data: string) {
  try {
    const textEl = document.querySelector('#text') as HTMLTextAreaElement;

    textEl.value = data;
    textEl.select();
    document.execCommand('copy');
  } catch (error) {
    console.error(error);
  }
}

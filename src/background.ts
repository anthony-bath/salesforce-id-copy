import { to15CaseSafeFrom18 } from './convert/to15CaseSafeFrom18';
import { to18CaseSafeFrom18 } from './convert/to18CaseSafeFrom18';
import { to18CaseSafeFrom15CaseSafe } from './convert/to18CaseSafeFrom15CaseSafe';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'sfIdCopy',
    title: 'Salesforce Id Copy',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'sfId18',
    parentId: 'sfIdCopy',
    title: 'Copy 18 Character (Case Safe)',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'sfId15',
    parentId: 'sfIdCopy',
    title: 'Copy 15 Character (Case Safe)',
    contexts: ['selection'],
  });
});

let creating: Promise<void> | null = null;
async function setupOffscreenDocument(path: string) {
  const offscreenUrl = chrome.runtime.getURL(path);

  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
    documentUrls: [offscreenUrl],
  });

  if (existingContexts.length > 0) {
    return;
  }

  if (creating) {
    await creating;
  } else {
    creating = chrome.offscreen.createDocument({
      url: path,
      reasons: [chrome.offscreen.Reason.CLIPBOARD],
      justification: 'To copy the Converted Salesforce Id to the clipboard',
    });

    await creating;
    creating = null;
  }
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (!info.selectionText) return;

  switch (info.menuItemId) {
    case 'sfId18':
      switch (info.selectionText.length) {
        case 18:
          await addToClipboard(to18CaseSafeFrom18(info.selectionText));
          break;
        case 15:
          await addToClipboard(to18CaseSafeFrom15CaseSafe(info.selectionText));
          break;
      }
      break;

    case 'sfId15':
      await addToClipboard(to15CaseSafeFrom18(info.selectionText));
      break;
  }
});

async function addToClipboard(value: string): Promise<void> {
  try {
    await setupOffscreenDocument('offscreen.html');
  } catch (error) {
    console.log(error);
  }

  chrome.runtime.sendMessage({
    type: 'copy-data-to-clipboard',
    target: 'offscreen-doc',
    data: value,
  });
}

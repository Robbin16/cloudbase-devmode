const switchIsOpen = localStorage.getItem("consoleDevMode") === "on";
chrome.storage.sync.get(["switchIsOpen"], function (res) {
  !!res?.switchIsOpen !== switchIsOpen
    ? res?.switchIsOpen
      ? openDevMode()
      : closeDevMode()
    : null;
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request?.switchIsOpen !== undefined) {
    request.switchIsOpen ? openDevMode() : closeDevMode();
    sendResponse({ switchIsOpen: request.switchIsOpen });
  }
  request?.removeBrowsingData && location.reload();
});

function openDevMode() {
  localStorage.setItem("consoleDevMode", "on");
  location.reload();
}

function closeDevMode() {
  localStorage.removeItem("consoleDevMode");
  localStorage.removeItem("consoleDevMode");
  location.reload();
}

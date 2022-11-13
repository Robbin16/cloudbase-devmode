$(function () {
  $switch = $("#switch");
  $button = $("#button");
  chrome.storage.sync.get(["switchIsOpen"], function (res) {
    $($switch.prop("checked", res?.switchIsOpen));
  });
  $switch.change(() =>
    sendMessage({ switchIsOpen: $switch.is(":checked") }, (rsp) => {
      chrome.storage.sync.set({
        switchIsOpen: rsp?.switchIsOpen,
      });
    })
  );
  $button.click(() => {
    let oneHourAgo = new Date().getTime() - 1000 * 60 * 60;
    chrome.browsingData.remove(
      {
        since: oneHourAgo,
        origins: ["https://console.cloud.tencent.com/"],
      },
      {
        cacheStorage: true,
        cookies: true,
        fileSystems: true,
        indexedDB: true,
        localStorage: true,
        serviceWorkers: true,
        webSQL: true,
      }
    );
    sendMessage({ removeBrowsingData: true });
  });
});

function sendMessage(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, (rsp) => {
      callback && callback(rsp);
    });
  });
}

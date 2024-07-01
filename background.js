chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "translate",
        title: "Translate",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "translateToArabic",
        parentId: "translate",
        title: "Select to translation",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        id: "translateToArabicMouseover",
        parentId: "translate",
        title: "hover to translate",
        contexts: ["all"]
    });

    chrome.contextMenus.create({
        id: "stopTranslation",
        parentId: "translate",
        title: "Stop Translation",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "translateToArabic") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: activateSelectionTranslation
        });
    } else if (info.menuItemId === "translateToArabicMouseover") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: activateMouseoverTranslation
        });
    } else if (info.menuItemId === "stopTranslation") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: deactivateTranslation
        });
    }
});

function activateSelectionTranslation() {
    document.removeEventListener('mouseover', handleMouseover);
    document.addEventListener('mouseup', handleMouseup);
}

function activateMouseoverTranslation() {
    document.removeEventListener('mouseup', handleMouseup);
    document.addEventListener('mouseover', handleMouseover);
}

function deactivateTranslation() {
    document.removeEventListener('mouseover', handleMouseover);
    document.removeEventListener('mouseup', handleMouseup);
}

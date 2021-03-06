var copyfixer = (function() {

var self = {};

self.copy = function() {
    if (self.isSelected()) {
        var controller = document.commandDispatcher.getControllerForCommand("cmd_copy");
        if (controller.isCommandEnabled("cmd_copy")) controller.doCommand("cmd_copy");
        return;
    }

    var crlf = (navigator.platform.indexOf("Win") != -1) ? "\r\n" : "\n";
    var doc  = window._content.document;
    var txt  = doc.title + crlf + doc.location.href + crlf + crlf;
    var cpb  = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
    cpb.copyString(txt);
}

self.isSelected = function() {
    var focusedWindow = document.commandDispatcher.focusedWindow;
    var sel = focusedWindow.getSelection();
    if (sel.rangeCount == 0) return false;
    if (sel.rangeCount > 1)  return true;

    var range = sel.getRangeAt(0);
    if (range.startContainer != range.endContainer) return true;
    if (range.startOffset    != range.endOffset)    return true;
    return false;
}

return self;

})();



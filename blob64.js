"use strict";
var Blob64 = (function () {
    function Blob64() {
    }
    Blob64.serialize = function (blob, onFinish) {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            onFinish(reader.result);
        };
    };
    Blob64.deserialize = function (str) {
        var indexOfComma = str.lastIndexOf(",");
        var contentType = str.substr(0, indexOfComma + 1) || "";
        var byteChars = atob(str.substr(indexOfComma + 1));
        var sliceSize = 512;
        var byteArrays = [];
        for (var offset = 0; offset < byteChars.length; offset += sliceSize) {
            var slice = byteChars.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            byteArrays.push(new Uint8Array(byteNumbers));
        }
        return new Blob(byteArrays, { type: contentType });
    };
    return Blob64;
}());
exports.Blob64 = Blob64;

export class Blob64 {
  static serialize(blob: Blob, onFinish: (str: string) => void) {
    // Ref: http://stackoverflow.com/a/18650249/382564
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      onFinish(reader.result);
    }
  }

  static deserialize(str: string): Blob {
    // Ref: http://stackoverflow.com/a/16245768/382564
    let indexOfComma = str.lastIndexOf(",");
    let contentType = str.substr(0, indexOfComma + 1) || "";
    let byteChars = atob(str.substr(indexOfComma + 1));
    let sliceSize = 512;

    let byteArrays = [];
    for (var offset = 0; offset < byteChars.length; offset += sliceSize) {
      let slice = byteChars.slice(offset, offset + sliceSize);
      let byteNumbers = new Array(slice.length);

      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, {type: contentType});
  }
}

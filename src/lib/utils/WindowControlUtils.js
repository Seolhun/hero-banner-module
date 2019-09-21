export class WindowControlUtils {
  // Necessary `babel-preset-stage-0`
  static _diff_value = 16;
  static _mobile_size = 768;
  static is_mobile = false;

  static isMobile(window) {
    let result = false;
    const clientWidth = document.body.clientWidth + this._diff_value;
    if (clientWidth <= this._mobile_size) {
      result = true;
    }
    return result;
  }
}

export default WindowControlUtils;

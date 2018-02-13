class EncodeURIComponentString {
  constructor(data) {
    this.data = data || [];
  }

  fixedEncodeURIComponent = (str) => {
    return encodeURIComponent(str).replace(/[!'()*]/g, (c) => {
      return `%${c.charCodeAt(0).toString(16)}`;
    });
  };

  createFormItem = (x) => `${x[0]}=${this.fixedEncodeURIComponent(x[1])}`;

  toString() {
    return this.data.map(this.createFormItem).join('&');
  }
}

export default EncodeURIComponentString;

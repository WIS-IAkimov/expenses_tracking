export class RequestParams {
  public page: number;
  public page_size: number;
  public amount_from: number;
  public amount_to: number;
  public created_from: string;
  public created_to: string;
  public user: string;
  public role: string;

  constructor(data: any = {}) {
    this.page = data.page || 1;
    this.page_size = data.page_size || 20;
    this.created_from = data.created_from || null;
    this.created_to = data.created_to || null;
    this.user = data.user || void 0;
    this.role = data.role || void 0;
  }

  get requestParams() {
    let params: any = { page: this.page };

    if (this.created_from) {
      const date = new Date(this.created_from);

      params['created_from'] = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    if (this.created_to) {
      const date = new Date(this.created_to);

      params['created_to'] = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
    if (this.amount_from) {
      params['amount_from'] = this.amount_from;
    }
    if (this.amount_to) {
      params['amount_to'] = this.amount_to;
    }
    if (this.user) { params.user = this.user; }
    if (this.role) { params.role = this.role; }
    return params;
  }
}

export class RequestParams {
  public page: number;
  public page_size: number;
  public amount_from: number;
  public amount_to: number;
  public created_from: string;
  public created_to: string;
  public user: string;

  constructor(data: any = {}) {
    this.page = data.page || 1;
    this.page_size = data.page_size || 20;
    this.created_from = data.created_from || null;
    this.created_to = data.created_to || null;
    this.user = data.user || void 0
  }

  get requestParams() {
    let params: any = { page: this.page };

    if (this.created_from) {
      params['created_from'] = new Date(this.created_from);
    }
    if (this.created_to) {
      params['created_to'] = new Date(this.created_to);
    }
    if (this.amount_from) {
      params['amount_from'] = this.amount_from;
    }
    if (this.amount_to) {
      params['amount_to'] = this.amount_to;
    }
    if (this.user) { params.user = this.user; }
    return params;
  }
}

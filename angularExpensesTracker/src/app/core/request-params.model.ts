export class RequestParams {
  public page: number;
  public page_size: number;
  public start_date: string;
  public end_date: string;

  constructor(data: any = {}) {
    this.page = data.page || 1;
    this.page_size = data.page_size || 20;
    this.start_date = data.start_date || null;
    this.end_date = data.end_date || null;
  }

  get requestParams() {
     let params: any = { page: this.page };
     if (this.start_date) {
       params['start_date'] = new Date(this.start_date);
     }
     if (this.end_date) {
       params['end_date'] = new Date(this.end_date);
     }
    return params;
  }
}

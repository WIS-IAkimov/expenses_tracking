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
    return {
      page: this.page,
      start_date: new Date(this.start_date),
      end_date: new Date(this.end_date)
    }
  }
}

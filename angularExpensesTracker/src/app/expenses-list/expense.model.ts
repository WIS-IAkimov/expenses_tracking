export class ExpenseModel {
  public id: number;
  public description: string;
  public created_at: Date;
  public time: Date;
  public amount: number;
  public comment: string;

  constructor(data: any = {}) {
    this.id = data.id || void 0;
    this.description = data.description || void 0;
    this.created_at = new Date(data.created_at) || null;
    this.time = data.time || void 0;
    this.amount = data.amount || void 0;
    this.comment = data.comment || void 0;
  }
}

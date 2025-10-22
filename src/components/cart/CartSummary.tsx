export function CartSummary({ subtotal, discount }:{ subtotal:number; discount:number }){
  const total = Math.max(0, subtotal - discount);
  return (
    <div className="space-y-1">
      <Row label="ยอดรวม" value={subtotal}/>
      <Row label="ส่วนลด" value={-discount}/>
      <hr/>
      <Row label="ชำระ" value={total} strong />
    </div>
  );
}
function Row({label, value, strong=false}:{label:string; value:number; strong?:boolean}){
  return (
    <div className="flex items-center justify-between">
      <span className={strong? "font-medium": "text-neutral-700"}>{label}</span>
      <b className={`tabular-nums ${strong? "text-lg":""}`}>{value<0? "-" : ""}฿{(Math.abs(value)/100).toFixed(2)}</b>
    </div>
  );
}
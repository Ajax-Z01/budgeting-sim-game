import { Card } from "flowbite-react";

type Props = {
  month: number;
  day: number;
  balance: number;
  stamina: number;
  maxMonth: number;
};

export default function StatsPanel({ month, day, balance, stamina, maxMonth }: Props) {
  return (
    <Card className="mb-4">
      <h2 className="text-xl font-bold mb-2">📊 Status Pemain</h2>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Bulan:</span> {month} / {maxMonth}
        </div>
        <div>
          <span className="font-medium">Hari:</span> {day} / 30
        </div>
        <div>
          <span className="font-medium">Saldo:</span> ${balance}
        </div>
        <div>
          <span className="font-medium">Stamina:</span> {stamina} / 100
        </div>
      </div>
    </Card>
  );
}

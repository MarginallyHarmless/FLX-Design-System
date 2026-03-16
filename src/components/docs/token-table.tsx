interface TokenRow {
  name: string;
  value: string;
  preview?: React.ReactNode;
}

interface TokenTableProps {
  tokens: TokenRow[];
}

export function TokenTable({ tokens }: TokenTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="px-4 py-2.5 text-left font-semibold">Token Name</th>
            <th className="px-4 py-2.5 text-left font-semibold">Value</th>
            <th className="px-4 py-2.5 text-left font-semibold">Preview</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((t, i) => (
            <tr
              key={t.name}
              className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}
            >
              <td className="px-4 py-2 font-mono text-xs">{t.name}</td>
              <td className="px-4 py-2 text-muted-foreground">{t.value}</td>
              <td className="px-4 py-2">{t.preview}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

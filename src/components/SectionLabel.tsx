interface Props {
  label: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionLabel({ label, subtitle, align = 'left' }: Props) {
  return (
    <div className={`mb-8 ${align === 'center' ? 'text-center' : ''}`}>
      <p className="text-apple-secondary text-sm font-medium mb-1">
        {label}
      </p>
      {subtitle && (
        <p className="text-apple-secondary text-sm opacity-80">{subtitle}</p>
      )}
    </div>
  );
}

type IconProps = {
  className?: string
}

function base(children: React.ReactNode, className?: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "size-5"}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function GraduationCapIcon({ className }: IconProps) {
  return base(
    <>
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </>,
    className
  )
}

export function SunIcon({ className }: IconProps) {
  return base(
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </>,
    className
  )
}

export function MoonIcon({ className }: IconProps) {
  return base(<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />, className)
}

export function PlusIcon({ className }: IconProps) {
  return base(<path d="M12 5v14M5 12h14" />, className)
}

export function XIcon({ className }: IconProps) {
  return base(<path d="M18 6 6 18M6 6l12 12" />, className)
}

export function TrashIcon({ className }: IconProps) {
  return base(
    <>
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </>,
    className
  )
}

export function PencilIcon({ className }: IconProps) {
  return base(
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />,
    className
  )
}

export function ArrowLeftIcon({ className }: IconProps) {
  return base(<path d="m12 19-7-7 7-7M19 12H5" />, className)
}

export function ArrowRightIcon({ className }: IconProps) {
  return base(<path d="M5 12h14m-6-7 7 7-7 7" />, className)
}

export function ChartBarIcon({ className }: IconProps) {
  return base(
    <>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M7 16v-3" />
      <path d="M12 16V8" />
      <path d="M17 16v-5" />
    </>,
    className
  )
}



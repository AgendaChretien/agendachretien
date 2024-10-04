export interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 78 78"
      className={className}
    >
      <path
        className="fill-primary dark:fill-on-background"
        d="M39 0c21.54 0 39 17.46 39 39S60.54 78 39 78 0 60.54 0 39 17.46 0 39 0Zm-8.058 18H20.497a.5.5 0 0 0-.472.655L27.235 41h-6.74a.498.498 0 0 0-.496.5v10c0 .276.222.5.497.5h10.29l2.472 7.655a.497.497 0 0 0 .472.345h10.447a.5.5 0 0 0 .472-.655l-13.236-41a.497.497 0 0 0-.472-.345Zm20.753 26.69c-.278-.04-.497 0-.656.117-.159.118-.238.294-.238.528 0 1.564-.477 2.826-1.43 3.784-.51.512-1.11.887-1.801 1.125l2.995 9.218a17.254 17.254 0 0 0 3.603-1.251c2.484-1.193 4.41-2.865 5.781-5.015 1.371-2.151 2.057-4.635 2.057-7.45 0-.352-.298-.548-.894-.587ZM45.555 18c-2.974 0-5.626.522-7.955 1.565l3.363 10.35c.21-.378.468-.723.778-1.034.953-.958 2.225-1.437 3.814-1.437 1.59 0 2.861.48 3.815 1.437.953.958 1.43 2.24 1.43 3.842 0 .43.238.646.715.646h.179l9.417-.587c.596-.078.894-.293.894-.645 0-2.816-.686-5.29-2.057-7.42-1.37-2.132-3.297-3.784-5.78-4.957-2.484-1.173-5.355-1.76-8.613-1.76Z"
      />
    </svg>
  );
}

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
      <g fill="none" fillRule="evenodd">
        <path
          className="fill-main-300 dark:fill-main-800"
          d="M24.483.001 53.003 0c8.691 0 11.843.905 15.021 2.605a17.719 17.719 0 0 1 7.371 7.37l.2.382C77.166 13.415 78 16.653 78 24.997v28.005l-.004 1.017c-.07 7.928-.969 10.955-2.6 14.005a17.719 17.719 0 0 1-7.372 7.371l-.381.2C64.585 77.166 61.347 78 53.003 78H24.997l-1.017-.004c-7.928-.07-10.955-.969-14.005-2.6a17.719 17.719 0 0 1-7.371-7.372l-.2-.381C.834 64.585 0 61.347 0 53.003V24.997c0-8.692.905-11.844 2.605-15.022a17.719 17.719 0 0 1 7.37-7.371l.382-.2C13.351.866 16.518.034 24.483 0Z"
        />
        <path
          className="fill-main-600"
          d="M13.8 19.31c.227 0 .455.008.682.022l47.431 3c4.632.293 6.286.855 7.945 1.833a9.789 9.789 0 0 1 3.815 4.064l.15.303c.773 1.622 1.177 3.373 1.177 7.74L74.999 52.4l-.008.934c-.095 6.969-.922 9.703-2.395 12.458a16.356 16.356 0 0 1-6.804 6.804l-.353.185C62.617 74.23 59.628 75 51.925 75h-25.85l-.939-.004c-7.318-.064-10.112-.894-12.928-2.4a16.356 16.356 0 0 1-6.804-6.804l-.185-.353C3.77 62.617 3 59.628 3 51.925V30.111c0-5.965 4.835-10.8 10.8-10.8Z"
        />
        <path
          className="fill-main-800 dark:fill-main-300"
          d="M74.88 48.499c.08.53.12 1.066.12 1.602v1.824l-.004.939c-.064 7.318-.894 10.112-2.4 12.928a16.356 16.356 0 0 1-6.804 6.804l-.353.185C62.617 74.23 59.628 75 51.925 75h-25.85l-.939-.004c-7.318-.064-10.112-.894-12.928-2.4a16.356 16.356 0 0 1-6.804-6.804l-.24-.463c-1.058-2.087-1.744-4.298-2.022-8.46.178-1.848.525-2.911 1.036-3.996a9.755 9.755 0 0 1 3.46-4.017l.277-.18c1.439-.913 3.034-1.508 7.131-2.123l47.552-7.133c5.899-.884 11.398 3.18 12.283 9.079Z"
        />
      </g>
    </svg>
  );
}

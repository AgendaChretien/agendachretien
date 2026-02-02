import { clsx } from "clsx";
import {
  add,
  eachDayOfInterval,
  format,
  isMonday,
  isSameDay,
  isSameMonth,
  previousMonday,
  sub,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";

interface CalendarProps {
  current: Date;
  onChange: (date: Date) => void;
}

interface CalendarMonthProps extends CalendarProps {
  year: number;
  month: number;
}

interface CalendarDayProps {
  date: Date;
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}

function CalendarDay({ date, active, disabled, onClick }: CalendarDayProps) {
  return (
    <button
      className={clsx(
        "flex h-8 w-full items-center justify-center rounded-full transition-colors hover:bg-neutral-2",
        active && !disabled && "bg-primary text-primary-foreground hover:bg-primary",
      )}
      onClick={onClick}
    >
      <span className={clsx(disabled && "opacity-30")}>{date.getDate()}</span>
    </button>
  );
}

function CalendarMonth({ year, month, current, onChange }: CalendarMonthProps) {
  const day1 = new Date(year, month, 1);
  const start = isMonday(day1) ? day1 : previousMonday(day1);
  const end = add(start, { days: 41 });
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="grid w-100 grid-cols-7 gap-0.5">
      {["L", "M", "M", "J", "V", "S", "D"].map((day) => (
        <div key={day} className="mb-4 flex-center text-xs font-bold text-foreground/20">
          {day}
        </div>
      ))}

      {days.map((day) => (
        <div key={day.toISOString()} className="flex-center h-10">
          <CalendarDay
            date={day}
            active={isSameDay(day, current)}
            disabled={!isSameMonth(day, day1)}
            onClick={() => onChange(day)}
          />
        </div>
      ))}
    </div>
  );
}

export default function Calendar(props: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = add(currentMonth, { months: 1 });

  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-y-4">
      <div className="relative col-span-3 grid h-10 grid-cols-subgrid">
        <div className="flex-center text-sm">{format(currentMonth, "MMMM yyyy")}</div>
        <div />
        <div className="flex-center text-sm">{format(nextMonth, "MMMM yyyy")}</div>

        <div className="absolute left-0 flex-center h-full">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              setCurrentMonth(sub(currentMonth, { months: 1 }));
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
        <div className="absolute right-0 flex-center h-full">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              setCurrentMonth(add(currentMonth, { months: 1 }));
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      <CalendarMonth
        key={currentMonth.toISOString()}
        year={currentMonth.getFullYear()}
        month={currentMonth.getMonth()}
        {...props}
        onChange={(date) => {
          if (!isSameMonth(date, currentMonth)) {
            setCurrentMonth(date);
          }

          props.onChange(date);
        }}
      />
      <div className="flex-center">
        <div className="h-34 w-px bg-foreground/20" />
      </div>
      <CalendarMonth
        key={nextMonth.toISOString()}
        year={nextMonth.getFullYear()}
        month={nextMonth.getMonth()}
        {...props}
        onChange={(date) => {
          if (!isSameMonth(date, nextMonth)) {
            setCurrentMonth(sub(date, { months: 1 }));
          }

          props.onChange(date);
        }}
      />
    </div>
  );
}

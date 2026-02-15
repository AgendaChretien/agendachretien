import { clsx } from "clsx";
import {
  add,
  eachDayOfInterval,
  format,
  isAfter,
  isBefore,
  isLastDayOfMonth,
  isMonday,
  isSameDay,
  isSameMonth,
  previousMonday,
  sub,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, type ComponentProps } from "react";

import { Button } from "./ui/button";

interface CalendarDayProps extends ComponentProps<"button"> {
  date: Date;
  startDate: Date;
  endDate: Date;
}

function CalendarDay({ date, startDate, endDate, ...props }: CalendarDayProps) {
  const start = isSameDay(date, startDate);
  const end = isSameDay(date, endDate);
  const between = isAfter(date, startDate) && isBefore(date, endDate);
  const within = between || start || end;
  const firstDayOfMonth = date.getDate() === 1;
  const lastDayOfMonth = isLastDayOfMonth(date);

  return (
    <div
      className={clsx(
        "relative h-8 w-full",
        within && "bg-neutral-2",
        start && "rounded-l-full",
        end && "rounded-r-full",
        between && "nth-[7n+1]:rounded-l-sm nth-[7n+7]:rounded-r-sm",

        within &&
          firstDayOfMonth &&
          !start &&
          "before:absolute before:top-0 before:right-full before:h-full before:w-4 before:bg-linear-90 before:from-neutral-2/0 before:to-neutral-2 before:content-['']",
        within &&
          lastDayOfMonth &&
          !end &&
          "after:absolute after:top-0 after:left-full after:h-full after:w-4 after:bg-linear-90 after:from-neutral-2 after:to-neutral-2/0 after:content-['']",
      )}
    >
      <button
        {...props}
        className={clsx(
          "flex-center size-full rounded-full transition-colors",
          "focus-visible:ring focus-visible:outline-none focus-visible:ring-inset",
          start || end
            ? "dark bg-primary-6 text-primary-12 hover:bg-primary-7"
            : "hover:bg-neutral-3",
          props.className,
        )}
      >
        {date.getDate()}
      </button>
    </div>
  );
}

interface CalendarMonthProps {
  className?: string;
  year: number;
  month: number;
  startDate: Date;
  endDate: Date;
  onHover?: (date: Date) => void;
  onSelect: (date: Date) => void;
}

function CalendarMonth({
  className,
  year,
  month,
  startDate,
  endDate,
  onSelect,
  onHover,
}: CalendarMonthProps) {
  const day1 = new Date(year, month, 1);
  const start = isMonday(day1) ? day1 : previousMonday(day1);
  const end = add(start, { days: 41 });
  const days = eachDayOfInterval({ start, end });

  return (
    <div className={clsx("grid w-100 grid-cols-7 gap-y-1", className)}>
      {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
        <div key={index} className="mb-2 flex-center text-xs font-black text-foreground/20">
          {day}
        </div>
      ))}

      {days.map((day) =>
        isSameMonth(day, day1) ? (
          <CalendarDay
            key={day.toISOString()}
            date={day}
            startDate={startDate}
            endDate={endDate}
            onClick={() => onSelect(day)}
            onMouseEnter={() => onHover?.(day)}
          />
        ) : (
          <div className="h-8" key={day.toISOString()} />
        ),
      )}
    </div>
  );
}

interface CalendarProps {
  period: [Date, Date];
  onChange: (period: [Date, Date]) => void;
}

export default function Calendar({ period, onChange }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(period[0]);
  const [endDate, setEndDate] = useState(period[1]);
  const [selecting, setSelecting] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const nextMonth = add(currentMonth, { months: 1 });

  useEffect(() => {
    setStartDate(period[0]);
    setEndDate(period[1]);
  }, [period]);

  const handleHover = (date: Date) => {
    if (selecting) {
      setHoveredDate(date);
    }
  };

  const handleSelect = (date: Date) => {
    if (!selecting) {
      setSelecting(true);
      setStartDate(date);
      setEndDate(date);
      setHoveredDate(date);
      return;
    }

    setSelecting(false);

    const newPeriod: [Date, Date] = isBefore(date, startDate)
      ? [date, startDate]
      : [startDate, date];

    setStartDate(newPeriod[0]);
    setEndDate(newPeriod[1]);
    onChange(newPeriod);
  };

  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-y-4">
      <div className="relative col-span-3 grid h-9 grid-cols-subgrid">
        <div className="flex-center text-sm">{format(currentMonth, "MMMM yyyy")}</div>
        <div />
        <div className="flex-center text-sm">{format(nextMonth, "MMMM yyyy")}</div>

        <div className="absolute left-0 flex-center h-full">
          <Button
            size="icon"
            variant="secondary"
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
            variant="secondary"
            onClick={() => {
              setCurrentMonth(add(currentMonth, { months: 1 }));
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      {[currentMonth, nextMonth].map((month) => (
        <CalendarMonth
          key={month.toISOString()}
          year={month.getFullYear()}
          month={month.getMonth()}
          startDate={hoveredDate && isBefore(hoveredDate, startDate) ? hoveredDate : startDate}
          endDate={hoveredDate && isAfter(hoveredDate, endDate) ? hoveredDate : endDate}
          onSelect={handleSelect}
          onHover={handleHover}
        />
      ))}
      <div className="col-start-2 row-start-2 flex-center">
        <div className="h-34 w-px bg-foreground/20" />
      </div>
    </div>
  );
}

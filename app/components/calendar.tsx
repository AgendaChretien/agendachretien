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

type Period = [Date, Date];

interface CalendarDayProps extends ComponentProps<"button"> {
  date: Date;
  startDate?: Date;
  endDate?: Date;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

function CalendarDay({ date, startDate, endDate, ...props }: CalendarDayProps) {
  const start = startDate && isSameDay(date, startDate);
  const end = endDate && isSameDay(date, endDate);
  const between = startDate && endDate && isAfter(date, startDate) && isBefore(date, endDate);
  const within = between || start || end;
  const firstDayOfMonth = date.getDate() === 1;
  const lastDayOfMonth = isLastDayOfMonth(date);

  return (
    <div
      className={clsx(
        "relative h-8 w-full px-1",
        within && "bg-neutral-2",
        start && "rounded-l-sm",
        end && "rounded-r-sm",
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
        disabled={isBefore(date, today)}
        className={clsx(
          "flex-center size-full rounded-full transition-colors",
          "focus-visible:ring focus-visible:outline-none focus-visible:ring-inset",
          "disabled:pointer-events-none disabled:opacity-30",
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
  startDate?: Date;
  endDate?: Date;
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
    <div className={clsx("grid w-full grid-cols-7 gap-y-1", className)}>
      <div className="col-span-7 mb-4 flex-center h-9 text-sm">{format(day1, "MMMM yyyy")}</div>

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
  period?: Period;
  onChange: (period: Period) => void;
}

export default function Calendar({ period, onChange }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(today);
  const [startDate, setStartDate] = useState(period?.[0]);
  const [endDate, setEndDate] = useState(period?.[1]);
  const [selecting, setSelecting] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const nextMonth = add(currentMonth, { months: 1 });

  useEffect(() => {
    setStartDate(period?.[0]);
    setEndDate(period?.[1]);
  }, [period]);

  const handleHover = (date: Date) => {
    if (selecting) {
      setHoveredDate(date);
    }
  };

  const handleSelect = (date: Date) => {
    if (!selecting || !startDate) {
      setSelecting(true);
      setStartDate(date);
      setEndDate(date);
      setHoveredDate(date);
      return;
    }

    setSelecting(false);

    const newPeriod: Period = isBefore(date, startDate) ? [date, startDate] : [startDate, date];

    setStartDate(newPeriod[0]);
    setEndDate(newPeriod[1]);
    onChange(newPeriod);
  };

  let currentStartDate = startDate;
  let currentEndDate = endDate;

  if (hoveredDate) {
    if (startDate && isBefore(hoveredDate, startDate)) {
      currentStartDate = hoveredDate;
    } else if (endDate && isAfter(hoveredDate, endDate)) {
      currentEndDate = hoveredDate;
    }
  }

  return (
    <div className="@container w-full">
      <div className="relative mx-auto flex gap-8 @max-[620px]:max-w-100">
        <div className="absolute top-0 left-0">
          <Button
            size="icon"
            variant="secondary"
            disabled={isSameMonth(currentMonth, today)}
            onClick={() => {
              setCurrentMonth(sub(currentMonth, { months: 1 }));
            }}
          >
            <ChevronLeft />
          </Button>
        </div>
        <div className="absolute top-0 right-0">
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

        <CalendarMonth
          className="flex-1"
          key={currentMonth.toISOString()}
          year={currentMonth.getFullYear()}
          month={currentMonth.getMonth()}
          startDate={currentStartDate}
          endDate={currentEndDate}
          onSelect={handleSelect}
          onHover={handleHover}
        />

        <div className="flex-center @max-[620px]:hidden">
          <div className="h-34 w-px bg-foreground/20" />
        </div>

        <CalendarMonth
          className="flex-1 @max-[620px]:hidden"
          key={nextMonth.toISOString()}
          year={nextMonth.getFullYear()}
          month={nextMonth.getMonth()}
          startDate={currentStartDate}
          endDate={currentEndDate}
          onSelect={handleSelect}
          onHover={handleHover}
        />
      </div>
    </div>
  );
}

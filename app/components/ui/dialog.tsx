"use client";

import { ScrollArea } from "@base-ui/react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import * as React from "react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogBackdrop({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/80 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate",
        className,
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  keepMounted,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  keepMounted?: boolean;
}) {
  const popupRef = React.useRef<HTMLDivElement>(null);

  return (
    <DialogPortal keepMounted={keepMounted}>
      <DialogBackdrop />

      <DialogPrimitive.Viewport className="group/dialog fixed inset-0">
        <ScrollArea.Root
          style={{ position: undefined }}
          className="h-full overscroll-contain group-data-ending-style/dialog:pointer-events-none"
        >
          <ScrollArea.Viewport className="h-full overscroll-contain group-data-ending-style/dialog:pointer-events-none">
            <ScrollArea.Content className="flex-center min-h-full">
              <DialogPrimitive.Popup
                data-slot="dialog-content"
                ref={popupRef}
                initialFocus={popupRef}
                className={cn(
                  "relative w-[min(40rem,calc(100vw-2rem))] mx-auto my-4 md:my-12 bg-neutral-1 dark:bg-neutral-2 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/5 grid max-w-[calc(100%-2rem)] gap-12 rounded-4xl p-6 text-sm ring-1 duration-100 sm:max-w-md",
                  "top-[calc(50%+1.25rem*var(--nested-dialogs))] scale-[calc(1-0.05*var(--nested-dialogs))] opacity-[calc(1-0.5*var(--nested-dialogs))] data-nested-dialog-open:after:absolute data-nested-dialog-open:after:inset-0 data-nested-dialog-open:after:rounded-[inherit] [nested-dialog-open]:after:rounded-[inherit] data-nested-dialog-open:after:bg-black/5",
                  className,
                )}
                {...props}
              >
                {children}
                {showCloseButton && (
                  <DialogPrimitive.Close
                    data-slot="dialog-close"
                    render={
                      <Button variant="ghost" className="absolute top-4 right-4" size="icon-sm" />
                    }
                  >
                    <XIcon />
                    <span className="sr-only">Close</span>
                  </DialogPrimitive.Close>
                )}
              </DialogPrimitive.Popup>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar className="pointer-events-none absolute m-[0.4rem] flex w-1 justify-center rounded-3xl opacity-0 transition-opacity duration-250 group-data-ending-style/dialog:opacity-0 group-data-ending-style/dialog:duration-300 hover:pointer-events-auto hover:opacity-100 hover:delay-0 hover:duration-75 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:delay-0 data-scrolling:duration-75 md:w-1.75">
            <ScrollArea.Thumb className="w-full rounded-[inherit] bg-gray-500 before:absolute before:top-1/2 before:left-1/2 before:size-[calc(100%+1rem)] before:-translate-1/2 before:content-['']" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </DialogPrimitive.Viewport>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="dialog-header" className={cn("gap-2 flex flex-col", className)} {...props} />
  );
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>Close</DialogPrimitive.Close>
      )}
    </div>
  );
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-base leading-none font-medium", className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3",
        className,
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogBackdrop,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

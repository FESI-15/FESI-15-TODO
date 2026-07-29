"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { useSideMenu } from "@/components/layout/SideMenu/SideMenuContext";
import CheckboxIcon from "@/public/icons/mypage/ic_checkbox.svg";
import {
  XIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const toast = ToastPrimitive.createToastManager();

const toastVariants = cva(
  [
    "group/toast pointer-events-auto relative w-full rounded-2xl border shadow-lg outline-none",
    "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "data-starting-style:opacity-0 data-starting-style:translate-y-8",
    "data-ending-style:opacity-0 data-ending-style:scale-95",
  ].join(" "),
  {
    variants: {
      type: {
        default: "bg-popover text-popover-foreground",
        success:
          "rounded-[28px] bg-[#FFF8E4] text-[#EF6C00] text-sm font-semibold",
        error:
          "rounded-[28px] bg-[#FEF3F2] text-[#B42318] text-sm font-semibold",
        info: "bg-popover text-popover-foreground",
        warning: "bg-popover text-popover-foreground",
        loading: "bg-popover text-popover-foreground",
      },
    },
    defaultVariants: {
      type: "default",
    },
  },
);

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />;
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />;
}

function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
  const pathname = usePathname();
  const { open } = useSideMenu();
  const hasSidebar =
    pathname.startsWith("/dashboard") || pathname.startsWith("/mypage");

  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        "pointer-events-none fixed bottom-8 right-8 z-50 flex max-w-[570px] flex-col gap-3 outline-none",
        "left-8",
        hasSidebar && [
          "md:left-[92px]",
          open ? "lg:left-[394px]" : "lg:left-[92px]",
          "lg:mx-auto lg:bottom-12",
        ],
        className,
      )}
      {...props}
    />
  );
}
interface ToastProps
  extends
    React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {}

function Toast({ className, type, ...props }: ToastProps) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      className={cn(toastVariants({ type }), className)}
      {...props}
    />
  );
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        "flex h-full items-center gap-1 overflow-hidden px-4 py-2",
        className,
      )}
      {...props}
    />
  );
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}

function ToastDescription({
  className,
  ...props
}: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function ToastAction({
  className,
  render = <Button variant="outline" size="sm" />,
  ...props
}: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      render={render}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}

function ToastClose({
  className,
  children,
  render = <Button variant="ghost" size="icon-sm" />,
  ...props
}: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close toast"
      render={render}
      className={cn(
        "relative shrink-0 text-muted-foreground after:absolute after:-inset-2 hover:text-foreground",
        className,
      )}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </ToastPrimitive.Close>
  );
}

const TOAST_ICONS = {
  success: <CheckboxIcon aria-hidden="true" />,
  info: <InfoIcon aria-hidden="true" />,
  warning: <TriangleAlertIcon aria-hidden="true" />,
  error: <OctagonXIcon className="text-destructive" aria-hidden="true" />,
  loading: <Loader2Icon className="animate-spin" aria-hidden="true" />,
} as const;

function ToastIcon({ type }: { type: string | undefined }) {
  if (!type || !(type in TOAST_ICONS)) {
    return null;
  }

  const Icon = TOAST_ICONS[type as keyof typeof TOAST_ICONS];

  return (
    <span
      data-slot="toast-icon"
      className="shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6"
    >
      {Icon}
    </span>
  );
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager();

  return toasts.map((toastItem) => (
    <Toast
      key={toastItem.id}
      type={toastItem.type as ToastProps["type"]}
      toast={toastItem}
    >
      <ToastContent>
        <ToastIcon type={toastItem.type} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <ToastTitle />
          <ToastDescription />
        </div>
      </ToastContent>
    </Toast>
  ));
}

function Toaster({
  children,
  toastManager = toast,
  ...props
}: ToastPrimitive.Provider.Props) {
  return (
    <ToastProvider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
}

const createToastManager = ToastPrimitive.createToastManager;
const useToastManager = ToastPrimitive.useToastManager;

export {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
};

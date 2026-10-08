"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent as ReactFocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { usePathname } from "next/navigation";

const OPEN_EVENT = "onsite:navmenu";

/**
 * Click / keyboard disclosure for header menus.
 * Panels render only while `open` is true — never on :hover — so a tap on
 * a touch device toggles the same way a click does.
 */
export function useNavDisclosure(variant: "desktop" | "mobile" = "desktop") {
  const pathname = usePathname();
  // Open only for the path it was opened on, so navigation closes it
  // without a setState-in-effect.
  const [session, setSession] = useState<string | null>(null);
  const open = session !== null && session === pathname;
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onOther = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (detail !== panelId) setSession(null);
    };
    window.addEventListener(OPEN_EVENT, onOther);
    return () => window.removeEventListener(OPEN_EVENT, onOther);
  }, [panelId]);

  useEffect(() => {
    if (!open) return;
    window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: panelId }));
  }, [open, panelId]);

  useEffect(() => {
    if (!open || variant === "mobile") return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setSession(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setSession(null);
      triggerRef.current?.focus();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, variant]);

  const menuItems = () =>
    Array.from(
      rootRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []
    );

  const focusItem = (index: number) => {
    const items = menuItems();
    if (!items.length) return;
    const next = index < 0 ? items.length - 1 : Math.min(index, items.length - 1);
    items[next]?.focus();
  };

  const openAndFocus = (index: number) => {
    setSession(pathname);
    requestAnimationFrame(() => focusItem(index));
  };

  const toggle = () => setSession((current) => (current === pathname ? null : pathname));
  const close = () => setSession(null);

  const onTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setSession(null);
      return;
    }
    if (variant === "mobile") return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openAndFocus(0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openAndFocus(-1);
    }
  };

  const onPanelKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (variant === "mobile") return;
    const items = menuItems();
    if (!items.length) return;
    const current = items.indexOf(document.activeElement as HTMLElement);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(current + 1) % items.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(current - 1 + items.length) % items.length]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      items[items.length - 1]?.focus();
    }
  };

  const onBlur = (event: ReactFocusEvent<HTMLDivElement>) => {
    if (variant === "mobile") return;
    const next = event.relatedTarget as Node | null;
    if (!rootRef.current?.contains(next)) setSession(null);
  };

  return {
    open,
    panelId,
    rootRef,
    triggerRef,
    toggle,
    close,
    onTriggerKeyDown,
    onPanelKeyDown,
    onBlur,
  };
}

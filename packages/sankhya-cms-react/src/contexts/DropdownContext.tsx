import type { ReactNode } from 'react';

/**
 * @deprecated `st-dropdown` coordinates its own open/close state, so no provider is needed any
 * more. Kept as a pass-through so existing `<DropdownProvider>` wrappers keep working.
 */
export const DropdownProvider = ({ children }: { children?: ReactNode }) => <>{children}</>;

export interface TouchDeviceOptions {
    /**
     * Screen width breakpoint (in pixels) below which device is considered touch/mobile
     * @default 768
     */
    breakpoint?: number;
    /**
     * Whether to use actual touch detection in addition to breakpoint
     * @default true
     */
    useActualDetection?: boolean;
    /**
     * Class name to add to HTML element when device is considered touch
     * @default 'touch-device'
     */
    touchClassName?: string;
}
export declare const useTouchDevice: (options?: TouchDeviceOptions) => boolean;
export declare const useMobileTouchDevice: () => boolean;
export declare const useTabletTouchDevice: () => boolean;
export declare const useDesktopTouchDevice: () => boolean;

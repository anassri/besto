import { type FunctionComponent } from "react";
import { useInView } from "react-intersection-observer";

type ScrollableElementComponentProps = {
    firstItemRef: (node?: Element | null) => void;
    lastItemRef: (node?: Element | null) => void;
};

type ScrollableElementProps = {
    Component: FunctionComponent<ScrollableElementComponentProps>;
    hideGradients?: boolean;
};

export const ScrollableElement: FunctionComponent<ScrollableElementProps> = ({
    Component,
    hideGradients = false,
}) => {
    const { ref: firstItemRef, inView: firstItemInView } = useInView();
    const { ref: lastItemRef, inView: lastItemInView } = useInView();

    return (
        <div className="relative">
            {!firstItemInView && !hideGradients && (
                <div
                    className="absolute w-full h-[50px] top-0"
                    style={{
                        background:
                            "linear-gradient(#f7f7f7,rgba(255,255,255, 0))",
                    }}
                ></div>
            )}
            <Component firstItemRef={firstItemRef} lastItemRef={lastItemRef} />
            {!lastItemInView && !hideGradients && (
                <div
                    className="absolute w-full h-[50px] bottom-0"
                    style={{
                        background:
                            "linear-gradient(rgba(255,255,255, 0), #f7f7f7)",
                    }}
                ></div>
            )}
        </div>
    );
};

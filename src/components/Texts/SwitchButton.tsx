import kind from "@enact/core/kind";
import { MarqueeDecorator } from "@enact/moonstone/Marquee";
import Skinnable from "@enact/sandstone/Skinnable";
import Switch from "@enact/sandstone/Switch";
import Spottable from "@enact/spotlight/Spottable";
import { Cell, Row } from "@enact/ui/Layout";
import React from "react";

const MarqueeText = MarqueeDecorator("div");

// Props interface
interface BaseItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    css?: {
        item?: string;
        label?: string;
    };
}

const BaseItem = kind<BaseItemProps>({
    name: "BaseItem",

    styles: {
        css: {
            item: "customItem",
            label: "customLabel",
        },
        className: "item",
    },

    render: ({ children, ...rest }) => (
        <Row
            {...rest}
            className={rest.className}
            style={{
                display: "flex",
                alignItems: "center",
                padding: "24px",
                border: "2px solid #ccc",
                borderRadius: "16px",
                backgroundColor: "#f0f0f0",
                width: "600px",
            }}
            onFocus={() => {
                console.log("포커스됨~!!");
            }}
        >
            <Cell className={rest.css?.label}>
                <MarqueeText marqueeOn="hover">{children}</MarqueeText>
            </Cell>
            <Switch />
        </Row>
    ),
});

const CustomSwitchItem = Spottable(Skinnable(BaseItem));

export default CustomSwitchItem;

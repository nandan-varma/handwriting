import FontPicker from "font-picker-react";
import { useState } from "react";

export function FontSelector() {
    const [activeFontFamily, setActiveFontFamily] = useState("Open Sans");
    return (
        <div>
            <FontPicker
                apiKey={process.env.GOOGLE_FONTS_API_KEY!}
                activeFontFamily={"Open Sans"}
                onChange={(nextFont) => setActiveFontFamily(nextFont.family)}
            />
        </div>
    )
}
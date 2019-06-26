module powerbi.extensibility.visual.heightissues16DAF22AB972431998FBD46DC90570F1.drawing  {
    import TextProperties = powerbi.extensibility.utils.formatting.TextProperties;
    import textMeasurementService = powerbi.extensibility.utils.formatting.textMeasurementService;
    const SVG = "svg";
    const G = "g";


    export function measureTextHeight(text: string, fontSize: number, fontFamily: string, fontWeight: string): number {
        let textProperties = getTextProperties(text, fontSize, fontFamily, fontWeight);
        return textMeasurementService.measureSvgTextHeight(textProperties);
    }

    export function getEstimatedTextHeight(text: string, fontSize: number, fontFamily: string, fontWeight: string): number {
        let textProperties = getTextProperties(text, fontSize, fontFamily, fontWeight);
        return textMeasurementService.estimateSvgTextHeight(textProperties);
    }

    function getTextProperties(text: string, fontSize: number, fontFamily: string, fontWeight: string): TextProperties {
        return {
            text: text,
            fontSize: `${fontSize}px`,
            fontFamily: fontFamily,
            fontWeight: fontWeight,
        };
    }
}
/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual {
    import TextProperties = powerbi.extensibility.utils.formatting.TextProperties;
    import textMeasurementService = powerbi.extensibility.utils.formatting.textMeasurementService;
    "use strict";
    const BLACK = "black";
    export class Visual implements IVisual {
        private target: HTMLElement;
        private settings: VisualSettings;

        constructor(options: VisualConstructorOptions) {
            this.target = options.element;
        }

        public update(options: VisualUpdateOptions) {
            this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
            let parent = d3.select(this.target);
            parent.selectAll("*").remove();
            let group = parent.append("div").append("svg").append("g");
            let title = "Height v1 " + options.viewport.height;
            this.plotTitle(title, group);
        }

        private plotTitle(title: string, container: d3.Selection<SVGElement>) {
            let titleElement = container.selectAll(`.title`);
            if (titleElement.empty()) {
                titleElement = container.append("text");
            }
            titleElement.text(title)
                .attr("x", 0)
                .attr("fill", "black")
                .style("font-size", `12px`)
                .style("font-family", "Segoe UI");
            let properties: TextProperties = {
                text: title,
                fontSize: "12px",
                fontFamily: "Segoe UI",
                fontWeight: "normal"
            };
            // If we use the text measurement service the issue occurs.
            let titleHeight = Math.round(textMeasurementService.measureSvgTextHeight(properties));
            // If we use a constant number instead the issue does not occur.
            // let titleHeight = 20;
            titleElement.attr("y", Math.round(titleHeight / 2) + 2);
        }

        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
            return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        }
    }
}
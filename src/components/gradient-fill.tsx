export function modifyChartStyle(options: any) {
    
    options.series.map((s:any) => {
        s.fillColor = {
            linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
            stops: [
                [0, '#29D5D590'], 
                [1, 'rgba(255, 255, 255, 0.1)'] 
            ]            
        }
        s.lineColor = "#29D5D590";
        s.lineWidth = 3;
        return s;
    });

    return options;
}
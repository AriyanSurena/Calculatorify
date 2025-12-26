/** Converts Area to the Square Meters
 * @param unit Unit Type as String (String)
 * @param value Number value in Area to convert to Square Meters (Number)
 * @returns Converted value in the Square Meters (m2) (Number)
 */
const areaToSquareMeters = (unit: string, value: number): number => {
    switch (unit) {
        // Convert Acres (ac) to Square Meters (m2) 
        case 'Acres (ac)': {
            return value * 4_046.856_422_4;
        }
        // Convert Ares (a) to Square Meters (m2) 
        case 'Ares (a)': {
            return value * 100;
        }
        // Return Square Meters (m²) 
        case 'Square Meters (m²)': {
            return value;
        }
        // Convert Square Kilometers (km²) to Square Meters (m2) 
        case 'Square Kilometers (km²)': {
            return value * 1_000_000;
        }
        // Convert Hectares (ha) to Square Meters (m2) 
        case 'Hectares (ha)': {
            return value * 10_000;
        }
        // Convert Square Miles (mi²) to Square Meters (m2) 
        case 'Square Miles (mi²)': {
            return value * 2_589_988.110_336;
        }
        // Convert Square Yards (yd²) to Square Meters (m2) 
        case 'Square Yards (yd²)': {
            return value * 0.836_127_36;
        }
        // Convert Square Feet (ft²) to Square Meters (m2) 
        case 'Square Feet (ft²)': {
            return value * 0.092_903_04;
        }
        // Convert Square Inches (in²) to Square Meters (m2) 
        case 'Square Inches (in²)': {
            return value * 0.000_645_16;
        }
        // if the input unit is not valid,
        // throw an error
        default: {
            throw new Error('Input Unit Is Invalid.');
        }
    }
};

/** Converts square meters to the specified unit
 * @param unit - Unit Type as String (String)
 * @param value - Number value in square meters to convert (Number)
 * @returns Converted value in the target unit (Number)
*/
const squareMetersToUnit = (unit: string, value: number): number => {
    switch (unit) {
        // Convert Square Meters (m2) to Acres (ac) 
        case 'Acres (ac)': {
            return value / 4_046.856_422_4;
        }
        // Convert Square Meters (m2) to Ares (a) 
        case 'Ares (a)': {
            return value / 100;
        }
        // Return Square Meters (m2) 
        case 'Square Meters (m²)': {
            return value;
        }
        // Convert Square Meters (m2) to Square Kilometers (km²) 
        case 'Square Kilometers (km²)': {
            return value / 1_000_000;
        }
        // Convert Square Meters (m2) to Hectares (ha) 
        case 'Hectares (ha)': {
            return value / 10_000;
        }
        // Convert Square Meters (m2) to Square Miles (mi²) 
        case 'Square Miles (mi²)': {
            return value / 2_589_988.110_336;
        }
        // Convert Square Meters (m2) to Square Yards (yd²) 
        case 'Square Yards (yd²)': {
            return value / 0.836_127_36;
        }
        // Convert Square Meters (m2) to Square Feet (ft²) 
        case 'Square Feet (ft²)': {
            return value / 0.092_903_04;
        }
        // Convert Square Meters (m2) to Square Inches (in²) 
        case 'Square Inches (in²)': {
            return value / 0.000_645_16;
        }
        // if there is an error in the output unit,
        // throw an error 
        default: {
            throw new Error('Invalid Destination Unit.');
        }
    }
};

/**
 * Area Unit Conversion Function
 * @param from Source Unit (String)
 * @param to Destination Unit (String)
 * @param value The Value To Be Converted (Number)
 * @returns Returns The Result Of The Conversion Of Units Of Area (Number)
 */
const convertArea = (from: string, to: string, value: number): number => {
    // Convert to Square Meters (m²)
    const inSquareMeters: number = areaToSquareMeters(from, value);

    // Convert to Unit
    const result: number = squareMetersToUnit(to, inSquareMeters);

    return result;
};

export default convertArea;
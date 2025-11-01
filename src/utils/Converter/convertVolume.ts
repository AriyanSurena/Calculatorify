/** Converts volume from Liters (L) to the specified destination unit
 * @param unit Unit Type as String (String)
 * @param valueInLiters Number value in Liters to convert to the target unit (Number)
 * @returns Converted value in the specified unit (Number)
 */
const litersToUnit = (unit: string, valueInLiters: number): number => {
    switch (unit) {
        // Return Liters (L) as is
        case 'Liters (L)': {
            return valueInLiters;
        }
        // Convert Liters (L) to Milliliters (mL)
        case 'Milliliters (mL)': {
            return valueInLiters * 1000;
        }
        // Convert Liters (L) to Cubic Meters (m³)
        case 'Cubic Meters (m³)': {
            return valueInLiters / 1000;
        }
        // Convert Liters (L) to Gallons (gal)
        case 'Gallons (gal)': {
            return valueInLiters / 3.785411784; // US gallons
        }
        // Convert Liters (L) to Cubic Feet (ft³)
        case 'Cubic Feet (ft³)': {
            return valueInLiters / 28.316846592;
        }
        // Convert Liters (L) to Cubic Centimeters (cm³)
        case 'Cubic Centimeters (cm³)': {
            return valueInLiters * 1000;
        }
        // Convert Liters (L) to Deciliters (dL)
        case 'Deciliters (dL)': {
            return valueInLiters * 10;
        }
        // Convert Liters (L) to Cubic Inches (in³)
        case 'Cubic Inches (in³)': {
            return valueInLiters / 0.016387064;
        }
        // Convert Liters (L) to Fluid Ounces (fl oz)
        case 'Fluid Ounces (fl oz)': {
            return valueInLiters / 0.0295735295625;
        }
        // Throw error for invalid destination unit
        default: {
            throw new Error('Unknown volume unit');
        }
    }
};

/** Converts volume from the specified source unit to Liters (L)
 * @param unit Unit Type as String (String)
 * @param value Number value in the source unit to convert to Liters (Number)
 * @returns Converted value in Liters (L) (Number)
 */
const volumeToLiters = (unit: string, value: number): number => {
    switch (unit) {
        // Return Liters (L) as is
        case 'Liters (L)': {
            return value;
        }
        // Convert Milliliters (mL) to Liters (L)
        case 'Milliliters (mL)': {
            return value / 1000;
        }
        // Convert Cubic Meters (m³) to Liters (L)
        case 'Cubic Meters (m³)': {
            return value * 1000;
        }
        // Convert Gallons (gal) to Liters (L)
        case 'Gallons (gal)': {
            return value * 3.785411784; // US gallons
        }
        // Convert Cubic Feet (ft³) to Liters (L)
        case 'Cubic Feet (ft³)': {
            return value * 28.316846592;
        }
        // Convert Cubic Centimeters (cm³) to Liters (L)
        case 'Cubic Centimeters (cm³)': {
            return value / 1000;
        }
        // Convert Deciliters (dL) to Liters (L)
        case 'Deciliters (dL)': {
            return value / 10;
        }
        // Convert Cubic Inches (in³) to Liters (L)
        case 'Cubic Inches (in³)': {
            return value * 0.016387064;
        }
        // Convert Fluid Ounces (fl oz) to Liters (L)
        case 'Fluid Ounces (fl oz)': {
            return value * 0.0295735295625;
        }
        // Throw error for invalid source unit
        default: {
            throw new Error('Unknown volume unit');
        }
    }
};

/** Volume Unit Conversion Function
 * @param from Source Unit (String)
 * @param to Destination Unit (String)
 * @param value The Value To Be Converted (Number)
 * @returns Returns The Result Of The Conversion Of Units Of Volume (Number)
 */
const convertVolume = (from: string, to: string, value: number): number => {
    // Convert source unit to Liters (L)
    const inLiters = volumeToLiters(from, value);

    // Convert Liters to target unit
    const result = litersToUnit(to, inLiters);

    return result;
};

export default convertVolume;